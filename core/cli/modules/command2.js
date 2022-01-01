const term = require("terminal-kit").terminal;
const autoParse = require("./autoParse");

module.exports = class Command2 {
    sub = {};
    types = [];
    mod = [];
    desc = "Default description."

    constructor (file) {
        this.file = file;
    }

    defaultRunner (params, data, server) {
        term("\n");
        params = autoParse(params, this.types);

        this.defaultBehaviour(params, data, server);

        for (let type of this.mod) {
            data[type].write();
            server.TU(type);
        }
    }

    defaultBehaviour(params, data) {
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
}