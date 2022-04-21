"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGpaBuilder = void 0;
const TokenProgramGpaBuilder_1 = require("./TokenProgramGpaBuilder");
class TokenGpaBuilder extends TokenProgramGpaBuilder_1.TokenProgramGpaBuilder {
    selectMint() {
        return this.slice(0, 32);
    }
    whereMint(mint) {
        return this.where(0, mint);
    }
    selectOwner() {
        return this.slice(32, 32);
    }
    whereOwner(owner) {
        return this.where(32, owner);
    }
    selectAmount() {
        return this.slice(64, 8);
    }
    whereAmount(amount) {
        return this.where(64, amount);
    }
    whereDoesntHaveDelegate() {
        return this.where(72, 0);
    }
    whereHasDelegate() {
        return this.where(72, 1);
    }
    whereDelegate(delegate) {
        return this.whereHasDelegate().where(76, delegate);
    }
}
exports.TokenGpaBuilder = TokenGpaBuilder;
//# sourceMappingURL=TokenGpaBuilder.js.map