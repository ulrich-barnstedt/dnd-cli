const term = require('terminal-kit').terminal;
const Command = require("../command");
const diceRoller = require("../../utils/diceRoller");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        if (parts.length === 0) return;

        let str = parts.join(" ");
        let {sum, array} = diceRoller(str, data.diceHistory);

        term.green("Sum: ").cyan(sum).green(", Values: ").cyan(array.sort((a, b) => b - a).join(" "))("\n");
    }
}(__filename);