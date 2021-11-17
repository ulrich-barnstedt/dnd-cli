const term = require('terminal-kit').terminal;
const Command = require("../../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let dSpell = data.spells.data;
        let id = +parts[0];
        if (isNaN(id)) return;

        if (id < 1 || id > 9) {
            term.red("Invalid spell slots.\n");
            return;
        }

        dSpell.spellSlots[id].current = dSpell.spellSlots[id].max;

        data.spells.write();
        server.TU("spells");

        term("Regenerated spell slot ").green(id)(".\n");
    }
}(__filename);