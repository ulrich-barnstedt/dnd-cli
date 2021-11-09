const totalSpellList = require("./totalSpellList");
const jsonWrapper = require("./jsonInstanceWrapper");

module.exports = new class DNDData {
    constructor () {
        this.data = {
            totalSpellList,
            base : new jsonWrapper("./static/base.json"),
            equipment : new jsonWrapper("./static/equipment.json"),
            stats : new jsonWrapper("./static/stats.json"),
            spells : new jsonWrapper("./static/spells.json")
        }
    }

    loadAllData () {
        this.data.base.read();
        this.data.equipment.read();
        this.data.stats.read();
        this.data.spells.read();

        this.data.totalSpellList.load();
    }
}();