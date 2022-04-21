import { Connection } from '@solana/web3.js';
import { TokenProgramGpaBuilder } from './gpaBuilders';
export declare const TokenProgram: {
    publicKey: import("@solana/web3.js").PublicKey;
    accounts(connection: Connection): TokenProgramGpaBuilder;
    mintAccounts(connection: Connection): import("./gpaBuilders").MintGpaBuilder;
    tokenAccounts(connection: Connection): import("./gpaBuilders").TokenGpaBuilder;
};
