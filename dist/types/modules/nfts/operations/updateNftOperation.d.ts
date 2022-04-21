import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { Collection, Creator, Uses } from '@metaplex-foundation/mpl-token-metadata';
import { Signer, Operation } from "../../../shared";
import { Nft } from '../models';
export declare const updateNftOperation: import("../../../shared").OperationConstructor<UpdateNftOperation, "UpdateNftOperation", UpdateNftInput, UpdateNftOutput>;
export declare type UpdateNftOperation = Operation<'UpdateNftOperation', UpdateNftInput, UpdateNftOutput>;
export interface UpdateNftInput {
    nft: Nft;
    name?: string;
    symbol?: string;
    uri?: string;
    sellerFeeBasisPoints?: number;
    creators?: Creator[];
    collection?: Collection;
    uses?: Uses;
    newUpdateAuthority?: PublicKey;
    primarySaleHappened?: boolean;
    isMutable?: boolean;
    updateAuthority?: Signer;
    confirmOptions?: ConfirmOptions;
}
export interface UpdateNftOutput {
    transactionId: string;
}
