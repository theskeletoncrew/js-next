import { PublicKey } from '@solana/web3.js';
import { IdentityDriver } from './IdentityDriver';
import { OperationUnauthorizedForGuestsError } from "../../errors";
export const guestIdentity = () => ({
    install(metaplex) {
        metaplex.setIdentity(new GuestIdentityDriver(metaplex));
    },
});
export class GuestIdentityDriver extends IdentityDriver {
    constructor(metaplex) {
        super(metaplex);
        this.publicKey = PublicKey.default;
    }
    async signMessage(_message) {
        throw new OperationUnauthorizedForGuestsError('signMessage');
    }
    async signTransaction(_transaction) {
        throw new OperationUnauthorizedForGuestsError('signTransaction');
    }
    async signAllTransactions(_transactions) {
        throw new OperationUnauthorizedForGuestsError('signAllTransactions');
    }
}
//# sourceMappingURL=GuestIdentityDriver.js.map