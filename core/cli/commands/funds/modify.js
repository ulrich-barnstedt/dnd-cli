const term = require('terminal-kit').terminal;
const Command = require("../../command");
const convert = require("../../../utils/convertCurrency");

module.exports = (factor) => new class extends Command {
    registerSubcommands () {
        let that = this;

        this.sub = {
            cp : new class extends Command {
                defaultBehaviour (params, data, server) {that.mod(convert.CP, params, data, server)}
            }(__filename),
            sp : new class extends Command {
                defaultBehaviour (params, data, server) {that.mod(convert.SP, params, data, server)}
            }(__filename),
            ep : new class extends Command {
                defaultBehaviour (params, data, server) {that.mod(convert.EP, params, data, server)}
            }(__filename),
            pp : new class extends Command {
                defaultBehaviour (params, data, server) {that.mod(convert.PP, params, data, server)}
            }(__filename),
            gp : new class extends Command {
                defaultBehaviour (params, data, server) {that.mod(convert.GP, params, data, server)}
            }(__filename),
        };
    }

    mod (symbol, parts, data, server) {
        let amount = Number(parts[0]) * factor;
        if (amount === 0 || isNaN(amount)) return;

        amount = convert.toGP(symbol, amount);
        data.base.data.funds += amount;

        data.base.write();
        server.TU("base");

        if (factor > 0) {
            term("Added ").green(amount + " GP")(" to your account.\n");
        } else {
            term("Deducted ").red(amount * -1 + " GP")(" from your account.\n");
        }
    }
}(__filename);