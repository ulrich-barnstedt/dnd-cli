const term = require('terminal-kit').terminal;
const Command = require("../command");

module.exports = new class extends Command {
    registerSubcommands () {
        this.sub = {};
    }

    defaultBehaviour (parts, data, server) {

    }
}(__filename);