const Exit = require("./commands/exit");
const HP = require("./commands/health/hp");
const Funds = require("./commands/funds/funds");

const registerCommands = (cli) => {
    cli.registerCommand("exit", Exit);
    cli.registerCommand("hp", HP);
    cli.registerCommand("funds", Funds);
}

module.exports = registerCommands;