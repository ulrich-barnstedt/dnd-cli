const term = require('terminal-kit').terminal;
const Command = require("../../command");
const diceRoller = require("../../../utils/diceRoller");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        let a = +parts[0];
        if (isNaN(a)) a = 0;

        if (a < 0 || a > data.base.data.hitDice.currentCount) {
            term.red("Invalid amount of hitdice (have " + data.base.data.hitDice.currentCount + ").\n");
            return;
        }

        term.green("You rest for an hour.\n");

        if (a === 0) {
            term("Applied no hit dice.\n");
            return;
        }

        if (data.base.data.hp.currentHp === data.base.data.hp.maxHp) {
            term("Applied no hit dice (").yellow("HP is full")(").\n");
            return;
        }

        let dice = a + "d" + (data.base.data.hitDice.size + data.stats.data.stats.constitution.modifier);
        let hp = diceRoller(dice, data.diceHistory).sum;
        data.base.data.hitDice.currentCount -= a;
        data.base.data.hp.currentHp = Math.min(data.base.data.hp.maxHp, data.base.data.hp.currentHp + hp);

        term(`Rolled ${dice} for `)
            .green(hp)
            (` hp with a new total of `)
            .green(data.base.data.hp.currentHp)
            (`. (`).yellow(data.base.data.hitDice.currentCount)
            (` hit dice left)\n`);

        data.base.write();
        server.TU("base");
    }
}(__filename);

/*
        // .TODO: regen slots

        if (b < 1 || b > 9) {
            term.red("Invalid spell slot. Cannot regenerate.\n");
            return;
        }
 */