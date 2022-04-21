import NodeBundlr, { WebBundlr } from '@bundlr-network/client';
import BigNumber from 'bignumber.js';
import { Metaplex } from "../../Metaplex";
import { MetaplexPlugin } from "../../MetaplexPlugin";
import { StorageDriver } from './StorageDriver';
import { MetaplexFile } from '../filesystem/MetaplexFile';
import { SolAmount } from "../../shared";
export interface BundlrOptions {
    address?: string;
    timeout?: number;
    providerUrl?: string;
    priceMultiplier?: number;
}
export declare const bundlrStorage: (options?: BundlrOptions) => MetaplexPlugin;
export declare class BundlrStorageDriver extends StorageDriver {
    protected bundlr: WebBundlr | NodeBundlr | null;
    protected options: BundlrOptions;
    constructor(metaplex: Metaplex, options?: BundlrOptions);
    getBalance(): Promise<SolAmount>;
    getPrice(...files: MetaplexFile[]): Promise<SolAmount>;
    upload(file: MetaplexFile): Promise<string>;
    uploadAll(files: MetaplexFile[]): Promise<string[]>;
    fundingNeeded(filesOrBytes: MetaplexFile[] | number, skipBalanceCheck?: boolean): Promise<BigNumber>;
    needsFunding(filesOrBytes: MetaplexFile[] | number, skipBalanceCheck?: boolean): Promise<boolean>;
    fund(filesOrBytes: MetaplexFile[] | number, skipBalanceCheck?: boolean): Promise<void>;
    protected getBytes(filesOrBytes: MetaplexFile[] | number): number;
    protected getMultipliedPrice(bytes: number): Promise<BigNumber>;
    protected uploadFile(file: MetaplexFile): Promise<string>;
    protected withdrawAll(): Promise<void>;
    getBundlr(): Promise<WebBundlr | NodeBundlr>;
}
