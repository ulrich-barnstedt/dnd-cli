const term = require('terminal-kit').terminal;
const Command = require("../../command");
const diceRoller = require("../../../utils/diceRoller");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let id = +parts[0];
        if (isNaN(id)) return;

        let list = data.base.data.weapons;
        if (id >= list.length || id < 0) {
            term.red("Invalid weapon id.\n");
            return;
        }

        let weapon = list[id];
        let atkRoll = diceRoller("d20" + "+" + weapon.atkBonus, data.diceHistory).sum;
        let dmgRoll = diceRoller(weapon.dmg, data.diceHistory).sum;

        term("You attempt to attack with: ").green(weapon.name)("\n");
        term("Attack roll: ").green(atkRoll)("\n");
        term("On hit, you deal ").green(dmgRoll)(" " + weapon.type + " damage.\n");
    }
}(__filename);