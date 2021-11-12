const term = require('terminal-kit').terminal;
const Command = require("../../command");

const cast = require("./cast");
const equip = require("./equip");
const unequip = require("./unequip");
const info = require("./info");
const learn = require("./learn");
const unlearn = require("./unlearn");
const spellslots = require("./spellslots/spellslots");

module.exports = new class extends Command {
    registerSubcommands () {
        this.sub = {
            cast,
            equip,
            unequip,
            info,
            learn,
            unlearn,
            ss : spellslots
        };
    }
}(__filename);