"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMintBuilder = void 0;
const spl_token_1 = require("@solana/spl-token");
const system_1 = require("../../system");
const token_1 = require("./..");
const shared_1 = require("../../../shared");
const createMintBuilder = (params) => {
    const { lamports, decimals, mint, payer, mintAuthority, freezeAuthority, tokenProgram = spl_token_1.TOKEN_PROGRAM_ID, createAccountInstructionKey = 'createAccount', initializeMintInstructionKey = 'initializeMint', } = params;
    return (shared_1.TransactionBuilder.make()
        // Allocate space on the blockchain for the mint account.
        .add((0, system_1.createAccountBuilder)({
        payer: payer,
        newAccount: mint,
        space: spl_token_1.MINT_SIZE,
        lamports,
        program: tokenProgram,
        instructionKey: createAccountInstructionKey,
    }))
        // Initialize the mint account.
        .add((0, token_1.initializeMintBuilder)({
        decimals,
        mint,
        mintAuthority,
        freezeAuthority,
        tokenProgram,
        instructionKey: initializeMintInstructionKey,
    })));
};
exports.createMintBuilder = createMintBuilder;
//# sourceMappingURL=createMintBuilder.js.map