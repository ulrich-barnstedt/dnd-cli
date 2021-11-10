const Layout = require("../ui/layout");
const Box = require("../ui/box");
const blessed = require("neo-blessed");

const featuresLayout = (base, client) => {
    let layout = new Layout(base.screen);
    let box = new Box(layout.widget, {content : "features"});

    return layout;
}

module.exports = featuresLayout;