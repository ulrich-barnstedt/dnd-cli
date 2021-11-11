const elements = require("../ui/elements");
const mapFn = element => {
    if (element === "mt") {
        return "{yellow-fg}<empty>{/yellow-fg}";
    }

    let lvl = element.level === "cantrip" ? 0 : element.level;
    return `L${lvl} | ${element.name}`
};

class SpellBookLayout extends elements.LayoutHelper {
    setupUI () {
        this.boxes = {
            spellbook : new elements.List(this.layout.widget, {
                label : "Spellbook"
            }, mapFn, {dataColor : "green"}),
            equipped : new elements.List(this.layout.widget, {
                label : "Equipped"
            }, mapFn)
        };
    }

    onData_spells ({data: spells}) {
        this.boxes.spellbook.setContent(spells.spellbook.flat());

        let equipped = spells.equipped.flat();
        for (let i = 0; i < spells.maxEquippedSpells; i++) {
            equipped.push("mt");
        }
        this.boxes.equipped.setContent(equipped);

        this.base.render();
    }

    onLoad () {
        this.client.subscribe("spells");
        this.client.requestData("spells");
    }

    onHide () {
        this.client.unsubscribe("spells");
    }
}

const spellBookLayout = (parent, client) => {
    let sbLayout = new SpellBookLayout(parent, client);
    return sbLayout.layout;
}

module.exports = spellBookLayout;