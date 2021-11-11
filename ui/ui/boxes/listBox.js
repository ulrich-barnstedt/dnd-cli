const TextBox = require("./textBox");

/*
Takes: array, function that gets called for every element, starting index, color options
Gives:
[idx] functionReturnString
cyan    red
 */

module.exports = class ListBox extends TextBox {
    constructor (parent,
                 options = {},
                 mappingFunction = (a) => {String(a)},
                 colorOptions = {
                    bracketColor : "blue", indexColor : "cyan", dataColor : "red"
                 },
                 startingIndex = 0) {
        super(parent, options);

        this.colorOptions = colorOptions;
        this.mappingFunction = mappingFunction;
        this.startingIndex = startingIndex;
    }

    setContent (array) {
        let lines = [];
        let idxDesign = [];

        if (this.colorOptions.bracketColor === this.colorOptions.indexColor) {
            idxDesign[0] = `{${this.colorOptions.bracketColor}-fg}[`;
            idxDesign[1] = `]{/${this.colorOptions.bracketColor}-fg}`
        } else {
            idxDesign[0] = `{${this.colorOptions.bracketColor}-fg}[{${this.colorOptions.indexColor}-fg}`;
            idxDesign[1] = `{/${this.colorOptions.indexColor}-fg}]{/${this.colorOptions.bracketColor}-fg}`;
        }

        for (let i = 0; i < array.length; i++) {
            let mapped = `{${this.colorOptions.dataColor}-fg}${this.mappingFunction(array[i])}{/${this.colorOptions.dataColor}-fg}`;
            lines.push(`${idxDesign[0]}${i + this.startingIndex}${idxDesign[1]} ${mapped}`);
        }

        super.setContent(lines.join("\n"));
    }
}