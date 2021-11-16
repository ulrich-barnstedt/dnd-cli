const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let dSpell = data.spells.data;
        let id = +parts[0];
        if (isNaN(id)) return;

        if (id < 0 || id >= data.totalSpellList.spells.length) {
            term.red("This spell could not be found.\n");
            return;
        }

        let obj = {...data.totalSpellList.spells[id], id};

        if (obj.level === "cantrip") {
            dSpell.equipped[0].push(obj);
        } else {
            dSpell.spellbook.push(obj);
        }

        data.spells.write();
        server.TU("spells");

        term.green("Added " + obj.name + (obj.level === "cantrip" ? " (cantrip)" : "") + " to your spellbook.\n");
    }
}(__filename);