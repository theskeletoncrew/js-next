import { MetaplexError, MetaplexErrorInputWithoutSource } from './MetaplexError';
export declare class SdkError extends MetaplexError {
    constructor(input: MetaplexErrorInputWithoutSource);
}
export declare class OperationHandlerMissingError extends SdkError {
    constructor(operationKey: string, cause?: Error);
}
export declare class InvalidJsonVariableError extends SdkError {
    constructor(cause?: Error);
}
export declare class InvalidJsonStringError extends SdkError {
    constructor(cause?: Error);
}
export declare class OperationUnauthorizedForGuestsError extends SdkError {
    constructor(operation: string, cause?: Error);
}
export declare class UninitializedWalletAdapterError extends SdkError {
    constructor(cause?: Error);
}
export declare class OperationNotSupportedByWalletAdapterError extends SdkError {
    constructor(operation: string, cause?: Error);
}
export declare class TaskIsAlreadyRunningError extends SdkError {
    constructor(cause?: Error);
}
export declare class AssetNotFoundError extends SdkError {
    constructor(location: string, cause?: Error);
}
export declare class NotYetImplementedError extends SdkError {
    constructor(cause?: Error);
}
