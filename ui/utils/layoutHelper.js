const Layout = require("../ui/layout");

module.exports = class LayoutHelper {
    constructor (base, client) {
        this.base = base;
        this.client = client;
        this.layout = new Layout(this.base.screen);

        this.layout.onLoad = this.onLoad.bind(this);
        this.layout.onHide = this.onHide.bind(this);

        this.setupUI();

        let keys = Object.getOwnPropertyNames(this.constructor.prototype);
        for (let element of keys) {
            if (!element.startsWith("onData_")) continue;
            let type = element.replace("onData_", "");

            this.client.onDataUpdate(type, (d) => {
                if (this.layout.hidden) return;

                this[element](d);
            });
        }
    }

    setupUI () {}

    onLoad () {}

    onHide () {}
}