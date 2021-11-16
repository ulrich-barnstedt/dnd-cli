const term = require('terminal-kit').terminal;
const Command = require("../../command");
const visualizer = require("../../../spellSystem/visualizer");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let dSpell = data.spells.data;
        let target = +parts[1] - dSpell.equipped[0].length;
        let spell = +parts[0];

        if (isNaN(target) || isNaN(spell)) return;

        if (target < 0) {
            term.red("Cannot equip to this slot. (" + target + ")\n");
            return;
        }

        if (dSpell.equipped[1].length >= dSpell.maxEquippedSpells && target >= dSpell.equipped[1].length) {
            term.red("Cannot equip more spells - reached limit of max " + dSpell.maxEquippedSpells + " spells.\n");
            return;
        }

        if (spell >= dSpell.spellbook.length || spell < 0) {
            term.red("Cannot find this spell.\n");
            return;
        }

        let tSpell = dSpell.spellbook.splice(spell, 1)[0];

        if (dSpell.equipped[1][target] !== undefined) {
            dSpell.spellbook.push(dSpell.equipped[1][target]);
            term.green("(Unequipped " + dSpell.equipped[1][target].name + " from slot " + (target + dSpell.equipped[0].length) + ")\n");
        }

        if (target > dSpell.equipped[1].length) {
            dSpell.equipped[1].push(tSpell);
        } else {
            dSpell.equipped[1][target] = tSpell;
        }

        term.green("Equipped " + tSpell.name + ". Stats:\n");
        visualizer(tSpell);

        data.spells.write();
        server.TU("spells");
    }
}(__filename);