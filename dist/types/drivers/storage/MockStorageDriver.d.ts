import BN from 'bn.js';
import { Metaplex } from "../../Metaplex";
import { MetaplexPlugin } from "../../MetaplexPlugin";
import { MetaplexFile } from '../filesystem/MetaplexFile';
import { StorageDriver } from './StorageDriver';
import { SolAmount } from "../../shared";
export interface MockStorageOptions {
    baseUrl?: string;
    costPerByte?: BN | number;
}
export declare const mockStorage: (options?: MockStorageOptions | undefined) => MetaplexPlugin;
export declare class MockStorageDriver extends StorageDriver {
    private cache;
    readonly baseUrl: string;
    readonly costPerByte: BN;
    constructor(metaplex: Metaplex, options?: MockStorageOptions);
    getPrice(...files: MetaplexFile[]): Promise<SolAmount>;
    upload(file: MetaplexFile): Promise<string>;
    download(uri: string): Promise<MetaplexFile>;
    downloadJson<T extends object>(uri: string): Promise<T>;
}
