const term = require('terminal-kit').terminal;
const Command = require("../../modules/command2");

module.exports = new class extends Command {
    types = [];
    desc = "The help command"

    defaultBehaviour (params, data) {
        term("Not implemented yet.\n");
    }
}(__filename);