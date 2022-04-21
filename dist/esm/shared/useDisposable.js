import { EventEmitter } from 'eventemitter3';
export const useDisposable = (signal) => {
    // Abort getters.
    let cancelationError = null;
    const isCanceled = () => signal?.aborted ?? false;
    const getCancelationError = () => cancelationError;
    // Abort listeners.
    const eventEmitter = new EventEmitter();
    const close = () => {
        signal?.removeEventListener('abort', abortListener);
        eventEmitter.removeAllListeners();
    };
    const abortListener = (error) => {
        cancelationError = error;
        eventEmitter.emit('cancel', error);
        close();
    };
    signal?.addEventListener('abort', abortListener);
    // Abort scope to give to the callback.
    const scope = {
        signal,
        isCanceled,
        getCancelationError,
        throwIfCanceled: () => {
            if (isCanceled()) {
                throw getCancelationError();
            }
        },
    };
    const run = async (callback) => {
        try {
            return await Promise.resolve(callback(scope));
        }
        finally {
            close();
        }
    };
    return {
        run,
        isCanceled,
        getCancelationError,
        onCancel(callback) {
            eventEmitter.on('cancel', callback);
            return this;
        },
    };
};
//# sourceMappingURL=useDisposable.js.map