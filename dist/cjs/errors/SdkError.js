"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotYetImplementedError = exports.AssetNotFoundError = exports.TaskIsAlreadyRunningError = exports.OperationNotSupportedByWalletAdapterError = exports.UninitializedWalletAdapterError = exports.OperationUnauthorizedForGuestsError = exports.InvalidJsonStringError = exports.InvalidJsonVariableError = exports.OperationHandlerMissingError = exports.SdkError = void 0;
const MetaplexError_1 = require("./MetaplexError");
class SdkError extends MetaplexError_1.MetaplexError {
    constructor(input) {
        super(Object.assign(Object.assign({}, input), { key: `sdk.${input.key}`, source: 'sdk' }));
    }
}
exports.SdkError = SdkError;
class OperationHandlerMissingError extends SdkError {
    constructor(operationKey, cause) {
        super({
            cause,
            key: 'operation_handler_missing',
            title: 'Operation Handler Missing',
            problem: `No operation handler was registered for the [${operationKey}] operation.`,
            solution: 'Ensure an operation handler is registered by using the following code: ' +
                '"metaplex.register(operation, operationHandler)".',
        });
    }
}
exports.OperationHandlerMissingError = OperationHandlerMissingError;
class InvalidJsonVariableError extends SdkError {
    constructor(cause) {
        super({
            cause,
            key: 'invalid_json_variable',
            title: 'Invalid JSON Variable',
            problem: 'The provided JSON variable could not be parsed into a string.',
            solution: 'Ensure the variable can be parsed as a JSON string using "JSON.stringify(myVariable)".',
        });
    }
}
exports.InvalidJsonVariableError = InvalidJsonVariableError;
class InvalidJsonStringError extends SdkError {
    constructor(cause) {
        super({
            cause,
            key: 'invalid_json_string',
            title: 'Invalid JSON String',
            problem: 'The provided string could not be parsed into a JSON variable.',
            solution: 'Ensure the provided string uses a valid JSON syntax.',
        });
    }
}
exports.InvalidJsonStringError = InvalidJsonStringError;
class OperationUnauthorizedForGuestsError extends SdkError {
    constructor(operation, cause) {
        super({
            cause,
            key: 'operation_unauthorized_for_guests',
            title: 'Operation Unauthorized For Guests',
            problem: `Trying to access the [${operation}] operation as a guest.`,
            solution: 'Ensure your wallet is connected using the identity driver. ' +
                'For instance, by using "metaplex.use(walletAdapterIdentity(wallet))" or ' +
                '"metaplex.use(keypairIdentity(keypair))".',
        });
    }
}
exports.OperationUnauthorizedForGuestsError = OperationUnauthorizedForGuestsError;
class UninitializedWalletAdapterError extends SdkError {
    constructor(cause) {
        super({
            cause,
            key: 'uninitialized_wallet_adapter',
            title: 'Uninitialized Wallet Adapter',
            problem: 'The current wallet adapter is not initialized.',
            solution: 'You likely have selected a wallet adapter but forgot to initialize it. ' +
                'You may do this by running the following asynchronous method: "walletAdater.connect();".',
        });
    }
}
exports.UninitializedWalletAdapterError = UninitializedWalletAdapterError;
class OperationNotSupportedByWalletAdapterError extends SdkError {
    constructor(operation, cause) {
        super({
            cause,
            key: 'operation_not_supported_by_wallet_adapter',
            title: 'Operation Not Supported By Wallet Adapter',
            problem: `The current wallet adapter does not support the following operation: [${operation}].`,
            solution: 'Ensure your wallet is connected using a compatible wallet adapter.',
        });
    }
}
exports.OperationNotSupportedByWalletAdapterError = OperationNotSupportedByWalletAdapterError;
class TaskIsAlreadyRunningError extends SdkError {
    constructor(cause) {
        super({
            cause,
            key: 'task_is_already_running',
            title: 'Task Is Already Running',
            problem: "Trying to re-run a task that hasn't completed yet.",
            solution: 'Ensure the task has completed using "await" before trying to run it again.',
        });
    }
}
exports.TaskIsAlreadyRunningError = TaskIsAlreadyRunningError;
class AssetNotFoundError extends SdkError {
    constructor(location, cause) {
        super({
            cause,
            key: 'asset_not_found',
            title: 'Asset Not Found',
            problem: `The asset at [${location}] could not be found.`,
            solution: 'Ensure the asset exists at the given path or URI.',
        });
    }
}
exports.AssetNotFoundError = AssetNotFoundError;
class NotYetImplementedError extends SdkError {
    constructor(cause) {
        super({
            cause,
            key: 'not_yet_implemented',
            title: 'Not Yet Implemented',
            problem: 'This feature is not yet implemented.',
            solution: 'Please check back later.',
        });
    }
}
exports.NotYetImplementedError = NotYetImplementedError;
//# sourceMappingURL=SdkError.js.map