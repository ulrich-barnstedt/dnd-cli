const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let value = +parts[0];
        if (isNaN(value)) return;

         data.base.data.xp += value;
         term("Added ").green(value)(" XP.\n");

         data.base.write();
         server.TU("base");
    }
}(__filename);