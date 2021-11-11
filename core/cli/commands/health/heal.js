const term = require('terminal-kit').terminal;
const Command = require("../../command");
const SubcommandParser = require("../../subcommandParser");

module.exports = new class extends Command {
    wrappedRun (parts, data, server) {
        let before = data.base.data.hp.currentHp;

        if (parts[0].toLowerCase() === "max") {
            data.base.data.hp.currentHp = data.base.data.hp.maxHp;
            term("Healed ").green(String(data.base.data.hp.currentHp - before))(" primary HP.")(" (-> Max)\n");

            data.base.write();
            server.TU("base");

            return;
        }

        let health = +parts[0];
        if (health === 0 || isNaN(health)) return;

        data.base.data.hp.currentHp = Math.min(health + data.base.data.hp.currentHp, data.base.data.hp.maxHp);
        data.base.write();

        term("Healed ").green(String(data.base.data.hp.currentHp - before))(" primary HP.\n");
        server.TU("base");
    }
}