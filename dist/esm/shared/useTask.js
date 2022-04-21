import { EventEmitter } from 'eventemitter3';
import { TaskIsAlreadyRunningError } from "../errors";
import { useDisposable } from './useDisposable';
export const useTask = (callback) => {
    // State.
    let status = 'pending';
    let result = undefined;
    let error = undefined;
    const eventEmitter = new EventEmitter();
    // Getters.
    const getStatus = () => status;
    const getResult = () => result;
    const getError = () => error;
    const isPending = () => status === 'pending';
    const isRunning = () => status === 'running';
    const isCompleted = () => status !== 'pending' && status !== 'running';
    const isSuccessful = () => status === 'successful';
    const isFailed = () => status === 'failed';
    const isCanceled = () => status === 'canceled';
    // Setters.
    const setStatus = (newStatus) => {
        if (status === newStatus)
            return;
        status = newStatus;
        eventEmitter.emit('statusChange', newStatus);
    };
    // Run methods.
    const forceRun = async (options = {}) => {
        const disposable = useDisposable(options.signal).onCancel((cancelError) => {
            setStatus('canceled');
            error = cancelError;
        });
        return disposable.run(async (scope) => {
            const { isCanceled, throwIfCanceled } = scope;
            try {
                // Start loading.
                setStatus('running');
                result = undefined;
                error = undefined;
                result = await Promise.resolve(callback(scope));
                throwIfCanceled();
                setStatus('successful');
                // Return the loaded result.
                return result;
            }
            catch (newError) {
                // Capture the error and reset the result.
                error = newError;
                result = undefined;
                setStatus(isCanceled() ? 'canceled' : 'failed');
                // Re-throw the error.
                throw error;
            }
        });
    };
    const run = async (options = {}) => {
        if (isRunning()) {
            throw new TaskIsAlreadyRunningError();
        }
        if (isPending() || (options.force ?? false)) {
            return forceRun(options);
        }
        if (isSuccessful()) {
            return getResult();
        }
        throw getError();
    };
    return {
        getStatus,
        getResult,
        getError,
        isPending,
        isRunning,
        isCompleted,
        isSuccessful,
        isFailed,
        isCanceled,
        run,
        loadWith(preloadedResult) {
            setStatus('successful');
            result = preloadedResult;
            error = undefined;
            return this;
        },
        reset() {
            setStatus('pending');
            result = undefined;
            error = undefined;
            return this;
        },
        onStatusChange(callback) {
            eventEmitter.on('statusChange', callback);
            return this;
        },
        onStatusChangeTo(status, callback) {
            return this.onStatusChange((newStatus) => (status === newStatus ? callback() : undefined));
        },
        onSuccess(callback) {
            return this.onStatusChangeTo('successful', callback);
        },
        onFailure(callback) {
            return this.onStatusChangeTo('failed', callback);
        },
        onCancel(callback) {
            return this.onStatusChangeTo('canceled', callback);
        },
    };
};
//# sourceMappingURL=useTask.js.map