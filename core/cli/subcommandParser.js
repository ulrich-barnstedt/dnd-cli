module.exports = class subcommandParser {
    parse (array) {
        let command = array[0];
        if (!command in this) {
            return;
        }

        this[command](array.slice(1));
    }
}
