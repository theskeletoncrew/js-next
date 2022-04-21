/// <reference types="node" />
import { Connection, GetProgramAccountsConfig, GetProgramAccountsFilter, PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';
import BN from 'bn.js';
import { AccountInfoWithPublicKey } from './AccountInfoWithPublicKey';
import { GmaBuilder, GmaBuilderOptions } from './GmaBuilder';
import { Postpone } from './Postpone';
export declare type GpaSortCallback = (a: AccountInfoWithPublicKey<Buffer>, b: AccountInfoWithPublicKey<Buffer>) => number;
export declare class GpaBuilder {
    /** The connection instance to use when fetching accounts. */
    protected readonly connection: Connection;
    /** The public key of the program we want to retrieve accounts from. */
    protected readonly programId: PublicKey;
    /** The configs to use when fetching program accounts. */
    protected config: GetProgramAccountsConfig;
    /** When provided, reorder accounts using this callback. */
    protected sortCallback?: GpaSortCallback;
    constructor(connection: Connection, programId: PublicKey);
    static from<T extends typeof GpaBuilder>(this: T, builder: GpaBuilder): InstanceType<T>;
    mergeConfig(config: GetProgramAccountsConfig): this;
    slice(offset: number, length: number): this;
    withoutData(): this;
    addFilter(...filters: GetProgramAccountsFilter[]): this;
    where(offset: number, bytes: string | Buffer | PublicKey | BN | number): this;
    whereSize(dataSize: number): this;
    sortUsing(callback: GpaSortCallback): this;
    get(): Promise<AccountInfoWithPublicKey<Buffer>[]>;
    lazy(): Postpone<AccountInfoWithPublicKey<Buffer>[]>;
    getAndMap<T>(callback: (account: AccountInfoWithPublicKey<Buffer>) => T): Promise<T[]>;
    getPublicKeys(): Promise<PublicKey[]>;
    getDataAsPublicKeys(): Promise<PublicKey[]>;
    getMultipleAccounts(callback?: (account: AccountInfoWithPublicKey<Buffer>) => PublicKey, options?: GmaBuilderOptions): Postpone<GmaBuilder>;
}
