import { Buffer } from 'buffer';
import { getContentType, getExtension, randomStr } from "../../utils";
import { InvalidJsonVariableError } from "../../errors";
export class MetaplexFile {
    constructor(content, fileName, options = {}) {
        this.buffer = MetaplexFile.parseContent(content);
        this.fileName = fileName;
        this.displayName = options.displayName ?? fileName;
        this.uniqueName = options.uniqueName ?? randomStr();
        this.contentType = options.contentType ?? getContentType(fileName);
        this.extension = options.extension ?? getExtension(fileName);
        this.tags = options.tags ?? [];
    }
    static async fromFile(file, options = {}) {
        const buffer = await file.arrayBuffer();
        return new this(buffer, file.name, options);
    }
    static fromJson(json, fileName = 'inline.json', options = {}) {
        let jsonString;
        try {
            jsonString = JSON.stringify(json);
        }
        catch (error) {
            throw new InvalidJsonVariableError(error);
        }
        return new this(jsonString, fileName, options);
    }
    static parseContent(content) {
        if (content instanceof ArrayBuffer) {
            return Buffer.from(new Uint8Array(content));
        }
        return Buffer.from(content);
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
//# sourceMappingURL=MetaplexFile.js.map