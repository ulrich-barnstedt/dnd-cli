const term = require('terminal-kit').terminal;
const Command = require("../../modules/command2");
const diceRoller = require("../../../utils/diceRoller");
const {longStr, str, num} = require("../../modules/typeGenerators");

module.exports = new class extends Command {
    types = [longStr("rollString", "")];
    desc = "Roll some dice"

    defaultBehaviour ([str], data) {
        if (str.length === 0) return;
        let {sum, array} = diceRoller(str, data.diceHistory);

        term.green("Sum: ").cyan(sum).green(", Values: ").cyan(array.sort((a, b) => b - a).join(" "))("\n");
    }
}(__filename);