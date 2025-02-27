import { Connection } from '@solana/web3.js';
import {
  IdentityDriver,
  GuestIdentityDriver,
  StorageDriver,
  BundlrStorageDriver,
  RpcDriver,
  Web3RpcDriver,
} from '@/drivers';
import {
  OperationConstructor,
  Operation,
  KeyOfOperation,
  InputOfOperation,
  OutputOfOperation,
  OperationHandler,
} from '@/shared';
import { nftPlugin } from '@/modules';
import { MetaplexPlugin } from '@/MetaplexPlugin';
import { Task, TaskOptions, useTask } from './shared/useTask';
import { OperationHandlerMissingError } from '@/errors';

export type MetaplexOptions = {
  // ...
};

export class Metaplex {
  /** The connection object from Solana's SDK. */
  public readonly connection: Connection;

  /** Options that dictate how to interact with the Metaplex SDK. */
  public readonly options: MetaplexOptions;

  /** Encapsulates the identity of the users interacting with the SDK. */
  protected identityDriver: IdentityDriver;

  /** Encapsulates where assets should be uploaded. */
  protected storageDriver: StorageDriver;

  /** Encapsulates how to read and write on-chain. */
  protected rpcDriver: RpcDriver;

  /** The registered handlers for read/write operations. */
  protected operationHandlers: Map<string, OperationHandler<any, any, any, any>> = new Map();

  constructor(connection: Connection, options: MetaplexOptions = {}) {
    this.connection = connection;
    this.options = options;
    this.identityDriver = new GuestIdentityDriver(this);
    this.storageDriver = new BundlrStorageDriver(this);
    this.rpcDriver = new Web3RpcDriver(this);
    this.registerDefaultPlugins();
  }

  static make(connection: Connection, options: MetaplexOptions = {}) {
    return new this(connection, options);
  }

  registerDefaultPlugins() {
    this.use(nftPlugin());
  }

  use(plugin: MetaplexPlugin) {
    plugin.install(this);

    return this;
  }

  identity() {
    return this.identityDriver;
  }

  setIdentity(identity: IdentityDriver) {
    this.identityDriver = identity;

    return this;
  }

  storage() {
    return this.storageDriver;
  }

  setStorage(storage: StorageDriver) {
    this.storageDriver = storage;

    return this;
  }

  rpc() {
    return this.rpcDriver;
  }

  setRpc(rpc: RpcDriver) {
    this.rpcDriver = rpc;

    return this;
  }

  register<
    T extends Operation<K, I, O>,
    K extends string = KeyOfOperation<T>,
    I = InputOfOperation<T>,
    O = OutputOfOperation<T>
  >(
    operationConstructor: OperationConstructor<T, K, I, O>,
    operationHandler: OperationHandler<T, K, I, O>
  ) {
    this.operationHandlers.set(operationConstructor.key, operationHandler);

    return this;
  }

  getOperationHandler<
    T extends Operation<K, I, O>,
    K extends string = KeyOfOperation<T>,
    I = InputOfOperation<T>,
    O = OutputOfOperation<T>
  >(operation: T): OperationHandler<T, K, I, O> {
    const operationHandler = this.operationHandlers.get(operation.key) as
      | OperationHandler<T, K, I, O>
      | undefined;

    if (!operationHandler) {
      throw new OperationHandlerMissingError(operation.key);
    }

    return operationHandler;
  }

  getTask<
    T extends Operation<K, I, O>,
    K extends string = KeyOfOperation<T>,
    I = InputOfOperation<T>,
    O = OutputOfOperation<T>
  >(operation: T): Task<O> {
    const operationHandler = this.getOperationHandler<T, K, I, O>(operation);

    return useTask((scope) => {
      return operationHandler.handle(operation, this, scope);
    });
  }

  execute<
    T extends Operation<K, I, O>,
    K extends string = KeyOfOperation<T>,
    I = InputOfOperation<T>,
    O = OutputOfOperation<T>
  >(operation: T, options: TaskOptions = {}): Promise<O> {
    return this.getTask<T, K, I, O>(operation).run(options);
  }
}
