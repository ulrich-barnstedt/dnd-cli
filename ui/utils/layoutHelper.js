const Layout = require("../ui/layout");

module.exports = class LayoutHelper {
    constructor (base, client) {
        this.base = base;
        this.client = client;
        this.layout = new Layout(this.base.screen);

        this.layout.onLoad = this.onLoad.bind(this);
        this.layout.onHide = this.onHide.bind(this);

        this.setupUI();
        this.genericSetup();
        this.client.onDataUpdate("base", this.onData.bind(this));

    }

    genericSetup () {}

    setupUI () {}

    onLoad () {}

    onHide () {}

    onData () {}
}