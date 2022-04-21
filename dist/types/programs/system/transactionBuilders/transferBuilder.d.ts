import { PublicKey } from '@solana/web3.js';
import { TransactionBuilder, Signer } from "../../../shared";
export interface transferBuilderParams {
    from: Signer;
    to: PublicKey;
    lamports: number;
    basePubkey?: PublicKey;
    seed?: string;
    program?: PublicKey;
    instructionKey?: string;
}
export declare const transferBuilder: (params: transferBuilderParams) => TransactionBuilder;
