"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableMintingBuilder = void 0;
const token_1 = require("./..");
const spl_token_1 = require("@solana/spl-token");
const shared_1 = require("../../../shared");
const disableMintingBuilder = (params) => {
    const { mint, mintAuthority, multiSigners, tokenProgram, instructionKey = 'disableMinting', } = params;
    return shared_1.TransactionBuilder.make().add((0, token_1.setAuthorityBuilder)({
        mint,
        currentAuthority: mintAuthority,
        authorityType: spl_token_1.AuthorityType.MintTokens,
        newAuthority: null,
        multiSigners,
        tokenProgram,
        instructionKey,
    }));
};
exports.disableMintingBuilder = disableMintingBuilder;
//# sourceMappingURL=disableMintingBuilder.js.map