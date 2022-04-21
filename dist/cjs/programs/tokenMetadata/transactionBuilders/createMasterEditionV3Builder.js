"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMasterEditionV3Builder = void 0;
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const shared_1 = require("../../../shared");
const createMasterEditionV3Builder = (params) => {
    const { maxSupply = null, payer, mintAuthority, updateAuthority, mint, metadata, masterEdition, instructionKey = 'createMasterEditionV3', } = params;
    return shared_1.TransactionBuilder.make().add({
        instruction: (0, mpl_token_metadata_1.createCreateMasterEditionV3Instruction)({
            edition: masterEdition,
            mint,
            updateAuthority: updateAuthority.publicKey,
            mintAuthority: mintAuthority.publicKey,
            payer: payer.publicKey,
            metadata,
        }, { createMasterEditionArgs: { maxSupply } }),
        signers: [payer, mintAuthority, updateAuthority],
        key: instructionKey,
    });
};
exports.createMasterEditionV3Builder = createMasterEditionV3Builder;
//# sourceMappingURL=createMasterEditionV3Builder.js.map