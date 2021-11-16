const term = require('terminal-kit').terminal;
const Command = require("../../command");
const visualizer = require("../../../spellSystem/visualizer");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let dSpell = data.spells.data;
        let id = +parts[0];
        if (isNaN(id)) return;

        let workingSet = dSpell.equipped.flat();
        if (id < 0 || id >= workingSet.length) {
            term.red("Could not find this spell.\n");
            return;
        }

        let spell = workingSet[id];
        let level = Number(spell.level);

        if (spell.level !== "cantrip") {
            if (dSpell.spellSlots[level].current < 1) {
                term.red("You do not have any available spell slots for that level.\n");
                return;
            }

            dSpell.spellSlots[level].current--;
        }

        term.green("You cast the spell:\n");
        visualizer(spell);

        data.spells.write();
        server.TU("spells");
    }
}(__filename);