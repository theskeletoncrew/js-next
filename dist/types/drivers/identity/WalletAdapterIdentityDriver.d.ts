import { Connection, PublicKey, Transaction, TransactionSignature } from '@solana/web3.js';
import { MessageSignerWalletAdapterProps, SignerWalletAdapterProps, WalletAdapter as BaseWalletAdapter } from '@solana/wallet-adapter-base';
import { IdentityDriver } from './IdentityDriver';
import { Metaplex } from "../../Metaplex";
import { MetaplexPlugin } from "../../MetaplexPlugin";
import { SendTransactionOptions } from '@solana/wallet-adapter-base';
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
    sendTransaction(transaction: Transaction, connection: Connection, options?: SendTransactionOptions): Promise<TransactionSignature>;
}
export {};
