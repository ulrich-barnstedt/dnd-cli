const term = require('terminal-kit').terminal;
const Command = require("../../../command");

const all = require("./all");
const equipped = require("./equipped");
const spellbook = require("./spellbook");

module.exports = new class extends Command {
    registerSubcommands () {
        this.sub = {
            all,
            spellbook,
            equipped
        };
    }
}(__filename);