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
        term.red("Error parsing command in " + this.file)("\n");
    }

    registerSubcommands () {
        this.sub = {};
    }
}