const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let id = +parts[0];
        let list = data.base.data.weapons;

        if (isNaN(id) || id < 0 || id >= list.length) {
            term.red("Invalid ID.\n");
            return;
        }

        let removed = list.splice(id, 1)[0];
        term("Removed ").red(removed.name)(" from your inventory.\n");

        data.base.write();
        server.TU("base");
    }
}(__filename);