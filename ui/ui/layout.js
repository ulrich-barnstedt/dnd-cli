const blessed = require("neo-blessed");

module.exports = class Layout {
    constructor (parent) {
        this.widget = blessed.layout({
            parent,
            top: 2,
            shrink : false,
            width: '100%',
            height: '100%-2',
            layout: 'inline',
            hidden: true,
            style: {}
        });

        this.onLoad = () => {};
        this.onHide = () => {}
    }

    show () {
        this.onLoad();
        this.widget.show();
    }

    hide () {
        this.onHide();
        this.widget.hide();
    }
}