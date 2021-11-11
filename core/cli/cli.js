const term = require('terminal-kit').terminal;
const commandMap = require("./commandMap");

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

        term.clear();
    }

    async generatePrediction (string) {
        let components = string.split(" ");
        let finished = components.slice(0, -1).map(a => a.toLowerCase());
        let completing = components[components.length - 1].toLowerCase();

        let obj = commandMap;
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

    registerCommand (name, module) {
        this.commands[name] = module;
    }

    cmdNotFound (command) {
        term("\n").red("The command " + command + " did not match any registered commands.")("\n");
    }

    handleInput (error, input) {
        if (!/\w/g.test(input)) {
            term("\n");
            return this.inputField();
        }
        this.history.push(input);

        let [command, ...parts] = input.split(" ");
        command = command.toLowerCase();

        if (command in this.commands) {
            this.commands[command].run(parts, this.data, this.server);
        } else {
            this.cmdNotFound(command);
        }

        this.inputField();
    }

    inputField () {
        term.dim((new Date()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
        term.dim(" [");
        term.yellow(this.server.data.data.base.data.name.replace(/\W/g, "_") + "@5e ");
        term.brightRed("-dshell")
        term.dim("] ").brightCyan("*$ ");

        term.inputField({
            autoCompleteMenu : true,
            autoComplete : this.generatePrediction,
            autoCompleteHint : true,
            history : this.history
        }, this.handleInput.bind(this));
    }

}