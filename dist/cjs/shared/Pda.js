"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pda = void 0;
const web3_js_1 = require("@solana/web3.js");
class Pda extends web3_js_1.PublicKey {
    constructor(value, bump) {
        super(value);
        this.bump = bump;
    }
    static find(programId, seeds) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fromPromise(web3_js_1.PublicKey.findProgramAddress(seeds, programId));
        });
    }
    static fromPromise(promise) {
        return __awaiter(this, void 0, void 0, function* () {
            const [publicKey, bump] = yield promise;
            return new Pda(publicKey, bump);
        });
    }
}
exports.Pda = Pda;
//# sourceMappingURL=Pda.js.map