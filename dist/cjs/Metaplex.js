"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = void 0;
const drivers_1 = require("./drivers");
const modules_1 = require("./modules");
const useTask_1 = require("./shared/useTask");
const errors_1 = require("./errors");
class Metaplex {
    constructor(connection, options = {}) {
        /** The registered handlers for read/write operations. */
        this.operationHandlers = new Map();
        this.connection = connection;
        this.options = options;
        this.identityDriver = new drivers_1.GuestIdentityDriver(this);
        this.storageDriver = new drivers_1.BundlrStorageDriver(this);
        this.rpcDriver = new drivers_1.Web3RpcDriver(this);
        this.registerDefaultPlugins();
    }
    static make(connection, options = {}) {
        return new this(connection, options);
    }
    registerDefaultPlugins() {
        this.use((0, modules_1.nftPlugin)());
    }
    use(plugin) {
        plugin.install(this);
        return this;
    }
    identity() {
        return this.identityDriver;
    }
    setIdentity(identity) {
        this.identityDriver = identity;
        return this;
    }
    storage() {
        return this.storageDriver;
    }
    setStorage(storage) {
        this.storageDriver = storage;
        return this;
    }
    rpc() {
        return this.rpcDriver;
    }
    setRpc(rpc) {
        this.rpcDriver = rpc;
        return this;
    }
    register(operationConstructor, operationHandler) {
        this.operationHandlers.set(operationConstructor.key, operationHandler);
        return this;
    }
    getOperationHandler(operation) {
        const operationHandler = this.operationHandlers.get(operation.key);
        if (!operationHandler) {
            throw new errors_1.OperationHandlerMissingError(operation.key);
        }
        return operationHandler;
    }
    getTask(operation) {
        const operationHandler = this.getOperationHandler(operation);
        return (0, useTask_1.useTask)((scope) => {
            return operationHandler.handle(operation, this, scope);
        });
    }
    execute(operation, options = {}) {
        return this.getTask(operation).run(options);
    }
}
exports.Metaplex = Metaplex;
//# sourceMappingURL=Metaplex.js.map