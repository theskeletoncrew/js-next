/// <reference types="node" />
import BN from 'bn.js';
import BigNumber from 'bignumber.js';
export declare type SolAmountInput = number | string | Uint8Array | Buffer | BN | BigNumber | SolAmount;
export declare class SolAmount {
    protected readonly lamports: BigNumber;
    protected constructor(lamports: BigNumber);
    static fromLamports(lamports: SolAmountInput): SolAmount;
    static fromSol(sol: SolAmountInput): SolAmount;
    static zero(): SolAmount;
    plus(other: SolAmountInput): SolAmount;
    minus(other: SolAmountInput): SolAmount;
    multipliedBy(other: SolAmountInput): SolAmount;
    dividedBy(other: SolAmountInput): SolAmount;
    modulo(other: SolAmountInput): SolAmount;
    isEqualTo(other: SolAmountInput): boolean;
    isLessThan(other: SolAmountInput): boolean;
    isLessThanOrEqualTo(other: SolAmountInput): boolean;
    isGreaterThan(other: SolAmountInput): boolean;
    isGreaterThanOrEqualTo(other: SolAmountInput): boolean;
    isNegative(): boolean;
    isPositive(): boolean;
    isZero(): boolean;
    getLamports(): BigNumber;
    getSol(): BigNumber;
    toLamports(): string;
    toSol(decimals?: number, roundingMode?: BigNumber.RoundingMode): string;
    toString(): string;
    protected execute(other: SolAmountInput, operation: (a: SolAmount, b: SolAmount) => BigNumber): SolAmount;
}
