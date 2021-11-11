const term = require('terminal-kit').terminal;

module.exports = class Command {
    run (params, data, server) {
        term("\n");
        this.wrappedRun(params, data, server);
    }

    wrappedRun (params, data, server) {
        term(params.join(" "))("\n");
    }
}