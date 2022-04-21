import { PublicKey } from '@solana/web3.js';
import { Operation } from "../../../shared";
import { Nft } from '../models';
export declare const findNftsByCandyMachineOperation: import("../../../shared").OperationConstructor<FindNftsByCandyMachineOperation, "FindNftsByCandyMachineOperation", FindNftsByCandyMachineInput, Nft[]>;
export declare type FindNftsByCandyMachineOperation = Operation<'FindNftsByCandyMachineOperation', FindNftsByCandyMachineInput, Nft[]>;
export interface FindNftsByCandyMachineInput {
    candyMachine: PublicKey;
    version?: 1 | 2;
}
