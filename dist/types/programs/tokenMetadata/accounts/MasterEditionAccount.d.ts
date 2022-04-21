/// <reference types="node" />
import { AccountInfo, PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { MasterEditionV1, MasterEditionV2 } from '@metaplex-foundation/mpl-token-metadata';
import { Account, Pda } from "../../../shared";
export declare class MasterEditionAccount extends Account<MasterEditionV1 | MasterEditionV2> {
    static pda(mint: PublicKey): Promise<Pda>;
    static fromAccountInfo(accountInfo: AccountInfo<Buffer>): MasterEditionAccount;
}
