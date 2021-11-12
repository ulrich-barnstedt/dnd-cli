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

            for (let j = 0; j < at.length; j++) {
                if (Array.isArray(at[j])) {
                    for (let i = 0; i < at[j].length; i++) {
                        at[j][i] = fn(at[j][i]);
                    }
                } else {
                    at[j] = fn(at[j]);
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
        data.spellbook.sort((a, b) => a.level - b.level);
        this.#pathForEach(data,(e) => e.id);

        fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
    }
}