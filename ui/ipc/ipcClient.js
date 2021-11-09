const {default : ipc} = require("node-ipc");
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

ipc.config.appspace = "dnd.";
ipc.config.id = uuid;
ipc.config.logger = () => {};

module.exports = new class IPCClient {
    constructor () {
        ipc.connectTo("server", () => {
            ipc.of.server.on(
                'connect',
                this.init.bind(this)
            );

            ipc.of.server.on("data", this.event_handleData.bind(this));
        });

        this.data = {};
        this.updateHandlers = {};
    }

    event_handleData (data) {
        this.data[data.type] = data.data;
        if (!this.updateHandlers[data.type]) return;

        for (let fn of this.updateHandlers[data.type]) {
            fn(this.data[data.type]);
        }
    }

    onDataUpdate (type, fn) {
        if (!(type in this.updateHandlers)) {
            this.updateHandlers[type] = [];
        }

        this.updateHandlers[type].push(fn);
    }

    // methods

    subscribe (type) {
        ipc.of.server.emit("subscribe", {uuid, type});
    }

    unsubscribe (type) {
        ipc.of.server.emit("unsubscribe", {uuid, type});
    }

    requestData (type) {
        ipc.of.server.emit("requestData", {uuid, type});
    }

    requestMissing (type) {
        if (this.data[type] === undefined) {
            this.requestData(type);
        } else {
            this.event_handleData({type, data : this.data[type]});
        }
    }

    init () {
        ipc.of.server.emit(
            'init',
            {
                uuid,
                id : uuid
            }
        );
    }

}();
