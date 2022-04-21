import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { TokenProgramGpaBuilder } from './TokenProgramGpaBuilder';
export declare class TokenGpaBuilder extends TokenProgramGpaBuilder {
    selectMint(): this;
    whereMint(mint: PublicKey): this;
    selectOwner(): this;
    whereOwner(owner: PublicKey): this;
    selectAmount(): this;
    whereAmount(amount: number | BN): this;
    whereDoesntHaveDelegate(): this;
    whereHasDelegate(): this;
    whereDelegate(delegate: PublicKey): this;
}
