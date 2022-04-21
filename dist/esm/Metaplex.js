import { GuestIdentityDriver, BundlrStorageDriver, Web3RpcDriver, } from "./drivers";
import { nftPlugin } from "./modules";
import { useTask } from './shared/useTask';
import { OperationHandlerMissingError } from "./errors";
export class Metaplex {
    constructor(connection, options = {}) {
        /** The registered handlers for read/write operations. */
        this.operationHandlers = new Map();
        this.connection = connection;
        this.options = options;
        this.identityDriver = new GuestIdentityDriver(this);
        this.storageDriver = new BundlrStorageDriver(this);
        this.rpcDriver = new Web3RpcDriver(this);
        this.registerDefaultPlugins();
    }
    static make(connection, options = {}) {
        return new this(connection, options);
    }
    registerDefaultPlugins() {
        this.use(nftPlugin());
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
            throw new OperationHandlerMissingError(operation.key);
        }
        return operationHandler;
    }
    getTask(operation) {
        const operationHandler = this.getOperationHandler(operation);
        return useTask((scope) => {
            return operationHandler.handle(operation, this, scope);
        });
    }
    execute(operation, options = {}) {
        return this.getTask(operation).run(options);
    }
}
//# sourceMappingURL=Metaplex.js.map