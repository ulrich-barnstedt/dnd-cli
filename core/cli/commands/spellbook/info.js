const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    registerSubcommands () {
        this.sub = {}; // equip, sb, source
    }
}(__filename);