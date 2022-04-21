import { PublicKey } from '@solana/web3.js';
import { TransactionBuilder, Signer } from "../../../shared";
export interface CreateMintAndMintToAssociatedTokenBuilderParams {
    lamports: number;
    decimals: number;
    amount: number | bigint;
    createAssociatedToken?: boolean;
    mint: Signer;
    payer: Signer;
    mintAuthority: Signer;
    owner: PublicKey;
    associatedToken: PublicKey;
    freezeAuthority?: PublicKey;
    tokenProgram?: PublicKey;
    associatedTokenProgram?: PublicKey;
    createAccountInstructionKey?: string;
    initializeMintInstructionKey?: string;
    createAssociatedTokenInstructionKey?: string;
    mintToInstructionKey?: string;
}
export declare const createMintAndMintToAssociatedTokenBuilder: (params: CreateMintAndMintToAssociatedTokenBuilderParams) => TransactionBuilder;
