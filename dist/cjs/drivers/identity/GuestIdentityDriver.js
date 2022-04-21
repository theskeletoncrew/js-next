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
exports.GuestIdentityDriver = exports.guestIdentity = void 0;
const web3_js_1 = require("@solana/web3.js");
const IdentityDriver_1 = require("./IdentityDriver");
const errors_1 = require("../../errors");
const guestIdentity = () => ({
    install(metaplex) {
        metaplex.setIdentity(new GuestIdentityDriver(metaplex));
    },
});
exports.guestIdentity = guestIdentity;
class GuestIdentityDriver extends IdentityDriver_1.IdentityDriver {
    constructor(metaplex) {
        super(metaplex);
        this.publicKey = web3_js_1.PublicKey.default;
    }
    signMessage(_message) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new errors_1.OperationUnauthorizedForGuestsError('signMessage');
        });
    }
    signTransaction(_transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new errors_1.OperationUnauthorizedForGuestsError('signTransaction');
        });
    }
    signAllTransactions(_transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new errors_1.OperationUnauthorizedForGuestsError('signAllTransactions');
        });
    }
}
exports.GuestIdentityDriver = GuestIdentityDriver;
//# sourceMappingURL=GuestIdentityDriver.js.map