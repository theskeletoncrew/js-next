import { PublicKey, Signer as Web3Signer } from '@solana/web3.js';
import { TransactionBuilder, Signer } from "../../../shared";
export interface DisableMintingBuilderParams {
    mint: PublicKey;
    mintAuthority: PublicKey | Signer;
    multiSigners?: Web3Signer[];
    tokenProgram?: PublicKey;
    instructionKey?: string;
}
export declare const disableMintingBuilder: (params: DisableMintingBuilderParams) => TransactionBuilder;
