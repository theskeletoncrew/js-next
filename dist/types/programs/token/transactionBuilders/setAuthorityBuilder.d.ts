import { PublicKey, Signer as Web3Signer } from '@solana/web3.js';
import { AuthorityType } from '@solana/spl-token';
import { TransactionBuilder, Signer } from "../../../shared";
export interface SetAuthorityBuilderParams {
    mint: PublicKey;
    currentAuthority: PublicKey | Signer;
    authorityType: AuthorityType;
    newAuthority: PublicKey | null;
    multiSigners?: Web3Signer[];
    tokenProgram?: PublicKey;
    instructionKey?: string;
}
export declare const setAuthorityBuilder: (params: SetAuthorityBuilderParams) => TransactionBuilder;
