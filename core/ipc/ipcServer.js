const ipc = require("node-ipc").default;
const RegisteredClient = require("./registeredClient");

ipc.config.appspace = "dnd.";
ipc.config.id = "server"
ipc.config.logDepth = 2;
ipc.config.logger = () => {};

module.exports = class IPCServer {
    constructor (dataClass) {
        this.clients = {};
        this.data = dataClass;

        ipc.serve(() => {
            ipc.server.on("init", this.client_init.bind(this));
            ipc.server.on("socket.disconnected", this.client_remove.bind(this));

            ipc.server.on("subscribe", this.client_subscribe.bind(this));
            ipc.server.on("unsubscribe", this.client_unsubscribe.bind(this));
            ipc.server.on("requestData", this.client_requestData.bind(this));
        });

        ipc.server.start();
    }

    // connection management

    client_init (data, socket) {
        this.clients[data.uuid] = new RegisteredClient(socket, data.uuid);
    }

    client_remove (socket, uuid) {
        delete this.clients[uuid];
    }

    // data interface

    client_subscribe (data) {
        this.clients[data.uuid].subscribe(data.type);
    }

    client_unsubscribe (data) {
        this.clients[data.uuid].unsubscribe(data.type);
    }

    client_requestData (data) {
        let currentData = this.data.data[data.type];
        this.clients[data.uuid].sendData(data.type, currentData);
    }

    // external methods

    server_triggerUpdate (type) {
        let data = this.data.data[type];

        for (let key in this.clients) {
            let client = this.clients[key];

            if (!client.isSubscribed(type)) continue;
            client.sendData(type, data);
        }
    }

    TU (type) {
        this.server_triggerUpdate(type);
    }
};
