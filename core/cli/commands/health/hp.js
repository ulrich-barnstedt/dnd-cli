const Command = require("../../modules/command2");
const heal = require("./heal");
const dmg = require("./dmg");
const temp = require("./temp");

module.exports = new class extends Command {
    sub = {
        heal,
        temp,
        dmg
    };
}(__filename);
