const blessed = require("neo-blessed");

module.exports = class Base {
    constructor (categories, defaultTab = "&") {
        this.categories = Object.fromEntries(categories.map(a => [a[0], a]));
        this.updateHandlers = [];
        this.selectedTab = defaultTab;

        this.screen = blessed.screen({
            smartCSR : true,
            autoPadding : true,
            lockKeys : true
        });

        this.menuBar = blessed.box({
            parent : this.screen,
            tags : true,
            height : 1,
            style : {
                bg : "red"
            }
        })

        this.screen.key(['escape', 'q', 'C-c'], function() {
            this.screen.destroy();
            process.exit(0);
        });

        this.screen.on('keypress', this.onKeyPress.bind(this));

        this.updateMenuBarContent();
        this.render();
    }

    render () {
        this.screen.render();
    }

    tagToHeaderText (tag, isSelected) {
        let bg = isSelected ? "white" : "red";
        let [char, ...rest] = tag;
        return `{${bg}-bg} {underline}${char}{/underline}${rest.join("")} {/${bg}-bg}`;
    }

    updateMenuBarContent () {
        let tagTexts = [];

        for (let key in this.categories) {
            tagTexts.push(this.tagToHeaderText(this.categories[key], key === this.selectedTab));
        }

        let content = tagTexts.join("  ");

        this.menuBar.setContent(`  {black-fg}${content}{/black-fg}`);
        this.render();
    }

    onMenuBarChange (func) {
        this.updateHandlers.push(func);
    }

    onKeyPress (key) {
        if (!key) return;

        key = key.toUpperCase();
        if (!(key in this.categories)) return;

        this.selectedTab = key;
        this.updateMenuBarContent();

        for (let func of this.updateHandlers) {
            func(this.categories[this.selectedTab]);
        }
    }
}