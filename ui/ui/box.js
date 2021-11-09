const blessed = require("neo-blessed");

module.exports = class Box {
    constructor (parent, label, content, style = {}) {
        this.widget = blessed.box({
            parent,
            //top: "center",
            //left: "center",
            width: "50%",
            //height: 10,
            border: 'line',
            style,
            label,
            content
        })
    }

    setContent (to) {
        this.widget.setContent(to);
    }
}