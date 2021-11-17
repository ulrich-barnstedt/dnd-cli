const term = require('terminal-kit').terminal;
const Command = require("../../command");

const short = require("./short");
const long = require("./long");
const sethitedice = require("./sethitdice");

module.exports = new class extends Command {
    registerSubcommands () {
        this.sub = {
            short,
            long,
            hitdice : sethitedice
        };
    }
}(__filename);