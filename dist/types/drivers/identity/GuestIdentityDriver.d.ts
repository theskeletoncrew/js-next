import { PublicKey, Transaction } from '@solana/web3.js';
import { IdentityDriver } from './IdentityDriver';
import { Metaplex } from "../../Metaplex";
import { MetaplexPlugin } from "../../MetaplexPlugin";
export declare const guestIdentity: () => MetaplexPlugin;
export declare class GuestIdentityDriver extends IdentityDriver {
    readonly publicKey: PublicKey;
    constructor(metaplex: Metaplex);
    signMessage(_message: Uint8Array): Promise<Uint8Array>;
    signTransaction(_transaction: Transaction): Promise<Transaction>;
    signAllTransactions(_transactions: Transaction[]): Promise<Transaction[]>;
}
