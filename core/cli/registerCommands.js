const commands = {
    "util/exit" : "exit",
    "health/hp" : "hp",
    "funds/funds" : "funds",
    "util/launch" : "launch",
    "roll" : "roll",
    "util/clear" : "clear",
    "spellbook/spellbook" : "sb"
};

const registerCommands = (cli) => {
    let entries = Object.entries(commands);

    for (let [path, name] of entries) {
        cli.registerCommand(name, require("./commands/" + path));
    }
}

module.exports = registerCommands;