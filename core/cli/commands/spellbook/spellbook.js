const term = require('terminal-kit').terminal;
const Command = require("../../command");

const cast = require("./cast");
const equip = require("./equip");
const unequip = require("./unequip");
const info = require("./info/info");
const learn = require("./learn");
const delearn = require("./delearn");
const spellslots = require("./spellslots/spellslots");
const xcycle = require("./xcycle");
const max = require("./max");

module.exports = new class extends Command {
    registerSubcommands () {
        this.sub = {
            cast,
            equip,
            unequip,
            info,
            learn,
            delearn,
            ss : spellslots,
            xcycle,
            max
        };
    }
}(__filename);