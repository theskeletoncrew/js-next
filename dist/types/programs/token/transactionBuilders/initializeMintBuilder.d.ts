import { PublicKey } from '@solana/web3.js';
import { TransactionBuilder, Signer } from "../../../shared";
export interface InitializeMintBuilderParams {
    decimals: number;
    mint: Signer;
    mintAuthority: PublicKey;
    freezeAuthority?: PublicKey;
    tokenProgram?: PublicKey;
    instructionKey?: string;
}
export declare const initializeMintBuilder: (params: InitializeMintBuilderParams) => TransactionBuilder;
