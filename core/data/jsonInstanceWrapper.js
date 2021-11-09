const fs = require("fs");

module.exports = class JsonInstanceWrapper {
    constructor (path) {
        this.path = path;
        this.data = {};
    }

    read () {
        this.data = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }

    write () {
        fs.writeSync(this.path, JSON.stringify(this.data, null, 2));
    }
}