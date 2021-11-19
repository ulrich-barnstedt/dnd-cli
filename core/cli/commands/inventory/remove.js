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
        if (isNaN(amount) || amount < 0) amount = 0;

        list[slot].amount -= amount;
        if (list[slot].amount <= 0) {
            let item = list.splice(slot, 1)[0];
            term.yellow("Removed item " + item.name + " from your inventory. (Amount <= 0)\n");

            data.equipment.write();
            server.TU("equipment");

            return;
        }

        data.equipment.write();
        server.TU("equipment");

        term("Removed ").red(`${amount}x ${list[slot].name}`)(" from your inventory. (").yellow(list[slot].amount)(" left)\n");
    }
}(__filename);