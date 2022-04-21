import { AccountInfo, PublicKey } from '@solana/web3.js';
export declare type AccountInfoWithPublicKey<T> = AccountInfo<T> & {
    pubkey: PublicKey;
};
export declare type MaybeAccountInfoWithPublicKey<T> = (AccountInfoWithPublicKey<T> & {
    exists: true;
}) | {
    pubkey: PublicKey;
    exists: false;
};
