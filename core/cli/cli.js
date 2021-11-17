const term = require('terminal-kit').terminal;

term.on('key', function (name, matches, data) {
    if (name === 'CTRL_C') {
        term.grabInput(false);
        process.exit();
    }
});

module.exports = class CLI {
    constructor (server) {
        this.server = server;
        this.data = server.data.data;
        this.history = [];
        this.commands = {};
        this.commandMap = {};

        term.clear();
    }

    async generatePrediction (string) {
        let components = string.split(" ");
        let finished = components.slice(0, -1).map(a => a.toLowerCase());
        let completing = components[components.length - 1].toLowerCase();

        let obj = this.commandMap;
        for (let key of finished) {
            if (typeof obj !== "object") return string;
            if (key in obj) {
                obj = obj[key];
            } else {
                return string;
            }
        }

        let possible = [];
        let originalKey = Object.keys(obj);
        let keys = originalKey.map((a, i) => [i, a.slice(0, completing.length)]);

        for (let key of keys) {
            if (key[1].toLowerCase() !== completing) continue;
            possible.push(originalKey[key[0]]);
        }

        switch (possible.length) {
            case 0:
                return string;
            case 1:
                return [...finished, possible[0]].join(" ");
            default:
                return possible.map(ending => [...finished, ending].join(" "));
        }
    }

    iterateCommandHierarchy (at) {
        if (Object.keys(at.sub).length === 0) return true;
        return Object.fromEntries(
            Object.entries(at   .sub).map(([key, value]) => [key, this.iterateCommandHierarchy(value)])
        );
    }

    registerCommand (name, module) {
        this.commands[name] = module;
        this.commandMap[name] = this.iterateCommandHierarchy(module);
    }

    cmdNotFound (command) {
        term("\n").red("The command " + command + " did not match any registered commands.")("\n");
    }

    travelHierarchy (command, parts) {
        let [current, ...remaining] = parts;

        if (current in command.sub) {
            this.travelHierarchy(command.sub[current], remaining);
            return;
        }

        command.defaultRunner(parts, this.data, this.server);
    }

    handleInput (error, input) {
        if (error) throw error;

        if (!/\w/g.test(input)) {
            term("\n");
            return this.inputField();
        }
        if (this.history[this.history.length - 1] !== input) this.history.push(input);

        let [command, ...parts] = input.split(" ");
        command = command.toLowerCase();

        if (command in this.commands) {
            this.travelHierarchy(this.commands[command], parts);
        } else {
            this.cmdNotFound(command);
        }

        this.inputField();
    }

    inputField () {
        term.dim((new Date()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
        term.dim(" [");
        term.italic.brightMagenta(this.server.data.data.base.data.name.replace(/\W/g, "_") + "@5e ");
        term.italic.brightBlue("-dshell")
        term.dim("] ").brightCyan("*$ ");

        term.inputField({
            autoCompleteMenu : true,
            autoComplete : this.generatePrediction.bind(this),
            autoCompleteHint : true,
            history : this.history
        }, this.handleInput.bind(this));
    }

}