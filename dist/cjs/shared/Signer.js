"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignerHistogram = void 0;
const getSignerHistogram = (signers) => signers.reduce((signers, signer) => {
    var _a;
    const duplicateIndex = signers.all.findIndex(({ publicKey }) => publicKey.equals(signer.publicKey));
    const duplicate = (_a = signers.all[duplicateIndex]) !== null && _a !== void 0 ? _a : null;
    const duplicateIsIdentity = duplicate ? !('secretKey' in duplicate) : false;
    const signerIsIdentity = !('secretKey' in signer);
    if (!duplicate) {
        signers.all.push(signer);
        signerIsIdentity ? signers.identities.push(signer) : signers.keypairs.push(signer);
    }
    else if (duplicateIsIdentity && !signerIsIdentity) {
        // Prefer keypair than identity signer as it requires less user interactions.
        const duplicateIdentitiesIndex = signers.identities.findIndex(({ publicKey }) => publicKey.equals(signer.publicKey));
        delete signers.all[duplicateIndex];
        delete signers.identities[duplicateIdentitiesIndex];
        signers.all.push(signer);
        signers.keypairs.push(signer);
    }
    return signers;
}, { all: [], keypairs: [], identities: [] });
exports.getSignerHistogram = getSignerHistogram;
//# sourceMappingURL=Signer.js.map