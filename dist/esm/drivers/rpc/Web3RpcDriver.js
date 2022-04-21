import { PublicKey, } from '@solana/web3.js';
import { getSignerHistogram, TransactionBuilder } from "../../shared";
import { RpcDriver, } from './RpcDriver';
import { FailedToConfirmTransactionError, FailedToConfirmTransactionWithResponseError, FailedToSendTransactionError, } from "../../errors";
export class Web3RpcDriver extends RpcDriver {
    async sendTransaction(transaction, signers = [], sendOptions = {}) {
        if (transaction instanceof TransactionBuilder) {
            signers = [...transaction.getSigners(), ...signers];
            transaction = transaction.toTransaction();
        }
        transaction.feePayer ?? (transaction.feePayer = this.getDefaultFeePayer());
        transaction.recentBlockhash ?? (transaction.recentBlockhash = await this.getLatestBlockhash());
        signers = [this.metaplex.identity(), ...signers];
        const { keypairs, identities } = getSignerHistogram(signers);
        if (keypairs.length > 0) {
            transaction.partialSign(...keypairs);
        }
        for (let i = 0; i < identities.length; i++) {
            await identities[i].signTransaction(transaction);
        }
        const rawTransaction = transaction.serialize();
        try {
            return await this.metaplex.connection.sendRawTransaction(rawTransaction, sendOptions);
        }
        catch (error) {
            // TODO: Parse using program knowledge when possible.
            throw new FailedToSendTransactionError(error);
        }
    }
    async confirmTransaction(signature, commitment) {
        try {
            const rpcResponse = await this.metaplex.connection.confirmTransaction(signature, commitment);
            if (rpcResponse.value.err) {
                throw new FailedToConfirmTransactionWithResponseError(rpcResponse);
            }
            return rpcResponse;
        }
        catch (error) {
            throw new FailedToConfirmTransactionError(error);
        }
    }
    async sendAndConfirmTransaction(transaction, signers, confirmOptions) {
        const signature = await this.sendTransaction(transaction, signers, confirmOptions);
        const confirmResponse = await this.confirmTransaction(signature, confirmOptions?.commitment);
        return { signature, confirmResponse };
    }
    getAccountInfo(publicKey, commitment) {
        return this.metaplex.connection.getAccountInfo(publicKey, commitment);
    }
    getMultipleAccountsInfo(publicKeys, commitment) {
        return this.metaplex.connection.getMultipleAccountsInfo(publicKeys, commitment);
    }
    async getLatestBlockhash() {
        return (await this.metaplex.connection.getLatestBlockhash('finalized')).blockhash;
    }
    getDefaultFeePayer() {
        const identity = this.metaplex.identity().publicKey;
        return identity.equals(PublicKey.default) ? undefined : identity;
    }
}
//# sourceMappingURL=Web3RpcDriver.js.map