const term = require('terminal-kit').terminal;
const Command = require("../../command");
const {exec} = require("child_process");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        exec("wt nt --title DND -p \"Node\" -d C:/Users/ulric/Data/Programming/Projects/JS/dnd-cli node index.js m");
        term("Opened a viewer.\n");
    }
}(__filename);