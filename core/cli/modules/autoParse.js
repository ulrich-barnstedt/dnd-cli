module.exports = (parts, types) => {
    let output = [];

    for (let type of types) {
        if (type.size === "1") {
            output.push(type.parser(parts.pop()));
        } else if (type.size === "N") {
            output.push(type.parser(parts));
            parts = [];
        }
    }

    return output;
}