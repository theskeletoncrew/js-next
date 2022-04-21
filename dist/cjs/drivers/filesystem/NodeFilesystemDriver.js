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
exports.NodeFilesystemDriver = void 0;
const promises_1 = require("fs/promises");
const FilesystemDriver_1 = require("./FilesystemDriver");
const MetaplexFile_1 = require("./MetaplexFile");
class NodeFilesystemDriver extends FilesystemDriver_1.FilesystemDriver {
    fileExists(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stats = yield (0, promises_1.lstat)(path);
                return stats.isFile();
            }
            catch (error) {
                return false;
            }
        });
    }
    directoryExists(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stats = yield (0, promises_1.lstat)(path);
                return stats.isDirectory();
            }
            catch (error) {
                return false;
            }
        });
    }
    has(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, promises_1.lstat)(path);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    read(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return new MetaplexFile_1.MetaplexFile(yield (0, promises_1.readFile)(path), path);
        });
    }
}
exports.NodeFilesystemDriver = NodeFilesystemDriver;
//# sourceMappingURL=NodeFilesystemDriver.js.map