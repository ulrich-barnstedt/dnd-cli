const term = require('terminal-kit').terminal;
const Command = require("../modules/command2");
const {longStr, str, num} = require("../modules/typeGenerators");

module.exports = new class extends Command {
    sub = {};
    types = [];
    mod = [];
    desc = "";

    defaultBehaviour (params, data) {

    }
}(__filename);