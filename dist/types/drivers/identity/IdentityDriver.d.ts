import { PublicKey, Transaction } from '@solana/web3.js';
import { Driver } from '../Driver';
export declare abstract class IdentityDriver extends Driver {
    abstract publicKey: PublicKey;
    abstract signMessage(message: Uint8Array): Promise<Uint8Array>;
    abstract signTransaction(transaction: Transaction): Promise<Transaction>;
    abstract signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    verifyMessage(message: Uint8Array, signature: Uint8Array): Promise<boolean>;
    is(that: IdentityDriver): boolean;
}
