const blessed = require("neo-blessed");
const elements = require("../ui/elements");

class TemplateLayout extends elements.LayoutHelper {}

const templateLayout = (base, client) => {
    let templateLayout = new TemplateLayout(base, client);
    return templateLayout.layout;
}

module.exports = templateLayout;