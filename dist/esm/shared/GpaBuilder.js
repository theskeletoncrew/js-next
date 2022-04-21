import { PublicKey, } from '@solana/web3.js';
import { Buffer } from 'buffer';
import base58 from 'bs58';
import BN from 'bn.js';
import { GmaBuilder } from './GmaBuilder';
import { Postpone } from './Postpone';
export class GpaBuilder {
    constructor(connection, programId) {
        /** The configs to use when fetching program accounts. */
        this.config = {};
        this.connection = connection;
        this.programId = programId;
    }
    static from(builder) {
        const newBuilder = new this(builder.connection, builder.programId);
        newBuilder.mergeConfig(builder.config);
        newBuilder.sortCallback = builder.sortCallback;
        return newBuilder;
    }
    mergeConfig(config) {
        this.config = { ...this.config, ...config };
        return this;
    }
    slice(offset, length) {
        this.config.dataSlice = { offset, length };
        return this;
    }
    withoutData() {
        return this.slice(0, 0);
    }
    addFilter(...filters) {
        if (!this.config.filters) {
            this.config.filters = [];
        }
        this.config.filters.push(...filters);
        return this;
    }
    where(offset, bytes) {
        if (bytes instanceof Buffer) {
            bytes = base58.encode(bytes);
        }
        else if (bytes instanceof PublicKey) {
            bytes = bytes.toBase58();
        }
        else if (bytes instanceof BN) {
            bytes = base58.encode(bytes.toArray());
        }
        else if (typeof bytes !== 'string') {
            bytes = base58.encode(new BN(bytes, 'le').toArray());
        }
        return this.addFilter({ memcmp: { offset, bytes } });
    }
    whereSize(dataSize) {
        return this.addFilter({ dataSize });
    }
    sortUsing(callback) {
        this.sortCallback = callback;
        return this;
    }
    async get() {
        const rawAccounts = await this.connection.getProgramAccounts(this.programId, this.config);
        const accounts = rawAccounts.map(({ pubkey, account }) => ({
            pubkey,
            ...account,
        }));
        if (this.sortCallback) {
            accounts.sort(this.sortCallback);
        }
        return accounts;
    }
    lazy() {
        return Postpone.make(() => this.get());
    }
    async getAndMap(callback) {
        return this.lazy().map(callback).run();
    }
    async getPublicKeys() {
        return this.getAndMap((account) => account.pubkey);
    }
    async getDataAsPublicKeys() {
        return this.getAndMap((account) => new PublicKey(account.data));
    }
    getMultipleAccounts(callback, options) {
        const cb = callback ?? ((account) => new PublicKey(account.data));
        return Postpone.make(async () => {
            return new GmaBuilder(this.connection, await this.getAndMap(cb), options);
        });
    }
}
//# sourceMappingURL=GpaBuilder.js.map