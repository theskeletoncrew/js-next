import { FilesystemDriver } from './FilesystemDriver';
import { MetaplexFile } from './MetaplexFile';
export declare class NodeFilesystemDriver extends FilesystemDriver {
    fileExists(path: string): Promise<boolean>;
    directoryExists(path: string): Promise<boolean>;
    has(path: string): Promise<boolean>;
    read(path: string): Promise<MetaplexFile>;
}
