const term = require('terminal-kit').terminal;
const Command = require("../../command");
const SubcommandParser = require("../../subcommandParser");

module.exports = new class extends Command {
    wrappedRun (parts, data, server) {
        let health = +parts[0];
        if (health === 0 || isNaN(health)) return;

        let before = data.base.data.hp.temporaryHp;

        data.base.data.hp.temporaryHp += health;
        data.base.write();

        term("Added ").yellow(String(data.base.data.hp.temporaryHp - before))(" temporary HP.\n");
        server.TU("base");
    }
}