import { PublicKey } from '@solana/web3.js';
import { Operation } from "../../../shared";
import { Nft } from '../models';
export declare const findNftsByMintListOperation: import("../../../shared").OperationConstructor<FindNftsByMintListOperation, "FindNftsByMintListOperation", PublicKey[], (Nft | null)[]>;
export declare type FindNftsByMintListOperation = Operation<'FindNftsByMintListOperation', PublicKey[], (Nft | null)[]>;
