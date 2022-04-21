"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMetadataProgram = void 0;
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const gpaBuilders_1 = require("./gpaBuilders");
exports.TokenMetadataProgram = {
    publicKey: mpl_token_metadata_1.PROGRAM_ID,
    accounts(connection) {
        return new gpaBuilders_1.TokenMetadataGpaBuilder(connection, this.publicKey);
    },
    metadataV1Accounts(connection) {
        return this.accounts(connection).metadataV1Accounts();
    },
};
//# sourceMappingURL=TokenMetadataProgram.js.map