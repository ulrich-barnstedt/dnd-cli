const Layout = require("../ui/layout");
const Box = require("../ui/box");

class SpellBookLayout {
    constructor (base, client) {
        this.layout = new Layout(base.screen);
        this.base = base;
        this.client = client;

        this.mainBox = new Box(this.layout.widget, "Book", undefined, {border : {fg : "red"}});
        this.layout.onFocus = this.loadData.bind(this);

        this.setup();
    }

    setup () {
        this.client.onDataUpdate("totalSpellList", (d) => {
            this.mainBox.setContent(d.spells.map(a => a.name).join("\n"));
            this.base.render();
        })
    }

    loadData () {
        this.client.requestMissing("totalSpellList");
    }
}

const spellBookLayout = (parent, client) => {
    let sbLayout = new SpellBookLayout(parent, client);
    return sbLayout.layout;
}

module.exports = spellBookLayout;