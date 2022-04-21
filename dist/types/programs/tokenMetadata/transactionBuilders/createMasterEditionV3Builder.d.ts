import { PublicKey } from '@solana/web3.js';
import { bignum } from '@metaplex-foundation/beet';
import { TransactionBuilder, Signer } from "../../../shared";
export interface CreateMasterEditionV3BuilderParams {
    maxSupply?: bignum;
    payer: Signer;
    mintAuthority: Signer;
    updateAuthority: Signer;
    mint: PublicKey;
    metadata: PublicKey;
    masterEdition: PublicKey;
    instructionKey?: string;
}
export declare const createMasterEditionV3Builder: (params: CreateMasterEditionV3BuilderParams) => TransactionBuilder;
