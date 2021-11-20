const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let health = +parts[0];
        if (health === 0 || isNaN(health)) return;

        data.base.data.hp.currentHp -= Math.max(health - data.base.data.hp.temporaryHp, 0);
        data.base.data.hp.temporaryHp = Math.max(data.base.data.hp.temporaryHp - health, 0);

        data.base.write();

        term("Took ").red(health)(" damage.\n");
        server.TU("base");
    }
}(__filename);