const totalSpellList = require("../data/totalSpellList");

module.exports = (id) => {
    return {...totalSpellList.spells[id], id};
}

