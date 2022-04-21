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
exports.StorageDriver = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const Driver_1 = require("../Driver");
const MetaplexFile_1 = require("../filesystem/MetaplexFile");
class StorageDriver extends Driver_1.Driver {
    uploadAll(files) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = files.map((file) => this.upload(file));
            return Promise.all(promises);
        });
    }
    uploadJson(json) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upload(MetaplexFile_1.MetaplexFile.fromJson(json));
        });
    }
    download(uri, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, cross_fetch_1.default)(uri, options);
            const buffer = yield response.arrayBuffer();
            return new MetaplexFile_1.MetaplexFile(buffer, uri);
        });
    }
    downloadJson(uri, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, cross_fetch_1.default)(uri, options);
            return yield response.json();
        });
    }
}
exports.StorageDriver = StorageDriver;
//# sourceMappingURL=StorageDriver.js.map