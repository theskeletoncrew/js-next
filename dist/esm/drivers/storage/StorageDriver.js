import fetch from 'cross-fetch';
import { Driver } from '../Driver';
import { MetaplexFile } from '../filesystem/MetaplexFile';
export class StorageDriver extends Driver {
    async uploadAll(files) {
        const promises = files.map((file) => this.upload(file));
        return Promise.all(promises);
    }
    async uploadJson(json) {
        return this.upload(MetaplexFile.fromJson(json));
    }
    async download(uri, options) {
        const response = await fetch(uri, options);
        const buffer = await response.arrayBuffer();
        return new MetaplexFile(buffer, uri);
    }
    async downloadJson(uri, options) {
        const response = await fetch(uri, options);
        return await response.json();
    }
}
//# sourceMappingURL=StorageDriver.js.map