const term = require('terminal-kit').terminal;
const Command = require("../../command");
const heal = require("./heal");
const dmg = require("./dmg");
const temp = require("./temp");

module.exports = new class extends Command {
    registerSubcommands () {
        this.sub = {
            heal,
            temp,
            dmg
        };
    }
}(__filename);