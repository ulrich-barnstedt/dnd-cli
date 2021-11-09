const Layout = require("../ui/layout");
const Box = require("../ui/box");

const homeLayout = (parent) => {
    let layout = new Layout(parent);
    let box = new Box(layout.widget, "home", "just a home box");

    return layout;
}

module.exports = homeLayout;