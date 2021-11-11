const term = require('terminal-kit').terminal;
const Command = require("../../command");
const SubcommandParser = require("../../subcommandParser");

module.exports = new class extends Command {
    wrappedRun (parts, data, server) {
        let health = +parts[0];
        if (health === 0 || isNaN(health)) return;

        data.base.data.hp.currentHp -= (health - data.base.data.hp.temporaryHp);
        data.base.data.hp.temporaryHp = Math.max(data.base.data.hp.temporaryHp - health, 0);

        data.base.write();

        term("Took ").red(health)(" damage.\n");
        server.TU("base");
    }
}