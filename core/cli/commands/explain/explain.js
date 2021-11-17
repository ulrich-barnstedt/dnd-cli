const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        term("Last 5 dice rolls (desc.):\n");

        if (data.diceHistory.history.length === 0) {
            term.yellow(" - Empty -\n");
            return;
        }

        for (let obj of data.diceHistory.history.reverse()) {
            term.green(` - ${obj.str} => ∑ ${obj.sum} => ${obj.array.join(" ")}\n`);
        }
    }
}(__filename);