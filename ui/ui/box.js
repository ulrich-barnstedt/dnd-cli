const blessed = require("neo-blessed");

module.exports = class Box {
    constructor (parent, options) {
        this.widget = blessed.box({
            parent,
            border: 'line',
            ...options
        })
    }

    setContent (to) {
        this.widget.setContent(to);
    }
}

/*style : {
    border : {
        fg : "red"
    },
    label : {
        fg : "red"
    }
},*/

//scrollable : true,
//style,
//label,
//content
//top: "center",
//left: "center",
//width: "50%",
//height: 10,