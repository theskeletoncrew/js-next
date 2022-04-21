import { Transaction, TransactionCtorFields, TransactionInstruction } from '@solana/web3.js';
import { Signer } from './Signer';
export interface TransactionBuilderRecord {
    key?: string;
    instruction: TransactionInstruction;
    signers: Signer[];
}
export declare class TransactionBuilder {
    /** The list of all instructions and their respective signers. */
    private records;
    /** Options used when building the transaction. */
    private transactionOptions;
    constructor(transactionOptions?: TransactionCtorFields);
    static make(transactionOptions?: TransactionCtorFields): TransactionBuilder;
    prepend(...txs: (TransactionBuilderRecord | TransactionBuilder)[]): TransactionBuilder;
    append(...txs: (TransactionBuilderRecord | TransactionBuilder)[]): TransactionBuilder;
    add(...txs: (TransactionBuilderRecord | TransactionBuilder)[]): TransactionBuilder;
    splitUsingKey(key: string, include?: boolean): [TransactionBuilder, TransactionBuilder];
    splitBeforeKey(key: string): [TransactionBuilder, TransactionBuilder];
    splitAfterKey(key: string): [TransactionBuilder, TransactionBuilder];
    getRecords(): TransactionBuilderRecord[];
    getInstructions(): TransactionInstruction[];
    getSigners(): Signer[];
    setTransactionOptions(transactionOptions: TransactionCtorFields): TransactionBuilder;
    getTransactionOptions(): TransactionCtorFields;
    when(condition: boolean, callback: (tx: TransactionBuilder) => TransactionBuilder): TransactionBuilder;
    unless(condition: boolean, callback: (tx: TransactionBuilder) => TransactionBuilder): TransactionBuilder;
    toTransaction(): Transaction;
}
