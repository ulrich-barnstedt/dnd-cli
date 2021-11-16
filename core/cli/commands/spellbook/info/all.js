const visualizer = require("../../../../spellSystem/visualizer");
const term = require('terminal-kit').terminal;
const Command = require("../../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let str = parts.join(" ").toLowerCase();
        let list = data.totalSpellList.spells;

        term.yellow("Searching DB...\n");

        let found;
        for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().startsWith(str)) {
                found = {...list[i], id : i};
                break;
            }
        }

        if (!found) {
            term.red("Could not find any matching spells.\n");
            return;
        }

        term.green("Found a possibly matching spell: \n");
        visualizer(found);
    }
}(__filename);