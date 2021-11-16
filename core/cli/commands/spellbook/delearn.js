const term = require('terminal-kit').terminal;
const Command = require("../../command");

module.exports = new class extends Command {
    registerSubcommands () {
        this.sub = {
            cantrip : new class extends Command {
                defaultBehaviour (parts, data, server) {
                    let dSpell = data.spells.data;
                    let id = +parts[0];
                    if (isNaN(id)) return;

                    if (id < 0 || id >= dSpell.equipped[0].length) {
                        term.red("This spell could not be found.\n");
                        return;
                    }

                    let deleted = dSpell.equipped[0].splice(id, 1)[0];

                    data.spells.write();
                    server.TU("spells");

                    term.green("Deleted " + deleted.name + " from your cantrips.\n");
                }
            }(__filename)
        };
    }

    defaultBehaviour (parts, data, server) {
        let dSpell = data.spells.data;
        let id = +parts[0];
        if (isNaN(id)) return;

        if (id < 0 || id >= dSpell.spellbook.length) {
            term.red("This spell could not be found.\n");
            return;
        }

        let deleted = dSpell.spellbook.splice(id, 1)[0];

        data.spells.write();
        server.TU("spells");

        term.green("Deleted " + deleted.name + " from your spellbook.\n");
    }
}(__filename);