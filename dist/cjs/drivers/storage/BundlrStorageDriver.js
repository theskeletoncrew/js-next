"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BundlrStorageDriver = exports.bundlrStorage = void 0;
const client_1 = __importStar(require("@bundlr-network/client"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const StorageDriver_1 = require("./StorageDriver");
const KeypairIdentityDriver_1 = require("../identity/KeypairIdentityDriver");
const modules_1 = require("../../modules");
const planUploadMetadataUsingBundlrOperationHandler_1 = require("./planUploadMetadataUsingBundlrOperationHandler");
const shared_1 = require("../../shared");
const errors_1 = require("../../errors");
const bundlrStorage = (options = {}) => ({
    install(metaplex) {
        metaplex.setStorage(new BundlrStorageDriver(metaplex, options));
        metaplex.register(modules_1.planUploadMetadataOperation, planUploadMetadataUsingBundlrOperationHandler_1.planUploadMetadataUsingBundlrOperationHandler);
    },
});
exports.bundlrStorage = bundlrStorage;
class BundlrStorageDriver extends StorageDriver_1.StorageDriver {
    constructor(metaplex, options = {}) {
        super(metaplex);
        this.bundlr = null;
        this.options = Object.assign({ providerUrl: metaplex.connection.rpcEndpoint }, options);
    }
    getBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            const bundlr = yield this.getBundlr();
            const balance = yield bundlr.getLoadedBalance();
            return shared_1.SolAmount.fromLamports(balance);
        });
    }
    getPrice(...files) {
        return __awaiter(this, void 0, void 0, function* () {
            const price = yield this.getMultipliedPrice(this.getBytes(files));
            return shared_1.SolAmount.fromLamports(price);
        });
    }
    upload(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const [uri] = yield this.uploadAll([file]);
            return uri;
        });
    }
    uploadAll(files) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fund(files);
            const promises = files.map((file) => this.uploadFile(file));
            // TODO: withdraw any money left in the balance?
            return Promise.all(promises);
        });
    }
    fundingNeeded(filesOrBytes, skipBalanceCheck = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const price = yield this.getMultipliedPrice(this.getBytes(filesOrBytes));
            if (skipBalanceCheck) {
                return price;
            }
            const bundlr = yield this.getBundlr();
            const balance = yield bundlr.getLoadedBalance();
            return price.isGreaterThan(balance) ? price.minus(balance) : new bignumber_js_1.default(0);
        });
    }
    needsFunding(filesOrBytes, skipBalanceCheck = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const fundingNeeded = yield this.fundingNeeded(filesOrBytes, skipBalanceCheck);
            return fundingNeeded.isGreaterThan(0);
        });
    }
    fund(filesOrBytes, skipBalanceCheck = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const bundlr = yield this.getBundlr();
            const fundingNeeded = yield this.fundingNeeded(filesOrBytes, skipBalanceCheck);
            if (!fundingNeeded.isGreaterThan(0)) {
                return;
            }
            // TODO: Catch errors and wrap in BundlrErrors.
            yield bundlr.fund(fundingNeeded);
        });
    }
    getBytes(filesOrBytes) {
        if (typeof filesOrBytes === 'number') {
            return filesOrBytes;
        }
        return filesOrBytes.reduce((total, file) => total + file.getBytes(), 0);
    }
    getMultipliedPrice(bytes) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const bundlr = yield this.getBundlr();
            const price = yield bundlr.getPrice(bytes);
            return price.multipliedBy((_a = this.options.priceMultiplier) !== null && _a !== void 0 ? _a : 1.5).decimalPlaces(0);
        });
    }
    uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const bundlr = yield this.getBundlr();
            const { status, data } = yield bundlr.uploader.upload(file.toBuffer(), file.getTagsWithContentType());
            if (status >= 300) {
                throw new errors_1.AssetUploadFailedError(status);
            }
            return `https://arweave.net/${data.id}`;
        });
    }
    withdrawAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Implement when available on Bundlr.
            throw new errors_1.NotYetImplementedError();
        });
    }
    getBundlr() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.bundlr)
                return this.bundlr;
            const currency = 'solana';
            const address = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.address) !== null && _b !== void 0 ? _b : 'https://node1.bundlr.network';
            const options = {
                timeout: this.options.timeout,
                providerUrl: this.options.providerUrl,
            };
            const identity = this.metaplex.identity();
            const bundlr = identity instanceof KeypairIdentityDriver_1.KeypairIdentityDriver
                ? new client_1.default(address, currency, identity.keypair.secretKey, options)
                : new client_1.WebBundlr(address, currency, identity, options);
            try {
                // Check for valid bundlr node.
                yield bundlr.utils.getBundlerAddress(currency);
            }
            catch (error) {
                throw new errors_1.FailedToConnectToBundlrAddressError(address, error);
            }
            if (bundlr instanceof client_1.WebBundlr) {
                try {
                    // Try to initiate bundlr.
                    yield bundlr.ready();
                }
                catch (error) {
                    throw new errors_1.FailedToInitializeBundlrError(error);
                }
            }
            this.bundlr = bundlr;
            return bundlr;
        });
    }
}
exports.BundlrStorageDriver = BundlrStorageDriver;
//# sourceMappingURL=BundlrStorageDriver.js.map