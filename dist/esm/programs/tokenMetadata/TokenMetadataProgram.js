import { PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { TokenMetadataGpaBuilder } from './gpaBuilders';
export const TokenMetadataProgram = {
    publicKey: PROGRAM_ID,
    accounts(connection) {
        return new TokenMetadataGpaBuilder(connection, this.publicKey);
    },
    metadataV1Accounts(connection) {
        return this.accounts(connection).metadataV1Accounts();
    },
};
//# sourceMappingURL=TokenMetadataProgram.js.map