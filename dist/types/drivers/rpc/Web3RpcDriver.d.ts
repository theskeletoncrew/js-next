/// <reference types="node" />
import { Blockhash, Commitment, ConfirmOptions, PublicKey, SendOptions, Transaction, TransactionSignature } from '@solana/web3.js';
import { Signer, TransactionBuilder } from "../../shared";
import { RpcDriver, ConfirmTransactionResponse, SendAndConfirmTransactionResponse } from './RpcDriver';
export declare class Web3RpcDriver extends RpcDriver {
    sendTransaction(transaction: Transaction | TransactionBuilder, signers?: Signer[], sendOptions?: SendOptions): Promise<TransactionSignature>;
    confirmTransaction(signature: TransactionSignature, commitment?: Commitment): Promise<ConfirmTransactionResponse>;
    sendAndConfirmTransaction(transaction: Transaction | TransactionBuilder, signers?: Signer[], confirmOptions?: ConfirmOptions): Promise<SendAndConfirmTransactionResponse>;
    getAccountInfo(publicKey: PublicKey, commitment?: Commitment): Promise<import("@solana/web3.js").AccountInfo<Buffer> | null>;
    getMultipleAccountsInfo(publicKeys: PublicKey[], commitment?: Commitment): Promise<(import("@solana/web3.js").AccountInfo<Buffer> | null)[]>;
    protected getLatestBlockhash(): Promise<Blockhash>;
    protected getDefaultFeePayer(): PublicKey | undefined;
}
