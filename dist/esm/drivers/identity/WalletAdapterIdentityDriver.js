import { IdentityDriver } from './IdentityDriver';
import { GuestIdentityDriver } from './GuestIdentityDriver';
import { OperationNotSupportedByWalletAdapterError, UninitializedWalletAdapterError, } from "../../errors";
export const walletAdapterIdentity = (walletAdapter) => ({
    install(metaplex) {
        metaplex.setIdentity(new WalletAdapterIdentityDriver(metaplex, walletAdapter));
    },
});
export const walletOrGuestIdentity = (walletAdapter) => ({
    install(metaplex) {
        const identity = walletAdapter
            ? new WalletAdapterIdentityDriver(metaplex, walletAdapter)
            : new GuestIdentityDriver(metaplex);
        metaplex.setIdentity(identity);
    },
});
export class WalletAdapterIdentityDriver extends IdentityDriver {
    constructor(metaplex, walletAdapter) {
        super(metaplex);
        this.walletAdapter = walletAdapter;
    }
    get publicKey() {
        if (!this.walletAdapter.publicKey) {
            throw new UninitializedWalletAdapterError();
        }
        return this.walletAdapter.publicKey;
    }
    async signMessage(message) {
        if (this.walletAdapter.signMessage === undefined) {
            throw new OperationNotSupportedByWalletAdapterError('signMessage');
        }
        return this.walletAdapter.signMessage(message);
    }
    async signTransaction(transaction) {
        if (this.walletAdapter.signTransaction === undefined) {
            throw new OperationNotSupportedByWalletAdapterError('signTransaction');
        }
        return this.walletAdapter.signTransaction(transaction);
    }
    async signAllTransactions(transactions) {
        if (this.walletAdapter.signAllTransactions === undefined) {
            throw new OperationNotSupportedByWalletAdapterError('signAllTransactions');
        }
        return this.walletAdapter.signAllTransactions(transactions);
    }
}
//# sourceMappingURL=WalletAdapterIdentityDriver.js.map