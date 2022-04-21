import { readFile, lstat } from 'fs/promises';
import { FilesystemDriver } from './FilesystemDriver';
import { MetaplexFile } from './MetaplexFile';
export class NodeFilesystemDriver extends FilesystemDriver {
    async fileExists(path) {
        try {
            const stats = await lstat(path);
            return stats.isFile();
        }
        catch (error) {
            return false;
        }
    }
    async directoryExists(path) {
        try {
            const stats = await lstat(path);
            return stats.isDirectory();
        }
        catch (error) {
            return false;
        }
    }
    async has(path) {
        try {
            await lstat(path);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async read(path) {
        return new MetaplexFile(await readFile(path), path);
    }
}
//# sourceMappingURL=NodeFilesystemDriver.js.map