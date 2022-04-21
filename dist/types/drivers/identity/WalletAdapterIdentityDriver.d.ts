import { PublicKey, Transaction } from '@solana/web3.js';
import { MessageSignerWalletAdapterProps, SignerWalletAdapterProps, WalletAdapter as BaseWalletAdapter } from '@solana/wallet-adapter-base';
import { IdentityDriver } from './IdentityDriver';
import { Metaplex } from "../../Metaplex";
import { MetaplexPlugin } from "../../MetaplexPlugin";
declare type WalletAdapter = BaseWalletAdapter & Partial<MessageSignerWalletAdapterProps> & Partial<SignerWalletAdapterProps>;
export declare const walletAdapterIdentity: (walletAdapter: WalletAdapter) => MetaplexPlugin;
export declare const walletOrGuestIdentity: (walletAdapter?: WalletAdapter | null | undefined) => MetaplexPlugin;
export declare class WalletAdapterIdentityDriver extends IdentityDriver {
    readonly walletAdapter: WalletAdapter;
    constructor(metaplex: Metaplex, walletAdapter: WalletAdapter);
    get publicKey(): PublicKey;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
}
export {};
