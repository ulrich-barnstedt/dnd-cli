const clientID = "911303645369339925";
const RPC = require("discord-rpc").Client;
const client = new RPC({ transport: 'ipc' });
const startTimestamp = new Date();
const data = require("./data/dnddata");

client.on("ready", () => {
    client.setActivity({
        details: "Playing D&D 5e",
        state: 'as ' + data.data.base.data.name,
        startTimestamp,
        largeImageKey: 'logo',
        largeImageText: 'Beta Release 2',
        //smallImageKey: 'dice',
        //smallImageText: 'i am my own pillows',
        instance: false,
    });
});

client.login({clientId : clientID});