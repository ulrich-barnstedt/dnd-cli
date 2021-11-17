const commands = {
    "util/exit" : "exit",
    "health/hp" : "hp",
    "funds/funds" : "funds",
    "util/launch" : "launcher",
    "roll" : "roll",
    "util/clear" : "termclear",
    "spellbook/spellbook" : "sb",
    "spellbook/cast" : "cast",
    "rest/rest" : "playerrest",
    "attack/attack" : "attack",
    "explain/explain" : "xplain"
};

const registerCommands = (cli) => {
    let entries = Object.entries(commands);

    for (let [path, name] of entries) {
        cli.registerCommand(name, require("./commands/" + path));
    }
}

module.exports = registerCommands;