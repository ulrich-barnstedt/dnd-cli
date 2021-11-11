const elements = require("../ui/elements");
const blessed = require("neo-blessed");

/*
            //TODO: move to stats page to make home less cramped?
            meta : new elements.ObjectMapper (this.layout.widget, {
                label : "Meta",
            }, {
                age : "Age",
                eyes : "Eye color",
                height : "Height",
                hair : "Hair color",
                skin : "Skin color",
                design : "Design inspiration"
            }, {
                tagColor : "blue",
                dataColor : "green"
            }),
 */

const featuresLayout = (base, client) => {
    let layout = new elements.Layout(base.screen);
    let box = new elements.Box(layout.widget, {content : "features"});

    return layout;
}

module.exports = featuresLayout;