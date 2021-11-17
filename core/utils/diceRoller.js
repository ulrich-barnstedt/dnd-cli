const term = require('terminal-kit').terminal;

const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = (str, history) => {
    //term.italic.gray(str + " rolls ...\n");

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

    history.push({str, sum, array : arr});
    return {sum, array : arr};
}