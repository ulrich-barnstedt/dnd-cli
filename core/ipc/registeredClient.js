const ipc = require("node-ipc").default;

module.exports = class RegisteredClient {
    constructor (socket, uuid) {
        this.socket = socket;
        this.uuid = uuid;
        this.subscribedTypes = [];
    }

    subscribe (type) {
        this.subscribedTypes.push(type);
    }

    unsubscribe (type) {
        let index = this.subscribedTypes.indexOf(type);
        if (index === -1) return;

        this.subscribedTypes.splice(index, 1);
    }

    isSubscribed (type) {
        return this.subscribedTypes.includes(type);
    }

    sendData (type, data) {
        ipc.server.emit(
            this.socket,
            "data",
            {
                data,
                type
            }
        )
    }
}