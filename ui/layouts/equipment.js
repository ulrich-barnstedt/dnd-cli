const elements = require("../ui/elements");
const blessed = require("neo-blessed");

const equipmentLayout = (base, client) => {
    let layout = new elements.Layout(base.screen);
    let box = new elements.Box(layout.widget, {content : "equip"});

    return layout;
}

module.exports = equipmentLayout;