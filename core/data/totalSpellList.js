module.exports = new class {
    constructor () {
        this.spells = [];
    }

    load () {
        this.spells = require("../../shared/spellList.json");
    }
}();