import { IdentityDriver } from "../drivers";
import { Signer as Web3Signer } from '@solana/web3.js';
export declare type Signer = Web3Signer | IdentityDriver;
export interface SignerHistogram {
    all: Signer[];
    keypairs: Web3Signer[];
    identities: IdentityDriver[];
}
export declare const getSignerHistogram: (signers: Signer[]) => SignerHistogram;
