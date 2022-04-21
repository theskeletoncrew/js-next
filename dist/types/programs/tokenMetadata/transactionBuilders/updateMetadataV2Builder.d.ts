import { PublicKey } from '@solana/web3.js';
import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
import { TransactionBuilder, Signer } from "../../../shared";
export interface UpdateMetadataV2BuilderParams {
    data: DataV2;
    newUpdateAuthority: PublicKey;
    primarySaleHappened: boolean;
    isMutable: boolean;
    metadata: PublicKey;
    updateAuthority: Signer;
    instructionKey?: string;
}
export declare const updateMetadataV2Builder: (params: UpdateMetadataV2BuilderParams) => TransactionBuilder;
