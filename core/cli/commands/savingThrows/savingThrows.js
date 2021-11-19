const term = require('terminal-kit').terminal;
const Command = require("../../command");
const roller = require("../../../utils/diceRoller");

const rollSV = (modifier) => {
    return new class extends Command {
        defaultBehaviour (parts, data, server) {
            let mod = data.stats.data.stats[modifier].modifier;
            let roll = "d20 + " + mod;
            let rolled = roller(roll, data.diceHistory).sum;

            term("Rolled ").green(rolled)(".\n");
        }
    }
}

module.exports = new class extends Command {
    registerSubcommands () {
        this.sub = {
            strength : rollSV("strength"),
            dexterity : rollSV("dexterity"),
            constitution : rollSV("constitution"),
            intelligence : rollSV("intelligence"),
            wisdom : rollSV("wisdom"),
            charisma : rollSV("charisma")
        };
    }
}(__filename);