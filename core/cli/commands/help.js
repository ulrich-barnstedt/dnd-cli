const term = require('terminal-kit').terminal;
const Command = require("../modules/command2");

module.exports = new class extends Command {
    sub = {};
    types = [];
    mod = [];

    defaultBehaviour (params, data) {
        term("Not implemented yet.\n");
    }
}(__filename);