import { SendTransactionError, TransactionError } from '@solana/web3.js';
import { ConfirmTransactionResponse } from '../drivers/rpc/RpcDriver';
import { MetaplexError, MetaplexErrorInputWithoutSource } from './MetaplexError';

export class RpcError extends MetaplexError {
  constructor(input: MetaplexErrorInputWithoutSource) {
    super({
      ...input,
      key: `rpc.${input.key}`,
      source: 'rpc',
    });
  }
}

export class FailedToSendTransactionError extends RpcError {
  constructor(cause: Error) {
    super({
      cause,
      key: 'failed_to_send_transaction',
      title: 'Failed to Send Transaction',
      problem: `The transaction could not be sent successfully to the network.`,
      solution: 'Check the error below for more information.',
    });
  }

  public asSendTransactionError(): SendTransactionError {
    return this.cause as SendTransactionError;
  }

  public get error() {
    return this.asSendTransactionError().message;
  }

  public get logs() {
    return this.asSendTransactionError().logs ?? [];
  }
}

export class FailedToConfirmTransactionError extends RpcError {
  constructor(cause: Error) {
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
  public readonly response: ConfirmTransactionResponse;

  constructor(response: ConfirmTransactionResponse) {
    const getMessage = (error: TransactionError | null): string => {
      if (!error) return 'Unknown error';
      if (typeof error === 'string') return error;
      try {
        return JSON.stringify(error);
      } catch (error) {
        return 'Unknown error';
      }
    };

    super(new Error(getMessage(response.value.err)));
    this.response = response;
  }

  public get error(): TransactionError {
    return this.response.value.err ?? 'Unknown error';
  }
}
