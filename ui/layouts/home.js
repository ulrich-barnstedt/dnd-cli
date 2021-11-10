const Layout = require("../ui/layout");
const Box = require("../ui/box");

const homeLayout = (base, client) => {
    let layout = new Layout(base.screen);
    let box = new Box(layout.widget, {label : "home", content : "just a home box"});

    return layout;
}

module.exports = homeLayout;