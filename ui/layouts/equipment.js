const Layout = require("../ui/layout");
const Box = require("../ui/box");
const blessed = require("neo-blessed");

const equipmentLayout = (base, client) => {
    let layout = new Layout(base.screen);
    let box = new Box(layout.widget, {content : "equip"});

    return layout;
}

module.exports = equipmentLayout;