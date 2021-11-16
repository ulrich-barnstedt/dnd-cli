const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let dSpell = data.spells.data;
        let offset = dSpell.equipped[0].length;
        let a = +parts[0];
        let b = +parts[1];
        let modified = false;

        if (isNaN(a) || isNaN(b)) return;

        let len = dSpell.equipped.flat().length;
        if (a >= len || b >= len || a < 0 || b < 0) {
            term.red("Invalid spell slot(s).\n");
            return;
        }

        if (a < offset && b < offset) {
            let temp = dSpell.equipped[0][a];
            dSpell.equipped[0][a] = dSpell.equipped[0][b];
            dSpell.equipped[0][b] = temp;

            term.green("Swapped cantrips " + (a) + " and " + (b) + ".\n");
            modified = true;
        }

        if (a >= offset && b >= offset) {
            a -= offset;
            b -= offset;

            let temp = dSpell.equipped[1][a];
            dSpell.equipped[1][a] = dSpell.equipped[1][b];
            dSpell.equipped[1][b] = temp;

            term.green("Swapped slots " + (a + offset) + " and " + (b + offset) + ".\n");
            modified = true;
        }

        if (!modified) {
            term.red("Cannot swap a cantrip with a normal spell.\n");
        }

        data.spells.write();
        server.TU("spells");
    }
}(__filename);