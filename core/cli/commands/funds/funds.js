const term = require('terminal-kit').terminal;
const Command = require("../../command");
const modify = require("./modify");

module.exports = new class extends Command {
    registerSubcommands () {
        this.sub = {
            add : modify(1),
            remove : modify(-1)
        };
    }
}(__filename);