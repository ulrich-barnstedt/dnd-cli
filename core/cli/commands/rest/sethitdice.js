const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let amount = +parts[0];
        if (isNaN(amount)) return;

        if (amount < 0 || amount > data.base.data.hitDice.maxCount) {
            term.red("Invalid amount of hit dice.\n");
            return;
        }

        data.base.data.hitDice.currentCount = amount;
        data.base.write();
        server.TU("base");

        term("Set hit dice count to ").green(amount)(".\n");
    }
}(__filename);