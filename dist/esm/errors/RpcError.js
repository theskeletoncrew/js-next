import { MetaplexError } from './MetaplexError';
export class RpcError extends MetaplexError {
    constructor(input) {
        super({
            ...input,
            key: `rpc.${input.key}`,
            source: 'rpc',
        });
    }
}
export class FailedToSendTransactionError extends RpcError {
    constructor(cause) {
        super({
            cause,
            key: 'failed_to_send_transaction',
            title: 'Failed to Send Transaction',
            problem: `The transaction could not be sent successfully to the network.`,
            solution: 'Check the error below for more information.',
        });
    }
    asSendTransactionError() {
        return this.cause;
    }
    get error() {
        return this.asSendTransactionError().message;
    }
    get logs() {
        return this.asSendTransactionError().logs ?? [];
    }
}
export class FailedToConfirmTransactionError extends RpcError {
    constructor(cause) {
        super({
            cause,
            key: 'failed_to_confirm_transaction',
            title: 'Failed to Confirm Transaction',
            problem: `The transaction could not be confirmed.`,
            solution: 'Check the error below for more information.',
        });
    }
}
export class FailedToConfirmTransactionWithResponseError extends FailedToConfirmTransactionError {
    constructor(response) {
        const getMessage = (error) => {
            if (!error)
                return 'Unknown error';
            if (typeof error === 'string')
                return error;
            try {
                return JSON.stringify(error);
            }
            catch (error) {
                return 'Unknown error';
            }
        };
        super(new Error(getMessage(response.value.err)));
        this.response = response;
    }
    get error() {
        return this.response.value.err ?? 'Unknown error';
    }
}
//# sourceMappingURL=RpcError.js.map