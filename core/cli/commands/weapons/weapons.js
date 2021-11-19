const term = require('terminal-kit').terminal;
const Command = require("../../command");

const add = require("./add");
const remove = require("./remove");
const attack = require("./attack");

module.exports = new class extends Command {
    registerSubcommands () {
        this.sub = {
            add,
            remove,
            attack
        };
    }
}(__filename);