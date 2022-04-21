import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { bignum } from '@metaplex-foundation/beet';
import { Creator, Collection, Uses } from '@metaplex-foundation/mpl-token-metadata';
import { Signer, Operation } from "../../../shared";
export declare const createNftOperation: import("../../../shared").OperationConstructor<CreateNftOperation, "CreateNftOperation", CreateNftInput, CreateNftOutput>;
export declare type CreateNftOperation = Operation<'CreateNftOperation', CreateNftInput, CreateNftOutput>;
export interface CreateNftInput {
    uri: string;
    name?: string;
    symbol?: string;
    sellerFeeBasisPoints?: number;
    creators?: Creator[];
    collection?: Collection;
    uses?: Uses;
    isMutable?: boolean;
    maxSupply?: bignum;
    allowHolderOffCurve?: boolean;
    mint?: Signer;
    payer?: Signer;
    mintAuthority?: Signer;
    updateAuthority?: Signer;
    owner?: PublicKey;
    freezeAuthority?: PublicKey;
    tokenProgram?: PublicKey;
    associatedTokenProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
}
export interface CreateNftOutput {
    mint: Signer;
    metadata: PublicKey;
    masterEdition: PublicKey;
    associatedToken: PublicKey;
    transactionId: string;
}
