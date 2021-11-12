const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    registerSubcommands () {
        let outer = this;

        this.sub = {
            max : new class extends Command {
                defaultBehaviour (parts, data, server) {
                    outer.healHp(data, server, 70000);
                }
            }
        };
    }

    healHp (data, server, hp) {
        let before = data.base.data.hp.currentHp;

        data.base.data.hp.currentHp = Math.min(hp + data.base.data.hp.currentHp, data.base.data.hp.maxHp);
        data.base.write();

        term("Healed ").green(String(data.base.data.hp.currentHp - before))(" primary HP.\n");
        server.TU("base");
    }

    defaultBehaviour (parts, data, server) {
        let health = +parts[0];
        if (health === 0 || isNaN(health)) return;

        this.healHp(data, server, health);
    }
}(__filename);