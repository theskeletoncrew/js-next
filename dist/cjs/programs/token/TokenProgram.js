"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenProgram = void 0;
const spl_token_1 = require("@solana/spl-token");
const gpaBuilders_1 = require("./gpaBuilders");
exports.TokenProgram = {
    publicKey: spl_token_1.TOKEN_PROGRAM_ID,
    accounts(connection) {
        return new gpaBuilders_1.TokenProgramGpaBuilder(connection, this.publicKey);
    },
    mintAccounts(connection) {
        return this.accounts(connection).mintAccounts();
    },
    tokenAccounts(connection) {
        return this.accounts(connection).tokenAccounts();
    },
};
//# sourceMappingURL=TokenProgram.js.map