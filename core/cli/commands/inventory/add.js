const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let [amount, ...name] = parts;
        amount = +amount;
        name = name.join(" ");
        if (isNaN(amount)) return;

        if (amount < 1) {
            term.red("Cannot add zero or less of an object.\n");
            return;
        }

        let obj = {
            name,
            amount
        };
        data.equipment.data.equipment.push(obj);

        data.equipment.write();
        server.TU("equipment");

        term("Added ").green(`${amount}x ${name}`)(" to your inventory.\n");
    }
}(__filename);