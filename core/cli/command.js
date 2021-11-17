const term = require('terminal-kit').terminal;

module.exports = class Command {
    constructor (file) {
        this.file = file;
        this.registerSubcommands();
    }

    defaultRunner (params, data, server) {
        term("\n");
        this.defaultBehaviour(params, data, server);
    }

    defaultBehaviour (params, data, server) {
        let keys = Object.keys(this.sub);

        if (keys.length > 0) {
            term.yellow("This command cannot be executed directly. Try a subcommand?\n");
            for (let key of keys) {
                term.yellow(" - " + key + "\n");
            }
        } else {
            term.red("Command in file " + this.file + " has no valid behaviour.")("\n");
        }
    }

    registerSubcommands () {
        this.sub = {};
    }
}