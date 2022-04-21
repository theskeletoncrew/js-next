import { TokenProgramGpaBuilder } from './TokenProgramGpaBuilder';
export class MintGpaBuilder extends TokenProgramGpaBuilder {
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
//# sourceMappingURL=MintGpaBuilder.js.map