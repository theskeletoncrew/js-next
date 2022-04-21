import { Operation } from "../../../shared";
import { PublicKey } from '@solana/web3.js';
import { Nft } from '../models';
export declare const findNftByMintOperation: import("../../../shared").OperationConstructor<FindNftByMintOperation, "FindNftByMintOperation", PublicKey, Nft>;
export declare type FindNftByMintOperation = Operation<'FindNftByMintOperation', PublicKey, Nft>;
