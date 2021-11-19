const Server = require("./ipc/ipcServer");
const dndData = require("./data/dnddata");
const CLI = require("./cli/cli");
const registerCommands = require("./cli/registerCommands");
const meta = require("../meta");
const term = require("terminal-kit").terminal;

dndData.loadAllData();

const rpc = require("./rpc");

let server = new Server(dndData);
let cli = new CLI(server);

registerCommands(cli);

term.cyan.italic(`DND CLI by 0x81 / Ulrich Barnstedt -- ${meta.version}\n\n`);
cli.inputField();