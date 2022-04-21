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
exports.useDisposable = void 0;
const eventemitter3_1 = require("eventemitter3");
const useDisposable = (signal) => {
    // Abort getters.
    let cancelationError = null;
    const isCanceled = () => { var _a; return (_a = signal === null || signal === void 0 ? void 0 : signal.aborted) !== null && _a !== void 0 ? _a : false; };
    const getCancelationError = () => cancelationError;
    // Abort listeners.
    const eventEmitter = new eventemitter3_1.EventEmitter();
    const close = () => {
        signal === null || signal === void 0 ? void 0 : signal.removeEventListener('abort', abortListener);
        eventEmitter.removeAllListeners();
    };
    const abortListener = (error) => {
        cancelationError = error;
        eventEmitter.emit('cancel', error);
        close();
    };
    signal === null || signal === void 0 ? void 0 : signal.addEventListener('abort', abortListener);
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
    const run = (callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield Promise.resolve(callback(scope));
        }
        finally {
            close();
        }
    });
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
exports.useDisposable = useDisposable;
//# sourceMappingURL=useDisposable.js.map