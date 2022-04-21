"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferBuilder = void 0;
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("../../../shared");
const transferBuilder = (params) => {
    const { from, to, lamports, basePubkey, seed, program = web3_js_1.SystemProgram.programId, instructionKey = 'transfer', } = params;
    return shared_1.TransactionBuilder.make().add({
        instruction: web3_js_1.SystemProgram.transfer(Object.assign(Object.assign({ fromPubkey: from.publicKey, toPubkey: to, lamports }, (seed ? { seed, basePubkey } : {})), { programId: program })),
        signers: [from],
        key: instructionKey,
    });
};
exports.transferBuilder = transferBuilder;
//# sourceMappingURL=transferBuilder.js.map