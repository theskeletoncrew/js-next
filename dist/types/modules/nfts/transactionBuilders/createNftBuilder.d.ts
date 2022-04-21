import { PublicKey } from '@solana/web3.js';
import { bignum } from '@metaplex-foundation/beet';
import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
import { TransactionBuilder, Signer } from "../../../shared";
export interface CreateNftBuilderParams {
    lamports: number;
    data: DataV2;
    isMutable?: boolean;
    maxSupply?: bignum;
    mint: Signer;
    payer: Signer;
    mintAuthority: Signer;
    updateAuthority?: Signer;
    owner: PublicKey;
    associatedToken: PublicKey;
    freezeAuthority?: PublicKey;
    metadata: PublicKey;
    masterEdition: PublicKey;
    tokenProgram?: PublicKey;
    associatedTokenProgram?: PublicKey;
    createAccountInstructionKey?: string;
    initializeMintInstructionKey?: string;
    createAssociatedTokenInstructionKey?: string;
    mintToInstructionKey?: string;
    createMetadataInstructionKey?: string;
    createMasterEditionInstructionKey?: string;
    disableMintingInstructionKey?: string;
}
export declare const createNftBuilder: (params: CreateNftBuilderParams) => TransactionBuilder;
