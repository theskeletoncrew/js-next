/// <reference types="node" />
import { AccountInfo, PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { Account, Pda } from "../../../shared";
export declare class MetadataAccount extends Account<Metadata> {
    static pda(mint: PublicKey): Promise<Pda>;
    static fromAccountInfo(accountInfo: AccountInfo<Buffer>): MetadataAccount;
}
