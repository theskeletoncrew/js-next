import nacl from 'tweetnacl';
import { Driver } from '../Driver';
export class IdentityDriver extends Driver {
    async verifyMessage(message, signature) {
        return nacl.sign.detached.verify(message, signature, this.publicKey.toBytes());
    }
    is(that) {
        return this.publicKey.toBase58() === that.publicKey.toBase58();
    }
}
//# sourceMappingURL=IdentityDriver.js.map