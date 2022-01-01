const term = require('terminal-kit').terminal;
const Command = require("../../modules/command2");
const {longStr, str, num} = require("../../modules/typeGenerators");

module.exports = new class extends Command {
    sub = {};
    types = [longStr("String to calculate")];

    defaultBehaviour (params, data) {
        term("Evaluates to: ");
        try {
            let value = eval(params[0]);
            if (value || value === 0) term.green(String(value)); else term.red("nothing");
        } catch (e) {
            term.red("An error: " + e.message);
        }
        term("\n");
    }
}(__filename);
