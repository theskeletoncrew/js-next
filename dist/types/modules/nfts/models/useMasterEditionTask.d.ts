import { Metaplex } from "../../../Metaplex";
import { MasterEditionAccount } from "../../../programs";
import { Task } from "../../../shared";
import { Nft } from './Nft';
export declare type MasterEditionTask = Task<MasterEditionAccount | null>;
export declare const useMasterEditionTask: (metaplex: Metaplex, nft: Nft) => MasterEditionTask;
