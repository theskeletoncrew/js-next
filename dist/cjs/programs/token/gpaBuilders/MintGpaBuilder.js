"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MintGpaBuilder = void 0;
const TokenProgramGpaBuilder_1 = require("./TokenProgramGpaBuilder");
class MintGpaBuilder extends TokenProgramGpaBuilder_1.TokenProgramGpaBuilder {
    whereDoesntHaveMintAuthority() {
        return this.where(0, 0);
    }
    whereHasMintAuthority() {
        return this.where(0, 1);
    }
    whereMintAuthority(mintAuthority) {
        return this.whereHasMintAuthority().where(4, mintAuthority);
    }
    whereSupply(supply) {
        return this.where(36, supply);
    }
}
exports.MintGpaBuilder = MintGpaBuilder;
//# sourceMappingURL=MintGpaBuilder.js.map