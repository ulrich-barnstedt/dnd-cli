const blessed = require("neo-blessed");
const objectToStringMapper = require("../utils/objectToStringMapper");
const Box = require("../ui/box");
const LayoutHelper = require("../utils/layoutHelper");
const BoxedObjectToStringMapper = require("../utils/boxedObjectToStringMapper");

class TemplateLayout extends LayoutHelper {}

const templateLayout = (base, client) => {
    let templateLayout = new TemplateLayout(base, client);
    return templateLayout.layout;
}

module.exports = templateLayout;