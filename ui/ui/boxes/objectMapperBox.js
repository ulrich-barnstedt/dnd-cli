const TextBox = require("./textBox");
const objectToStringMapper = require("../../utils/objectToStringMapper");

module.exports = class ObjectMapperBox extends TextBox {
    constructor (parent, options, schema, OTSMOptions) {
        super(parent, options);
        this.schema = objectToStringMapper(schema, OTSMOptions?.tagColor, OTSMOptions?.dataColor);
    }

    setContent (to) {
        super.setContent(this.schema(to));
    }
}