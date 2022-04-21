import { Keypair, PublicKey, Signer as Web3Signer, Transaction } from '@solana/web3.js';
import { IdentityDriver } from './IdentityDriver';
import { Metaplex } from "../../Metaplex";
import { MetaplexPlugin } from "../../MetaplexPlugin";
export declare const keypairIdentity: (keypair: Keypair) => MetaplexPlugin;
export declare class KeypairIdentityDriver extends IdentityDriver implements Web3Signer {
    readonly keypair: Keypair;
    readonly publicKey: PublicKey;
    readonly secretKey: Uint8Array;
    constructor(metaplex: Metaplex, keypair: Keypair);
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
}
