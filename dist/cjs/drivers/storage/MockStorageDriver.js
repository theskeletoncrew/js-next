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
exports.MockStorageDriver = exports.mockStorage = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const StorageDriver_1 = require("./StorageDriver");
const shared_1 = require("../../shared");
const errors_1 = require("../../errors");
const DEFAULT_BASE_URL = 'https://mockstorage.example.com/';
const DEFAULT_COST_PER_BYTE = new bn_js_1.default(1);
const mockStorage = (options) => ({
    install(metaplex) {
        metaplex.setStorage(new MockStorageDriver(metaplex, options));
    },
});
exports.mockStorage = mockStorage;
class MockStorageDriver extends StorageDriver_1.StorageDriver {
    constructor(metaplex, options) {
        var _a;
        super(metaplex);
        this.cache = {};
        this.baseUrl = (_a = options === null || options === void 0 ? void 0 : options.baseUrl) !== null && _a !== void 0 ? _a : DEFAULT_BASE_URL;
        this.costPerByte =
            (options === null || options === void 0 ? void 0 : options.costPerByte) != null ? new bn_js_1.default(options === null || options === void 0 ? void 0 : options.costPerByte) : DEFAULT_COST_PER_BYTE;
    }
    getPrice(...files) {
        return __awaiter(this, void 0, void 0, function* () {
            const bytes = files.reduce((total, file) => total + file.toBuffer().byteLength, 0);
            return shared_1.SolAmount.fromLamports(bytes).multipliedBy(this.costPerByte);
        });
    }
    upload(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = `${this.baseUrl}${file.uniqueName}`;
            this.cache[uri] = file;
            return uri;
        });
    }
    download(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.cache[uri];
            if (!file) {
                throw new errors_1.AssetNotFoundError(uri);
            }
            return file;
        });
    }
    downloadJson(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.download(uri);
            return JSON.parse(file.toString());
        });
    }
}
exports.MockStorageDriver = MockStorageDriver;
//# sourceMappingURL=MockStorageDriver.js.map