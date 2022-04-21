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
exports.MetaplexFile = void 0;
const buffer_1 = require("buffer");
const utils_1 = require("../../utils");
const errors_1 = require("../../errors");
class MetaplexFile {
    constructor(content, fileName, options = {}) {
        var _a, _b, _c, _d, _e;
        this.buffer = MetaplexFile.parseContent(content);
        this.fileName = fileName;
        this.displayName = (_a = options.displayName) !== null && _a !== void 0 ? _a : fileName;
        this.uniqueName = (_b = options.uniqueName) !== null && _b !== void 0 ? _b : (0, utils_1.randomStr)();
        this.contentType = (_c = options.contentType) !== null && _c !== void 0 ? _c : (0, utils_1.getContentType)(fileName);
        this.extension = (_d = options.extension) !== null && _d !== void 0 ? _d : (0, utils_1.getExtension)(fileName);
        this.tags = (_e = options.tags) !== null && _e !== void 0 ? _e : [];
    }
    static fromFile(file, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const buffer = yield file.arrayBuffer();
            return new this(buffer, file.name, options);
        });
    }
    static fromJson(json, fileName = 'inline.json', options = {}) {
        let jsonString;
        try {
            jsonString = JSON.stringify(json);
        }
        catch (error) {
            throw new errors_1.InvalidJsonVariableError(error);
        }
        return new this(jsonString, fileName, options);
    }
    static parseContent(content) {
        if (content instanceof ArrayBuffer) {
            return buffer_1.Buffer.from(new Uint8Array(content));
        }
        return buffer_1.Buffer.from(content);
    }
    getTagsWithContentType() {
        if (!this.contentType) {
            return this.tags;
        }
        return [{ name: 'Content-Type', value: this.contentType }, ...this.tags];
    }
    getBytes() {
        return this.buffer.byteLength;
    }
    toBuffer() {
        return this.buffer;
    }
    toString() {
        return this.buffer.toString();
    }
    toGlobalFile() {
        return new File([this.buffer], this.fileName);
    }
}
exports.MetaplexFile = MetaplexFile;
//# sourceMappingURL=MetaplexFile.js.map