const jsonWrapper = require("../data/jsonInstanceWrapper");
const resolver = require("./resolve");
const fs = require("fs");

// resolver path : [["a", "b"], ...]

module.exports = class extends jsonWrapper {
    constructor (path, resolverPaths) {
        super(path);

        this.resolverPaths = resolverPaths;
    }

    #pathForEach (data, fn) {
        for (let path of this.resolverPaths) {
            let at = data;

            for (let element of path) {
                at = at[element];
            }

            for (let levelList of at) {
                for (let i = 0; i < levelList.length; i++) {
                    levelList[i] = fn(levelList[i]);
                }
            }
        }
    }

    read () {
        super.read();
        this.#pathForEach(this.data,(e) => resolver(e));
    }

    write () {
        let data = JSON.parse(JSON.stringify(this.data));
        this.#pathForEach(data,(e) => e.id);

        fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
    }
}