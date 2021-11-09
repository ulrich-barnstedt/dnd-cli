module.exports = class LayoutManager {
    constructor (UIBase) {
        this.UIBase = UIBase;
        this.layouts = {};
        this.currentLayout = null;

        this.UIBase.onMenuBarChange(this.changeLoadedLayout.bind(this));
    }

    registerLayout (name, layout) {
        this.layouts[name] = layout;
    }

    changeLoadedLayout (to) {
        if (!(to in this.layouts)) return;
        if (this.currentLayout !== null) this.layouts[this.currentLayout].hide();

        this.currentLayout = to;
        this.layouts[this.currentLayout].show();

        this.UIBase.render();
    }
}