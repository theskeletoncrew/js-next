"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMetadataV2Builder = void 0;
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const shared_1 = require("../../../shared");
const createMetadataV2Builder = (params) => {
    const { data, isMutable = false, mintAuthority, payer, mint, metadata, updateAuthority, instructionKey = 'createMetadataV2', } = params;
    return shared_1.TransactionBuilder.make().add({
        instruction: (0, mpl_token_metadata_1.createCreateMetadataAccountV2Instruction)({
            metadata,
            mint,
            mintAuthority: mintAuthority.publicKey,
            payer: payer.publicKey,
            updateAuthority,
        }, { createMetadataAccountArgsV2: { data, isMutable } }),
        signers: [payer, mintAuthority],
        key: instructionKey,
    });
};
exports.createMetadataV2Builder = createMetadataV2Builder;
//# sourceMappingURL=createMetadataV2Builder.js.map