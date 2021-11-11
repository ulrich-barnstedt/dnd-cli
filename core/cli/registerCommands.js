const Heal = require("./commands/health/heal");
const Exit = require("./commands/exit");
const Dmg = require("./commands/health/dmg");
const Temp = require("./commands/health/temp");

const registerCommands = (cli) => {
    cli.registerCommand("exit", Exit);
    cli.registerCommand("heal", Heal);
    cli.registerCommand("dmg", Dmg);
    cli.registerCommand("temp", Temp);
}

module.exports = registerCommands;