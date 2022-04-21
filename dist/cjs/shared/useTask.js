"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTask = void 0;
const eventemitter3_1 = require("eventemitter3");
const errors_1 = require("../errors");
const useDisposable_1 = require("./useDisposable");
const useTask = (callback) => {
    // State.
    let status = 'pending';
    let result = undefined;
    let error = undefined;
    const eventEmitter = new eventemitter3_1.EventEmitter();
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
    const forceRun = (options = {}) => __awaiter(void 0, void 0, void 0, function* () {
        const disposable = (0, useDisposable_1.useDisposable)(options.signal).onCancel((cancelError) => {
            setStatus('canceled');
            error = cancelError;
        });
        return disposable.run((scope) => __awaiter(void 0, void 0, void 0, function* () {
            const { isCanceled, throwIfCanceled } = scope;
            try {
                // Start loading.
                setStatus('running');
                result = undefined;
                error = undefined;
                result = yield Promise.resolve(callback(scope));
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
        }));
    });
    const run = (options = {}) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (isRunning()) {
            throw new errors_1.TaskIsAlreadyRunningError();
        }
        if (isPending() || ((_a = options.force) !== null && _a !== void 0 ? _a : false)) {
            return forceRun(options);
        }
        if (isSuccessful()) {
            return getResult();
        }
        throw getError();
    });
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
exports.useTask = useTask;
//# sourceMappingURL=useTask.js.map