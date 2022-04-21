import { PublicKey } from '@solana/web3.js';
import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
import { TransactionBuilder, Signer } from "../../../shared";
export interface CreateMetadataV2BuilderParams {
    data: DataV2;
    isMutable?: boolean;
    mintAuthority: Signer;
    payer: Signer;
    mint: PublicKey;
    metadata: PublicKey;
    updateAuthority: PublicKey;
    instructionKey?: string;
}
export declare const createMetadataV2Builder: (params: CreateMetadataV2BuilderParams) => TransactionBuilder;
