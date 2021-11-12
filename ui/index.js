const Client = require("./ipc/ipcClient");
const Base = require("./ui/base");
const LayoutManager = require("./ui/layoutManager");

const HomeLayout = require("./layouts/home");
const DefaultLayout = require("./layouts/default");
const SpellBookLayout = require("./layouts/spellbook");
const EquipmentLayout = require("./layouts/equipment");
const FeaturesLayout = require("./layouts/features");

let baseUI = new Base(["&", "Home", "Equipment", "Spellbook", "Features", "Quit"]);
let client = new Client(baseUI);
let layoutManager = new LayoutManager(baseUI);

layoutManager.registerLayout("&", DefaultLayout(baseUI, client));
layoutManager.registerLayout("Home", HomeLayout(baseUI, client));
layoutManager.registerLayout("Spellbook", SpellBookLayout(baseUI, client));
layoutManager.registerLayout("Equipment", EquipmentLayout(baseUI, client));
layoutManager.registerLayout("Features", FeaturesLayout(baseUI, client));

layoutManager.changeLoadedLayout("&");