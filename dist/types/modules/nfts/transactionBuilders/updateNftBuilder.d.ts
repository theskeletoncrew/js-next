import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
import { PublicKey } from '@solana/web3.js';
import { TransactionBuilder, Signer } from "../../../shared";
export interface UpdateNftBuilderParams {
    data: DataV2;
    newUpdateAuthority: PublicKey;
    primarySaleHappened: boolean;
    isMutable: boolean;
    updateAuthority: Signer;
    metadata: PublicKey;
    instructionKey?: string;
}
export declare const updateNftBuilder: (params: UpdateNftBuilderParams) => TransactionBuilder;
