/// <reference types="node" />
import { AccountInfo, PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';
declare type GeneratedAccountData<T> = {
    fromAccountInfo: (info: AccountInfo<Buffer>) => [T, ...any];
};
export declare class Account<T> implements AccountInfo<T> {
    readonly executable: boolean;
    readonly owner: PublicKey;
    readonly lamports: number;
    readonly data: T;
    readonly rentEpoch?: number | undefined;
    protected constructor(accountInfo: AccountInfo<T>);
    static parseAccountInfo<T>(accountInfo: AccountInfo<Buffer>, accountData: GeneratedAccountData<T>): Account<T>;
}
export {};
