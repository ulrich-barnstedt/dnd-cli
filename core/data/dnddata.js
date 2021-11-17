const totalSpellList = require("./totalSpellList");
const jsonWrapper = require("./jsonInstanceWrapper");
const spellJsonWrapper = require("../spellSystem/spellJsonWrapper");
const DiceHistory = require("./diceHistory");

module.exports = new class DNDData {
    constructor () {
        this.data = {
            totalSpellList,
            base : new jsonWrapper("./static/base.json"),
            equipment : new jsonWrapper("./static/equipment.json"),
            stats : new jsonWrapper("./static/stats.json"),
            spells : new spellJsonWrapper("./static/spells.json", [["spellbook"], ["equipped"]]),
            diceHistory : new DiceHistory()
        }
    }

    loadAllData () {
        this.data.totalSpellList.load();

        this.data.base.read();
        this.data.equipment.read();
        this.data.stats.read();
        this.data.spells.read();

        //throw JSON.stringify(this.data.spells, null, 2);
    }
}();