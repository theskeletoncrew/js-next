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
exports.Web3RpcDriver = void 0;
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("../../shared");
const RpcDriver_1 = require("./RpcDriver");
const errors_1 = require("../../errors");
class Web3RpcDriver extends RpcDriver_1.RpcDriver {
    sendTransaction(transaction, signers = [], sendOptions = {}) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (transaction instanceof shared_1.TransactionBuilder) {
                signers = [...transaction.getSigners(), ...signers];
                transaction = transaction.toTransaction();
            }
            (_a = transaction.feePayer) !== null && _a !== void 0 ? _a : (transaction.feePayer = this.getDefaultFeePayer());
            (_b = transaction.recentBlockhash) !== null && _b !== void 0 ? _b : (transaction.recentBlockhash = yield this.getLatestBlockhash());
            signers = [this.metaplex.identity(), ...signers];
            const { keypairs, identities } = (0, shared_1.getSignerHistogram)(signers);
            if (keypairs.length > 0) {
                transaction.partialSign(...keypairs);
            }
            for (let i = 0; i < identities.length; i++) {
                yield identities[i].signTransaction(transaction);
            }
            const rawTransaction = transaction.serialize();
            try {
                return yield this.metaplex.connection.sendRawTransaction(rawTransaction, sendOptions);
            }
            catch (error) {
                // TODO: Parse using program knowledge when possible.
                throw new errors_1.FailedToSendTransactionError(error);
            }
        });
    }
    confirmTransaction(signature, commitment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rpcResponse = yield this.metaplex.connection.confirmTransaction(signature, commitment);
                if (rpcResponse.value.err) {
                    throw new errors_1.FailedToConfirmTransactionWithResponseError(rpcResponse);
                }
                return rpcResponse;
            }
            catch (error) {
                throw new errors_1.FailedToConfirmTransactionError(error);
            }
        });
    }
    sendAndConfirmTransaction(transaction, signers, confirmOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const signature = yield this.sendTransaction(transaction, signers, confirmOptions);
            const confirmResponse = yield this.confirmTransaction(signature, confirmOptions === null || confirmOptions === void 0 ? void 0 : confirmOptions.commitment);
            return { signature, confirmResponse };
        });
    }
    getAccountInfo(publicKey, commitment) {
        return this.metaplex.connection.getAccountInfo(publicKey, commitment);
    }
    getMultipleAccountsInfo(publicKeys, commitment) {
        return this.metaplex.connection.getMultipleAccountsInfo(publicKeys, commitment);
    }
    getLatestBlockhash() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.metaplex.connection.getLatestBlockhash('finalized')).blockhash;
        });
    }
    getDefaultFeePayer() {
        const identity = this.metaplex.identity().publicKey;
        return identity.equals(web3_js_1.PublicKey.default) ? undefined : identity;
    }
}
exports.Web3RpcDriver = Web3RpcDriver;
//# sourceMappingURL=Web3RpcDriver.js.map