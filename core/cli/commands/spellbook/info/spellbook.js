const visualizer = require("../../../../spellSystem/visualizer");
const term = require('terminal-kit').terminal;
const Command = require("../../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let dSpell = data.spells.data;
        let id = +parts[0];
        if (isNaN(id)) return;

        let workingSet = dSpell.spellbook;
        if (id < 0 || id >= workingSet.length) {
            term.red("The spell could not be found.\n");
            return;
        }

        visualizer(workingSet[id]);
    }
}(__filename);