import { PublicKey } from '@solana/web3.js';
import { Operation } from "../../../shared";
import { Nft } from '../models';
export declare const findNftsByCreatorOperation: import("../../../shared").OperationConstructor<FindNftsByCreatorOperation, "FindNftsByCreatorOperation", FindNftsByCreatorInput, Nft[]>;
export declare type FindNftsByCreatorOperation = Operation<'FindNftsByCreatorOperation', FindNftsByCreatorInput, Nft[]>;
export interface FindNftsByCreatorInput {
    creator: PublicKey;
    position?: number;
}
