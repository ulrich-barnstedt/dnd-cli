const term = require('terminal-kit').terminal;

module.exports = class Command {
    run (params) {
        term("\n");
        this.wrappedRun(params);
    }

    wrappedRun (params) {
        term(params.join(" "))("\n");
    }
}