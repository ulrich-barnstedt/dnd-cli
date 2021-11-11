const elements = require("../ui/elements");
const blessed = require("neo-blessed");

const featuresLayout = (base, client) => {
    let layout = new elements.Layout(base.screen);
    let box = new elements.Box(layout.widget, {content : "features"});

    return layout;
}

module.exports = featuresLayout;