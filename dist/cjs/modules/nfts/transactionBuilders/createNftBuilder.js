"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNftBuilder = void 0;
const token_1 = require("../../../programs/token");
const tokenMetadata_1 = require("../../../programs/tokenMetadata");
const shared_1 = require("../../../shared");
const createNftBuilder = (params) => {
    const { lamports, data, isMutable, maxSupply, mint, payer, mintAuthority, updateAuthority = mintAuthority, owner, associatedToken, freezeAuthority, metadata, masterEdition, tokenProgram, associatedTokenProgram, createAccountInstructionKey, initializeMintInstructionKey, createAssociatedTokenInstructionKey, mintToInstructionKey, createMetadataInstructionKey, createMasterEditionInstructionKey, } = params;
    return (shared_1.TransactionBuilder.make()
        // Create the mint account and send one token to the holder.
        .add((0, token_1.createMintAndMintToAssociatedTokenBuilder)({
        lamports,
        decimals: 0,
        amount: 1,
        createAssociatedToken: true,
        mint,
        payer,
        mintAuthority,
        owner,
        associatedToken,
        freezeAuthority,
        tokenProgram,
        associatedTokenProgram,
        createAccountInstructionKey,
        initializeMintInstructionKey,
        createAssociatedTokenInstructionKey,
        mintToInstructionKey,
    }))
        // Create metadata account.
        .add((0, tokenMetadata_1.createMetadataV2Builder)({
        data,
        isMutable,
        mintAuthority,
        payer,
        mint: mint.publicKey,
        metadata,
        updateAuthority: updateAuthority.publicKey,
        instructionKey: createMetadataInstructionKey,
    }))
        // Create master edition account (prevents further minting).
        .add((0, tokenMetadata_1.createMasterEditionV3Builder)({
        maxSupply,
        payer,
        mintAuthority,
        updateAuthority,
        mint: mint.publicKey,
        metadata,
        masterEdition,
        instructionKey: createMasterEditionInstructionKey,
    })));
};
exports.createNftBuilder = createNftBuilder;
//# sourceMappingURL=createNftBuilder.js.map