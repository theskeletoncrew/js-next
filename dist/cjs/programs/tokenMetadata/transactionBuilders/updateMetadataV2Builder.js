"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMetadataV2Builder = void 0;
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const shared_1 = require("../../../shared");
const updateMetadataV2Builder = (params) => {
    const { data, newUpdateAuthority, primarySaleHappened, isMutable, metadata, updateAuthority, instructionKey = 'updateMetadatav2', } = params;
    return shared_1.TransactionBuilder.make().add({
        instruction: (0, mpl_token_metadata_1.createUpdateMetadataAccountV2Instruction)({
            metadata,
            updateAuthority: updateAuthority.publicKey,
        }, {
            updateMetadataAccountArgsV2: {
                data,
                updateAuthority: newUpdateAuthority,
                primarySaleHappened,
                isMutable,
            },
        }),
        signers: [updateAuthority],
        key: instructionKey,
    });
};
exports.updateMetadataV2Builder = updateMetadataV2Builder;
//# sourceMappingURL=updateMetadataV2Builder.js.map