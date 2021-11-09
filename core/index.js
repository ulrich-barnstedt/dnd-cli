const server = require("./ipc/ipcServer");
const dndData = require("./data/dnddata");

dndData.loadAllData();

console.log(dndData);

let ipcServer = new server(dndData);