import { Connection } from '@solana/web3.js';
import { TokenMetadataGpaBuilder } from './gpaBuilders';
export declare const TokenMetadataProgram: {
    publicKey: import("@solana/web3.js").PublicKey;
    accounts(connection: Connection): TokenMetadataGpaBuilder;
    metadataV1Accounts(connection: Connection): import("./gpaBuilders").MetadataV1GpaBuilder;
};
