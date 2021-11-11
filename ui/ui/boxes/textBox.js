const Box = require("../box");

module.exports = class TextBox extends Box {
    constructor (parent, options) {
        super(parent, {
            ...options,
            tags : true,
            padding : {
                top : 1,
                right : 5,
                left : 3,
                bottom : 1
            },
            width : "half"
        });
    }
}