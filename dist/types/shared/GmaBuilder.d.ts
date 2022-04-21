/// <reference types="node" />
import { Connection, PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { MaybeAccountInfoWithPublicKey } from './AccountInfoWithPublicKey';
import { Postpone } from './Postpone';
export interface GmaBuilderOptions {
    chunkSize?: number;
}
export declare class GmaBuilder {
    protected readonly connection: Connection;
    protected readonly publicKeys: PublicKey[];
    protected chunkSize: number;
    constructor(connection: Connection, publicKeys: PublicKey[], options?: GmaBuilderOptions);
    static make(connection: Connection, publicKeys: PublicKey[], options?: GmaBuilderOptions): GmaBuilder;
    chunkBy(n: number): this;
    addPublicKeys(publicKeys: PublicKey[]): this;
    getPublicKeys(): PublicKey[];
    getUniquePublicKeys(): PublicKey[];
    getFirst(n?: number): Promise<MaybeAccountInfoWithPublicKey<Buffer>[]>;
    getLast(n?: number): Promise<MaybeAccountInfoWithPublicKey<Buffer>[]>;
    getBetween(start: number, end: number): Promise<MaybeAccountInfoWithPublicKey<Buffer>[]>;
    getPage(page: number, perPage: number): Promise<MaybeAccountInfoWithPublicKey<Buffer>[]>;
    get(): Promise<MaybeAccountInfoWithPublicKey<Buffer>[]>;
    lazy(): Postpone<MaybeAccountInfoWithPublicKey<Buffer>[]>;
    getAndMap<T>(callback: (account: MaybeAccountInfoWithPublicKey<Buffer>) => T): Promise<T[]>;
    protected getChunks(publicKeys: PublicKey[]): Promise<MaybeAccountInfoWithPublicKey<Buffer>[]>;
    protected getChunk(publicKeys: PublicKey[]): Promise<MaybeAccountInfoWithPublicKey<Buffer>[]>;
    protected boundNumber(n: number): number;
    protected boundIndex(index: number): number;
}
