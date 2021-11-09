const blessed = require("neo-blessed");

module.exports = class Layout {
    constructor (parent) {
        this.widget = blessed.layout({
            parent,
            top: 2,
            left: 'center',
            width: '100%',
            height: '100%-2',
            layout: 'inline',
            hidden: true,
            style: {}
        });

        this.onFocus = () => {};
    }

    show () {
        this.onFocus();
        this.widget.show();
    }

    hide () {
        this.widget.hide();
    }
}