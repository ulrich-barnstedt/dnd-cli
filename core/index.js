const Server = require("./ipc/ipcServer");
const dndData = require("./data/dnddata");
const CLI = require("./cli/cli");
const registerCommands = require("./cli/registerCommands");

dndData.loadAllData();

let server = new Server(dndData);
let cli = new CLI(server);

registerCommands(cli);
cli.inputField();