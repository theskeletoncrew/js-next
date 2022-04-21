/// <reference types="node" />
import { Buffer } from 'buffer';
export interface MetaplexFileOptions {
    displayName?: string;
    uniqueName?: string;
    contentType?: string;
    extension?: string;
    tags?: {
        name: string;
        value: string;
    }[];
}
export declare class MetaplexFile {
    readonly buffer: Buffer;
    readonly fileName: string;
    readonly displayName: string;
    readonly uniqueName: string;
    readonly contentType: string | null;
    readonly extension: string | null;
    readonly tags: {
        name: string;
        value: string;
    }[];
    constructor(content: string | Buffer | Uint8Array | ArrayBuffer, fileName: string, options?: MetaplexFileOptions);
    static fromFile(file: File, options?: MetaplexFileOptions): Promise<MetaplexFile>;
    static fromJson<T extends object>(json: T, fileName?: string, options?: MetaplexFileOptions): MetaplexFile;
    protected static parseContent(content: string | Buffer | Uint8Array | ArrayBuffer): Buffer;
    getTagsWithContentType(): {
        name: string;
        value: string;
    }[];
    getBytes(): number;
    toBuffer(): Buffer;
    toString(): string;
    toGlobalFile(): File;
}
