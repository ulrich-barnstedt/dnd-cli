const Help = require("./commands/help");
const Exit = require("./commands/exit");

const registerCommands = (cli) => {
    cli.registerCommand("help", Help);
    cli.registerCommand("exit", Exit);
}

module.exports = registerCommands;