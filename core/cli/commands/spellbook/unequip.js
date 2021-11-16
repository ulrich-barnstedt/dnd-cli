const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let dSpell = data.spells.data;
        let target = +parts[0] - dSpell.equipped[0].length;

        if (isNaN(target)) return;

        if (target < 0 || target >= dSpell.equipped[1].length) {
            term.red("Invalid slot. (" + target + ")\n");
            return;
        }

        let removed = dSpell.equipped[1].splice(target, 1)[0];
        dSpell.spellbook.push(removed);

        term.yellow("Unequipped " + removed.name + " from slot " + (target + dSpell.equipped[0].length) + ".\n");

        data.spells.write();
        server.TU("spells");
    }
}(__filename);