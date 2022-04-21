import { chunk, zipMap } from "../utils";
import { Postpone } from './Postpone';
export class GmaBuilder {
    constructor(connection, publicKeys, options = {}) {
        this.connection = connection;
        this.chunkSize = options.chunkSize ?? 100;
        this.publicKeys = publicKeys;
    }
    static make(connection, publicKeys, options = {}) {
        return new GmaBuilder(connection, publicKeys, options);
    }
    chunkBy(n) {
        this.chunkSize = n;
        return this;
    }
    addPublicKeys(publicKeys) {
        this.publicKeys.push(...publicKeys);
        return this;
    }
    getPublicKeys() {
        return this.publicKeys;
    }
    getUniquePublicKeys() {
        // TODO: Only send unique keys and reconciliate after call.
        return this.getPublicKeys();
    }
    async getFirst(n) {
        const end = this.boundNumber(n ?? 1);
        return this.getChunks(this.getPublicKeys().slice(0, end));
    }
    async getLast(n) {
        const start = this.boundNumber(n ?? 1);
        return this.getChunks(this.getPublicKeys().slice(-start));
    }
    async getBetween(start, end) {
        start = this.boundNumber(start);
        end = this.boundNumber(end);
        [start, end] = start > end ? [end, start] : [start, end];
        return this.getChunks(this.getPublicKeys().slice(start, end));
    }
    async getPage(page, perPage) {
        return this.getBetween((page - 1) * perPage, page * perPage);
    }
    async get() {
        return this.getChunks(this.getPublicKeys());
    }
    lazy() {
        return Postpone.make(async () => this.get());
    }
    async getAndMap(callback) {
        return this.lazy().map(callback).run();
    }
    async getChunks(publicKeys) {
        const chunks = chunk(publicKeys, this.chunkSize);
        const chunkPromises = chunks.map((chunk) => this.getChunk(chunk));
        const resolvedChunks = await Promise.allSettled(chunkPromises);
        return resolvedChunks.flatMap((result) => (result.status === 'fulfilled' ? result.value : []));
    }
    async getChunk(publicKeys) {
        try {
            // TODO: Use lower level RPC call to add dataSlice support.
            const accounts = (await this.connection.getMultipleAccountsInfo(publicKeys));
            return zipMap(publicKeys, accounts, (publicKey, account) => {
                return !account
                    ? { pubkey: publicKey, exists: false }
                    : { pubkey: publicKey, exists: true, ...account };
            });
        }
        catch (error) {
            // TODO: Throw error instead?
            return publicKeys.map((publicKey) => ({
                pubkey: publicKey,
                exists: false,
            }));
        }
    }
    boundNumber(n) {
        return this.boundIndex(n - 1) + 1;
    }
    boundIndex(index) {
        index = index < 0 ? 0 : index;
        index = index >= this.publicKeys.length ? this.publicKeys.length - 1 : index;
        return index;
    }
}
//# sourceMappingURL=GmaBuilder.js.map