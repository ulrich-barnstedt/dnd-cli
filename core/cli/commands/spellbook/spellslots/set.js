const term = require('terminal-kit').terminal;
const Command = require("../../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let dSpell = data.spells.data;
        let a = +parts[0];
        let b = +parts[1];

        if (a > 9 || b > 9 || a < 1 || b < 1) {
            term.red("Invalid spell slot.\n");
            return;
        }

        dSpell.spellSlots[a].current = b;

        data.spells.write();
        server.TU("spells");

        term.green("Set spell slot ").green(a)(" to ").green(b)(".\n");
    }
}(__filename);