import { PublicKey } from '@solana/web3.js';
import { TransactionBuilder, Signer } from "../../../shared";
export interface CreateAccountBuilderParams {
    space: number;
    lamports: number;
    payer: Signer;
    newAccount: Signer;
    program?: PublicKey;
    instructionKey?: string;
}
export declare const createAccountBuilder: (params: CreateAccountBuilderParams) => TransactionBuilder;
