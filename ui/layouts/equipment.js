const blessed = require("neo-blessed");
const elements = require("../ui/elements");

class EquipmentLayout extends elements.LayoutHelper {
    setupUI () {
        this.boxes = {
            inventory : new elements.List(this.layout.widget, {
                label : "Inventory"
            }, item => `${item.amount}x ${item.name}`, {dataColor : "green"}),
            languages : new elements.List(this.layout.widget, {
                label : "Languages spoken"
            }, s => s, {dataColor : "green"}, 1),
            proficienciesArmor : new elements.List(this.layout.widget, {
                label : "Armor Proficiencies"
            }, s => s, undefined, 1),
            proficienciesWeapons : new elements.List(this.layout.widget, {
                label : "Weapon proficiencies"
            }, s => s, {dataColor : "yellow"}, 1),
            proficienciesTools : new elements.List(this.layout.widget, {
                label : "Tool Proficiencies"
            }, s => s, undefined, 1),
        };
    }

    onLoad () {
        this.client.subscribe("equipment");
        this.client.requestData("equipment");
    }

    onHide () {
        this.client.unsubscribe("equipment");
    }

    onData_equipment ({data : equip}) {
        this.boxes.inventory.setContent(equip.equipment);
        this.boxes.languages.setContent(equip.languages);
        this.boxes.proficienciesArmor.setContent(equip.proficiencies.armor);
        this.boxes.proficienciesTools.setContent(equip.proficiencies.tools);
        this.boxes.proficienciesWeapons.setContent(equip.proficiencies.weapons);

        this.base.render();
    }
}

const equipmentLayout = (base, client) => {
    let templateLayout = new EquipmentLayout(base, client);
    return templateLayout.layout;
}

module.exports = equipmentLayout;