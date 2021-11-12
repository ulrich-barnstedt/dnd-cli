const term = require('terminal-kit').terminal;
const Command = require("../../../command");

const set = require("./set");
const regenerate = require("./regenerate");
const modify = require("./modify");

module.exports = new class extends Command {
    registerSubcommands () {
        this.sub = {
            set,
            regenerate,
            modify
        };
    }
}(__filename);