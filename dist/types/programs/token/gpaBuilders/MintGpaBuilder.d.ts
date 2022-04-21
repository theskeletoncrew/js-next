import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { TokenProgramGpaBuilder } from './TokenProgramGpaBuilder';
export declare class MintGpaBuilder extends TokenProgramGpaBuilder {
    whereDoesntHaveMintAuthority(): this;
    whereHasMintAuthority(): this;
    whereMintAuthority(mintAuthority: PublicKey): this;
    whereSupply(supply: number | BN): this;
}
