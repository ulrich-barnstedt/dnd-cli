const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        term.clear();
    }
}(__filename);