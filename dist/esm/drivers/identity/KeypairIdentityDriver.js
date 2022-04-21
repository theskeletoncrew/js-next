import nacl from 'tweetnacl';
import { IdentityDriver } from './IdentityDriver';
export const keypairIdentity = (keypair) => ({
    install(metaplex) {
        metaplex.setIdentity(new KeypairIdentityDriver(metaplex, keypair));
    },
});
export class KeypairIdentityDriver extends IdentityDriver {
    constructor(metaplex, keypair) {
        super(metaplex);
        this.keypair = keypair;
        this.publicKey = keypair.publicKey;
        this.secretKey = keypair.secretKey;
    }
    async signMessage(message) {
        return nacl.sign.detached(message, this.secretKey);
    }
    async signTransaction(transaction) {
        transaction.feePayer = this.publicKey;
        // TODO: Handle Transaction recentBlockhash required.
        transaction.partialSign(this.keypair);
        return transaction;
    }
    async signAllTransactions(transactions) {
        return Promise.all(transactions.map((transaction) => this.signTransaction(transaction)));
    }
}
//# sourceMappingURL=KeypairIdentityDriver.js.map