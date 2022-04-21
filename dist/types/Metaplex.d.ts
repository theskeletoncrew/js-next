import { Connection } from '@solana/web3.js';
import { IdentityDriver, StorageDriver, RpcDriver } from "./drivers";
import { OperationConstructor, Operation, KeyOfOperation, InputOfOperation, OutputOfOperation, OperationHandler } from "./shared";
import { MetaplexPlugin } from "./MetaplexPlugin";
import { Task, TaskOptions } from './shared/useTask';
export declare type MetaplexOptions = {};
export declare class Metaplex {
    /** The connection object from Solana's SDK. */
    readonly connection: Connection;
    /** Options that dictate how to interact with the Metaplex SDK. */
    readonly options: MetaplexOptions;
    /** Encapsulates the identity of the users interacting with the SDK. */
    protected identityDriver: IdentityDriver;
    /** Encapsulates where assets should be uploaded. */
    protected storageDriver: StorageDriver;
    /** Encapsulates how to read and write on-chain. */
    protected rpcDriver: RpcDriver;
    /** The registered handlers for read/write operations. */
    protected operationHandlers: Map<string, OperationHandler<any, any, any, any>>;
    constructor(connection: Connection, options?: MetaplexOptions);
    static make(connection: Connection, options?: MetaplexOptions): Metaplex;
    registerDefaultPlugins(): void;
    use(plugin: MetaplexPlugin): this;
    identity(): IdentityDriver;
    setIdentity(identity: IdentityDriver): this;
    storage(): StorageDriver;
    setStorage(storage: StorageDriver): this;
    rpc(): RpcDriver;
    setRpc(rpc: RpcDriver): this;
    register<T extends Operation<K, I, O>, K extends string = KeyOfOperation<T>, I = InputOfOperation<T>, O = OutputOfOperation<T>>(operationConstructor: OperationConstructor<T, K, I, O>, operationHandler: OperationHandler<T, K, I, O>): this;
    getOperationHandler<T extends Operation<K, I, O>, K extends string = KeyOfOperation<T>, I = InputOfOperation<T>, O = OutputOfOperation<T>>(operation: T): OperationHandler<T, K, I, O>;
    getTask<T extends Operation<K, I, O>, K extends string = KeyOfOperation<T>, I = InputOfOperation<T>, O = OutputOfOperation<T>>(operation: T): Task<O>;
    execute<T extends Operation<K, I, O>, K extends string = KeyOfOperation<T>, I = InputOfOperation<T>, O = OutputOfOperation<T>>(operation: T, options?: TaskOptions): Promise<O>;
}
