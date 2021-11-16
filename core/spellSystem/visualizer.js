const term = require('terminal-kit').terminal;

module.exports = (so) => {
    term.table([
        ["Name", so.name],
        ["Type", so.type],
        ["Casting time", so.casting_time],
        ["Components", so.components.raw],
        ["Duration", so.duration],
        ["Range", so.range],
        ["Description", so.description],
        ["ID", so.id]
    ], {
        borderChars: 'lightRounded' ,
        borderAttr: { color: 'blue' } ,
    });
}