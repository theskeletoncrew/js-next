"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenProgramGpaBuilder = void 0;
const shared_1 = require("../../../shared");
const spl_token_1 = require("@solana/spl-token");
const _1 = require(".");
class TokenProgramGpaBuilder extends shared_1.GpaBuilder {
    mintAccounts() {
        return _1.MintGpaBuilder.from(this).whereSize(spl_token_1.MINT_SIZE);
    }
    tokenAccounts() {
        return _1.TokenGpaBuilder.from(this).whereSize(spl_token_1.ACCOUNT_SIZE);
    }
}
exports.TokenProgramGpaBuilder = TokenProgramGpaBuilder;
//# sourceMappingURL=TokenProgramGpaBuilder.js.map