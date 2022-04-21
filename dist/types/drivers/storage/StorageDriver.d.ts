import { SolAmount } from "../../shared";
import { Driver } from '../Driver';
import { MetaplexFile } from '../filesystem/MetaplexFile';
export declare abstract class StorageDriver extends Driver {
    abstract getPrice(...files: MetaplexFile[]): Promise<SolAmount>;
    abstract upload(file: MetaplexFile): Promise<string>;
    uploadAll(files: MetaplexFile[]): Promise<string[]>;
    uploadJson<T extends object>(json: T): Promise<string>;
    download(uri: string, options?: RequestInit): Promise<MetaplexFile>;
    downloadJson<T extends object>(uri: string, options?: RequestInit): Promise<T>;
}
