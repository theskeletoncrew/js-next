"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeMintBuilder = void 0;
const spl_token_1 = require("@solana/spl-token");
const shared_1 = require("../../../shared");
const initializeMintBuilder = (params) => {
    const { decimals, mint, mintAuthority, freezeAuthority = null, tokenProgram = spl_token_1.TOKEN_PROGRAM_ID, instructionKey = 'initializeMint', } = params;
    return shared_1.TransactionBuilder.make().add({
        instruction: (0, spl_token_1.createInitializeMintInstruction)(mint.publicKey, decimals, mintAuthority, freezeAuthority, tokenProgram),
        signers: [mint],
        key: instructionKey,
    });
};
exports.initializeMintBuilder = initializeMintBuilder;
//# sourceMappingURL=initializeMintBuilder.js.map