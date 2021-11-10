const Box = require("../ui/box");
const objectToStringMapper = require("../utils/objectToStringMapper");

module.exports = class BoxedObjectToStringMapper extends Box {
    constructor (parent, options, schema, OTSMOptions) {
        super(parent, {
            ...options, tags : true,
            padding : {
                top : 1,
                right : 5,
                left : 3,
                bottom : 1
            },
            width : "half"
        });

        this.schema = objectToStringMapper(schema, OTSMOptions?.tagColor, OTSMOptions?.dataColor);
    }

    setContent (to) {
        super.setContent(this.schema(to));
    }
}