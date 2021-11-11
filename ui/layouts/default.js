const elements = require("../ui/elements");
const blessed = require("neo-blessed");

const info = `{red-fg}{bold}D N D - 5 e{/bold}{/red-fg}

{yellow-fg}DND-CLI Beta{/yellow-fg}
By 0x81 / Ulrich Barnstedt 
`;

const defaultLayout = (base) => {
    let layout = new elements.Layout(base.screen);

    let container = new elements.Box(layout.widget, {
        border : undefined
    })

    let image = blessed.image({
        parent : container.widget,
        file : __dirname + "/../../shared/dnd.png",
        width : "100%",
        height : "100%-2"
    })

    let infoBox = new elements.Box(container.widget, {
        tags : true,
        content : info,
        right : 0,
        bottom : 0,
        width : "shrink",
        padding : {
            right : 2,
            top : 1,
            left : 1
        },
        style : {
            border : {
                fg : "white"
            }
        }
    });

    return layout;
}

module.exports = defaultLayout;