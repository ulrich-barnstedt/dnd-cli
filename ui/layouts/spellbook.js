const elements = require("../ui/elements");

class SpellBookLayout extends elements.LayoutHelper {
    setupUI () {
        this.mainBox = new elements.Box(this.layout.widget, {label : "Book", style : {border : {fg : "red"}}});
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