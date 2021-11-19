const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let [slot, amount] = parts;
        slot = +slot;
        amount = +amount;
        let list = data.equipment.data.equipment;

        if (isNaN(slot) && slot >= list.length) {
            term.red("Invalid slot.\n");
            return;
        }
        if (isNaN(amount) || amount < 0) amount = 1;

        list[slot].amount += amount;

        data.equipment.write();
        server.TU("equipment");

        term("Added ").green(`${amount}x ${list[slot].name}`)(" to your inventory. (").green(list[slot].amount)(" total)\n");
    }
}(__filename);