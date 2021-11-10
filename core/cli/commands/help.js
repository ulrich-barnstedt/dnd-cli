const term = require('terminal-kit').terminal;
const Command = require("../command");

module.exports = new class extends Command {
    wrappedRun (params) {
        term.green("Random help msg")("\n");
    }
}