"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMintAndMintToAssociatedTokenBuilder = void 0;
const token_1 = require("./..");
const shared_1 = require("../../../shared");
const createMintAndMintToAssociatedTokenBuilder = (params) => {
    const { lamports, decimals, amount, createAssociatedToken = true, mint, payer, mintAuthority, owner, associatedToken, freezeAuthority, tokenProgram, associatedTokenProgram, createAccountInstructionKey, initializeMintInstructionKey, createAssociatedTokenInstructionKey, mintToInstructionKey, } = params;
    return (shared_1.TransactionBuilder.make()
        // Create and initialize the mint account.
        .add((0, token_1.createMintBuilder)({
        lamports,
        decimals,
        mint,
        payer,
        mintAuthority: mintAuthority.publicKey,
        freezeAuthority,
        tokenProgram,
        createAccountInstructionKey,
        initializeMintInstructionKey,
    }))
        // Create the associated account if it does not exists.
        .when(createAssociatedToken, (tx) => tx.add((0, token_1.createAssociatedTokenAccountBuilder)({
        payer,
        associatedToken,
        owner,
        mint: mint.publicKey,
        tokenProgram,
        associatedTokenProgram,
        instructionKey: createAssociatedTokenInstructionKey,
    })))
        // Mint to the associated token.
        .add((0, token_1.mintToBuilder)({
        mint: mint.publicKey,
        destination: associatedToken,
        mintAuthority,
        amount,
        tokenProgram,
        instructionKey: mintToInstructionKey,
    })));
};
exports.createMintAndMintToAssociatedTokenBuilder = createMintAndMintToAssociatedTokenBuilder;
//# sourceMappingURL=createMintAndMintToAssociatedTokenBuilder.js.map