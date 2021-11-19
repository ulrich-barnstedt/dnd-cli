const term = require('terminal-kit').terminal;
const Command = require("../../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let dSpell = data.spells.data;
        let a = +parts[0];
        let b = +parts[1];

        if (a > 9 || b > 9 || a < 1 || b < 0) {
            term.red("Invalid spell slot or invalid value.\n");
            return;
        }

        dSpell.spellSlots[a].current = b;

        data.spells.write();
        server.TU("spells");

        term("Set spell slot ").green(a)(" to ").green(String(b))(".\n");
    }
}(__filename);