/// <reference types="node" />
import { Signer, TransactionBuilder } from "../../shared";
import { AccountInfo, Commitment, ConfirmOptions, PublicKey, RpcResponseAndContext, SendOptions, SignatureResult, Transaction, TransactionSignature } from '@solana/web3.js';
import { Driver } from '../Driver';
import { Buffer } from 'buffer';
export declare type ConfirmTransactionResponse = RpcResponseAndContext<SignatureResult>;
export declare type SendAndConfirmTransactionResponse = {
    signature: TransactionSignature;
    confirmResponse: ConfirmTransactionResponse;
};
export declare abstract class RpcDriver extends Driver {
    abstract sendTransaction(transaction: Transaction | TransactionBuilder, signers?: Signer[], sendOptions?: SendOptions): Promise<TransactionSignature>;
    abstract confirmTransaction(signature: TransactionSignature, commitment?: Commitment): Promise<ConfirmTransactionResponse>;
    abstract sendAndConfirmTransaction(transaction: Transaction | TransactionBuilder, signers?: Signer[], confirmOptions?: ConfirmOptions): Promise<SendAndConfirmTransactionResponse>;
    abstract getAccountInfo(publicKey: PublicKey, commitment?: Commitment): Promise<AccountInfo<Buffer> | null>;
    abstract getMultipleAccountsInfo(publicKeys: PublicKey[], commitment?: Commitment): Promise<Array<AccountInfo<Buffer> | null>>;
}
