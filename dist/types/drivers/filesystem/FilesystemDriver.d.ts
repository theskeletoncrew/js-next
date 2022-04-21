import { Driver } from '../Driver';
import { MetaplexFile } from './MetaplexFile';
export declare abstract class FilesystemDriver extends Driver {
    abstract fileExists(path: string): Promise<boolean>;
    abstract directoryExists(path: string): Promise<boolean>;
    abstract has(path: string): Promise<boolean>;
    abstract read(path: string): Promise<MetaplexFile>;
}
