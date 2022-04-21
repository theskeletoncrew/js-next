import BN from 'bn.js';
import { StorageDriver } from './StorageDriver';
import { SolAmount } from "../../shared";
import { AssetNotFoundError } from "../../errors";
const DEFAULT_BASE_URL = 'https://mockstorage.example.com/';
const DEFAULT_COST_PER_BYTE = new BN(1);
export const mockStorage = (options) => ({
    install(metaplex) {
        metaplex.setStorage(new MockStorageDriver(metaplex, options));
    },
});
export class MockStorageDriver extends StorageDriver {
    constructor(metaplex, options) {
        super(metaplex);
        this.cache = {};
        this.baseUrl = options?.baseUrl ?? DEFAULT_BASE_URL;
        this.costPerByte =
            options?.costPerByte != null ? new BN(options?.costPerByte) : DEFAULT_COST_PER_BYTE;
    }
    async getPrice(...files) {
        const bytes = files.reduce((total, file) => total + file.toBuffer().byteLength, 0);
        return SolAmount.fromLamports(bytes).multipliedBy(this.costPerByte);
    }
    async upload(file) {
        const uri = `${this.baseUrl}${file.uniqueName}`;
        this.cache[uri] = file;
        return uri;
    }
    async download(uri) {
        const file = this.cache[uri];
        if (!file) {
            throw new AssetNotFoundError(uri);
        }
        return file;
    }
    async downloadJson(uri) {
        const file = await this.download(uri);
        return JSON.parse(file.toString());
    }
}
//# sourceMappingURL=MockStorageDriver.js.map