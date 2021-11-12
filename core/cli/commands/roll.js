const term = require('terminal-kit').terminal;
const Command = require("../command");

const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let str = parts.join(" ");

        let src = str.replaceAll(" ", "");
        let [ count, rest ] = src.split("d");
        let [ prefix ] = src.match(/[+-]/) ?? [ "+" ];
        let [ sides, modifier = "0" ] = rest.split(/[+-]/);

        modifier = +(prefix + (modifier || "0"));
        count = +count || 1;
        sides = +sides;

        let arr = [];
        for (let i = 0; i < count; i++) {
            arr.push(random(1, sides + 1));
        }
        let sum = arr.reduce((acc, v) => acc + v, 0) + modifier;

        term.green("Sum: ").cyan(sum).green(", Values: ").cyan(arr.sort((a, b) => b - a).join(" "))("\n");
    }
}(__filename);