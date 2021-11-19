const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let [atkBonus, dmg, type, ...name] = parts;
        atkBonus = +atkBonus;
        name = name.join(" ");
        let list = data.base.data.weapons;

        let obj = {
            atkBonus,
            dmg,
            type,
            name
        };

        list.push(obj);
        term("Added ").green(`${name} (${dmg} ${type}) (${atkBonus})`)(" to your inventory.\n");

        data.base.write();
        server.TU("base");
    }
}(__filename);