import { PublicKey } from '@solana/web3.js';
import { TransactionBuilder, Signer } from "../../../shared";
export interface CreateAssociatedTokenAccountBuilderParams {
    payer: Signer;
    associatedToken: PublicKey;
    owner: PublicKey;
    mint: PublicKey;
    tokenProgram?: PublicKey;
    associatedTokenProgram?: PublicKey;
    instructionKey?: string;
}
export declare const createAssociatedTokenAccountBuilder: (params: CreateAssociatedTokenAccountBuilderParams) => TransactionBuilder;
