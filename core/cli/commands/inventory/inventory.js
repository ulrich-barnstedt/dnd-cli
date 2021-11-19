const term = require('terminal-kit').terminal;
const Command = require("../../command");

const add = require("./add");
const more = require("./more");
const remove = require("./remove");

module.exports = new class extends Command {
    registerSubcommands () {
        this.sub = {
            add,
            more,
            remove
        };
    }
}(__filename);
