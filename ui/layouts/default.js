const Layout = require("../ui/layout");
const Box = require("../ui/box");

const defaultLayout = (parent) => {
    let layout = new Layout(parent);
    let box = new Box(layout.widget, "default", "just a default box");

    return layout;
}

module.exports = defaultLayout;