const client = require("./ipc/ipcClient");
const Base = require("./ui/base");
const LayoutManager = require("./ui/layoutManager");

const HomeLayout = require("./layouts/home");
const DefaultLayout = require("./layouts/default");
const SpellBookLayout = require("./layouts/spellbook");

let baseUI = new Base(["&", "Home", "Equipment", "Spellbook", "Features", "Quit"]);
let layoutManager = new LayoutManager(baseUI);

layoutManager.registerLayout("&", DefaultLayout(baseUI, client));
layoutManager.registerLayout("Home", HomeLayout(baseUI, client));
layoutManager.registerLayout("Spellbook", SpellBookLayout(baseUI, client));
layoutManager.changeLoadedLayout("&");