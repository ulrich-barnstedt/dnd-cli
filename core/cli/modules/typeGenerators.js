module.exports = {
    num : (name, def) => {
        return {
            size : "1",
            name,
            parser : a => {
                a = +a;
                return isNaN(a) || a == null ? def : a;
            },
        }
    },
    str : (name, def) => {
        return {
            size : "1",
            name,
            parser : a => a === "" || a == null || a === " " ? def : a,
        }
    },
    longStr : (name, def) => {
        return {
            size : "N",
            name,
            parser : a => {
                a = a.join(" ");
                return a === "" || a === " " || a == null ? def : a;
            }
        }
    }
};