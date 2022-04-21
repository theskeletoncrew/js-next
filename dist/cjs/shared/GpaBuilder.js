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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GpaBuilder = void 0;
const web3_js_1 = require("@solana/web3.js");
const buffer_1 = require("buffer");
const bs58_1 = __importDefault(require("bs58"));
const bn_js_1 = __importDefault(require("bn.js"));
const GmaBuilder_1 = require("./GmaBuilder");
const Postpone_1 = require("./Postpone");
class GpaBuilder {
    constructor(connection, programId) {
        /** The configs to use when fetching program accounts. */
        this.config = {};
        this.connection = connection;
        this.programId = programId;
    }
    static from(builder) {
        const newBuilder = new this(builder.connection, builder.programId);
        newBuilder.mergeConfig(builder.config);
        newBuilder.sortCallback = builder.sortCallback;
        return newBuilder;
    }
    mergeConfig(config) {
        this.config = Object.assign(Object.assign({}, this.config), config);
        return this;
    }
    slice(offset, length) {
        this.config.dataSlice = { offset, length };
        return this;
    }
    withoutData() {
        return this.slice(0, 0);
    }
    addFilter(...filters) {
        if (!this.config.filters) {
            this.config.filters = [];
        }
        this.config.filters.push(...filters);
        return this;
    }
    where(offset, bytes) {
        if (bytes instanceof buffer_1.Buffer) {
            bytes = bs58_1.default.encode(bytes);
        }
        else if (bytes instanceof web3_js_1.PublicKey) {
            bytes = bytes.toBase58();
        }
        else if (bytes instanceof bn_js_1.default) {
            bytes = bs58_1.default.encode(bytes.toArray());
        }
        else if (typeof bytes !== 'string') {
            bytes = bs58_1.default.encode(new bn_js_1.default(bytes, 'le').toArray());
        }
        return this.addFilter({ memcmp: { offset, bytes } });
    }
    whereSize(dataSize) {
        return this.addFilter({ dataSize });
    }
    sortUsing(callback) {
        this.sortCallback = callback;
        return this;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const rawAccounts = yield this.connection.getProgramAccounts(this.programId, this.config);
            const accounts = rawAccounts.map(({ pubkey, account }) => (Object.assign({ pubkey }, account)));
            if (this.sortCallback) {
                accounts.sort(this.sortCallback);
            }
            return accounts;
        });
    }
    lazy() {
        return Postpone_1.Postpone.make(() => this.get());
    }
    getAndMap(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.lazy().map(callback).run();
        });
    }
    getPublicKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getAndMap((account) => account.pubkey);
        });
    }
    getDataAsPublicKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getAndMap((account) => new web3_js_1.PublicKey(account.data));
        });
    }
    getMultipleAccounts(callback, options) {
        const cb = callback !== null && callback !== void 0 ? callback : ((account) => new web3_js_1.PublicKey(account.data));
        return Postpone_1.Postpone.make(() => __awaiter(this, void 0, void 0, function* () {
            return new GmaBuilder_1.GmaBuilder(this.connection, yield this.getAndMap(cb), options);
        }));
    }
}
exports.GpaBuilder = GpaBuilder;
//# sourceMappingURL=GpaBuilder.js.map