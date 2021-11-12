const convert = {
    CP : Symbol("CP"),
    SP : Symbol("SP"),
    EP : Symbol("EP"),
    GP : Symbol("GP"),
    PP : Symbol("PP"),

    toGP : function (from, value) {
        switch (from) {
            case this.CP:
                value /= 100;
                break;
            case this.SP :
                value /= 10;
                break;
            case this.EP:
                value /= 2;
                break;
            case this.PP:
                value *= 10;
                break;
            default:
                break;
        }

        return value;
    },
    fromGP : function (to, value) {
        switch (to) {
            case this.CP:
                value *= 100;
                break;
            case this.SP:
                value *= 10;
                break;
            case this.EP:
                value *= 2;
                break;
            case this.PP:
                value /= 10;
                break;
            default:
                break;
        }

        return value;
    }
}

module.exports = convert;