import { PublicKey } from '@solana/web3.js';
import { Operation } from "../../../shared";
import { Nft } from '../models';
export declare const findNftsByOwnerOperation: import("../../../shared").OperationConstructor<FindNftsByOwnerOperation, "FindNftsByOwnerOperation", PublicKey, Nft[]>;
export declare type FindNftsByOwnerOperation = Operation<'FindNftsByOwnerOperation', PublicKey, Nft[]>;
