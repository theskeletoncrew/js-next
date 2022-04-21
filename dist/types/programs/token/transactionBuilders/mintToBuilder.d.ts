import { PublicKey, Signer as Web3Signer } from '@solana/web3.js';
import { TransactionBuilder, Signer } from "../../../shared";
export interface MintToBuilderParams {
    mint: PublicKey;
    destination: PublicKey;
    mintAuthority: PublicKey | Signer;
    amount: number | bigint;
    multiSigners?: Web3Signer[];
    tokenProgram?: PublicKey;
    instructionKey?: string;
}
export declare const mintToBuilder: (params: MintToBuilderParams) => TransactionBuilder;
