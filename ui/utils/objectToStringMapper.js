// example schema:
/*
{
    someProp : "Some Property",
    someTable : {
        someNestedProp : "Some nested property"
    }
}
 */

const map = (schema, data, tagColor, dataColor) => {
    if (typeof schema === "string") {
        return `{${tagColor}-fg}${schema}{/${tagColor}-fg}: {${dataColor}-fg}${data}{/${dataColor}-fg}`;
    }

    let lines = [];
    let title = schema._title;
    let indent = "";

    if (title) {
        indent = "  ";
        lines.push(`{${tagColor}-fg}${title}{/${tagColor}-fg}:`);
    }

    for (let key in schema) {
        if (key === "_title") continue;

        lines.push(indent + map(schema[key], data[key], tagColor, dataColor, key));
    }

    return lines.join("\n");
}

module.exports = (schema, tagColor = "red", dataColor = "yellow") => {
    return (currentData) => {
        return map(schema, currentData, tagColor, dataColor);
    }
}