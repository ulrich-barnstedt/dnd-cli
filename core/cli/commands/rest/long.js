const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    defaultBehaviour (parts, data, server) {
        term.green("You rest for 8 hours.\n");

        data.base.data.hp.currentHp = data.base.data.hp.maxHp;
        term(`Regenerated all hp (`).green(data.base.data.hp.currentHp)(`).\n`);

        for (let i = 1; i < data.spells.data.spellSlots.length; i++) {
            data.spells.data.spellSlots[i].current = data.spells.data.spellSlots[i].max;
        }
        term("Regenerated all spell slots.\n");

        data.base.data.hitDice.currentCount = Math.min(
            data.base.data.hitDice.maxCount,
            data.base.data.hitDice.currentCount + data.base.data.hitDice.maxCount / 2
        );
        term("Regenerated 50% of hit dice.\n");

        data.base.write();
        data.spells.write();
        server.TU("spells");
        server.TU("base");
    }
}(__filename);