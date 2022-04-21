"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolAmount = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const parseBigNumber = (input) => {
    if (input instanceof Uint8Array || input instanceof bn_js_1.default) {
        const bn = new bn_js_1.default(input);
        return new bignumber_js_1.default(bn.toString());
    }
    return new bignumber_js_1.default(input);
};
class SolAmount {
    constructor(lamports) {
        this.lamports = lamports.decimalPlaces(0);
    }
    static fromLamports(lamports) {
        if (lamports instanceof SolAmount) {
            return new this(lamports.getLamports());
        }
        return new this(parseBigNumber(lamports));
    }
    static fromSol(sol) {
        if (sol instanceof SolAmount) {
            return new this(sol.getLamports());
        }
        const lamports = parseBigNumber(sol).multipliedBy(web3_js_1.LAMPORTS_PER_SOL);
        return new this(lamports);
    }
    static zero() {
        return this.fromLamports(0);
    }
    plus(other) {
        return this.execute(other, (a, b) => a.getLamports().plus(b.getLamports()));
    }
    minus(other) {
        return this.execute(other, (a, b) => a.getLamports().minus(b.getLamports()));
    }
    multipliedBy(other) {
        return this.execute(other, (a, b) => a.getLamports().multipliedBy(b.getSol()));
    }
    dividedBy(other) {
        return this.execute(other, (a, b) => a.getLamports().dividedBy(b.getSol()));
    }
    modulo(other) {
        return this.execute(other, (a, b) => a.getLamports().modulo(b.getLamports()));
    }
    isEqualTo(other) {
        return this.lamports.isEqualTo(SolAmount.fromSol(other).getLamports());
    }
    isLessThan(other) {
        return this.lamports.isLessThan(SolAmount.fromSol(other).getLamports());
    }
    isLessThanOrEqualTo(other) {
        return this.lamports.isLessThanOrEqualTo(SolAmount.fromSol(other).getLamports());
    }
    isGreaterThan(other) {
        return this.lamports.isGreaterThan(SolAmount.fromSol(other).getLamports());
    }
    isGreaterThanOrEqualTo(other) {
        return this.lamports.isGreaterThanOrEqualTo(SolAmount.fromSol(other).getLamports());
    }
    isNegative() {
        return this.lamports.isNegative();
    }
    isPositive() {
        return this.lamports.isPositive();
    }
    isZero() {
        return this.lamports.isZero();
    }
    getLamports() {
        return this.lamports;
    }
    getSol() {
        return this.lamports.dividedBy(web3_js_1.LAMPORTS_PER_SOL);
    }
    toLamports() {
        return this.lamports.toString();
    }
    toSol(decimals, roundingMode) {
        if (!decimals) {
            return this.getSol().toFormat();
        }
        return this.getSol().toFormat(decimals, roundingMode);
    }
    toString() {
        return this.toLamports();
    }
    execute(other, operation) {
        return SolAmount.fromLamports(operation(this, SolAmount.fromSol(other)));
    }
}
exports.SolAmount = SolAmount;
//# sourceMappingURL=SolAmount.js.map