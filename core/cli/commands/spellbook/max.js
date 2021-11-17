const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let dSpell = data.spells.data;
        let newMax = +parts[0];
        if (isNaN(newMax)) return;

        dSpell.maxEquippedSpells = newMax;

        data.spells.write();
        server.TU("spells");

        term.green("Set maximum amount of equipped spells to " + newMax + ".\n");
    }
}(__filename);