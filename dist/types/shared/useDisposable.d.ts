import { AbortSignal } from 'abort-controller';
export declare type DisposableScope = {
    signal: AbortSignal | undefined;
    isCanceled: () => boolean;
    getCancelationError: () => unknown;
    throwIfCanceled: () => void;
};
export declare const useDisposable: (signal: AbortSignal | undefined) => {
    run: <T = unknown>(callback: (scope: DisposableScope) => T) => Promise<T>;
    isCanceled: () => boolean;
    getCancelationError: () => unknown;
    onCancel(callback: (reason: unknown) => unknown): any;
};
