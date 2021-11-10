const Box = require("../ui/box");
const LayoutHelper = require("../utils/layoutHelper");

class SpellBookLayout extends LayoutHelper {
    setupUI () {
        this.mainBox = new Box(this.layout.widget, {label : "Book", style : {border : {fg : "red"}}});
    }

    genericSetup () {
        this.client.onDataUpdate("totalSpellList", (d) => {
            this.mainBox.setContent(d.spells.map(a => a.name).join("\n"));
            this.base.render();
        })
    }

    onLoad () {
        this.client.requestMissing("totalSpellList");
    }
}

const spellBookLayout = (parent, client) => {
    let sbLayout = new SpellBookLayout(parent, client);
    return sbLayout.layout;
}

module.exports = spellBookLayout;