import NodeBundlr, { WebBundlr } from '@bundlr-network/client';
import BigNumber from 'bignumber.js';
import { StorageDriver } from './StorageDriver';
import { KeypairIdentityDriver } from '../identity/KeypairIdentityDriver';
import { planUploadMetadataOperation } from "../../modules";
import { planUploadMetadataUsingBundlrOperationHandler } from './planUploadMetadataUsingBundlrOperationHandler';
import { SolAmount } from "../../shared";
import { AssetUploadFailedError, FailedToConnectToBundlrAddressError, FailedToInitializeBundlrError, NotYetImplementedError, } from "../../errors";
export const bundlrStorage = (options = {}) => ({
    install(metaplex) {
        metaplex.setStorage(new BundlrStorageDriver(metaplex, options));
        metaplex.register(planUploadMetadataOperation, planUploadMetadataUsingBundlrOperationHandler);
    },
});
export class BundlrStorageDriver extends StorageDriver {
    constructor(metaplex, options = {}) {
        super(metaplex);
        this.bundlr = null;
        this.options = {
            providerUrl: metaplex.connection.rpcEndpoint,
            ...options,
        };
    }
    async getBalance() {
        const bundlr = await this.getBundlr();
        const balance = await bundlr.getLoadedBalance();
        return SolAmount.fromLamports(balance);
    }
    async getPrice(...files) {
        const price = await this.getMultipliedPrice(this.getBytes(files));
        return SolAmount.fromLamports(price);
    }
    async upload(file) {
        const [uri] = await this.uploadAll([file]);
        return uri;
    }
    async uploadAll(files) {
        await this.fund(files);
        const promises = files.map((file) => this.uploadFile(file));
        // TODO: withdraw any money left in the balance?
        return Promise.all(promises);
    }
    async fundingNeeded(filesOrBytes, skipBalanceCheck = false) {
        const price = await this.getMultipliedPrice(this.getBytes(filesOrBytes));
        if (skipBalanceCheck) {
            return price;
        }
        const bundlr = await this.getBundlr();
        const balance = await bundlr.getLoadedBalance();
        return price.isGreaterThan(balance) ? price.minus(balance) : new BigNumber(0);
    }
    async needsFunding(filesOrBytes, skipBalanceCheck = false) {
        const fundingNeeded = await this.fundingNeeded(filesOrBytes, skipBalanceCheck);
        return fundingNeeded.isGreaterThan(0);
    }
    async fund(filesOrBytes, skipBalanceCheck = false) {
        const bundlr = await this.getBundlr();
        const fundingNeeded = await this.fundingNeeded(filesOrBytes, skipBalanceCheck);
        if (!fundingNeeded.isGreaterThan(0)) {
            return;
        }
        // TODO: Catch errors and wrap in BundlrErrors.
        await bundlr.fund(fundingNeeded);
    }
    getBytes(filesOrBytes) {
        if (typeof filesOrBytes === 'number') {
            return filesOrBytes;
        }
        return filesOrBytes.reduce((total, file) => total + file.getBytes(), 0);
    }
    async getMultipliedPrice(bytes) {
        const bundlr = await this.getBundlr();
        const price = await bundlr.getPrice(bytes);
        return price.multipliedBy(this.options.priceMultiplier ?? 1.5).decimalPlaces(0);
    }
    async uploadFile(file) {
        const bundlr = await this.getBundlr();
        const { status, data } = await bundlr.uploader.upload(file.toBuffer(), file.getTagsWithContentType());
        if (status >= 300) {
            throw new AssetUploadFailedError(status);
        }
        return `https://arweave.net/${data.id}`;
    }
    async withdrawAll() {
        // TODO: Implement when available on Bundlr.
        throw new NotYetImplementedError();
    }
    async getBundlr() {
        if (this.bundlr)
            return this.bundlr;
        const currency = 'solana';
        const address = this.options?.address ?? 'https://node1.bundlr.network';
        const options = {
            timeout: this.options.timeout,
            providerUrl: this.options.providerUrl,
        };
        const identity = this.metaplex.identity();
        const bundlr = identity instanceof KeypairIdentityDriver
            ? new NodeBundlr(address, currency, identity.keypair.secretKey, options)
            : new WebBundlr(address, currency, identity, options);
        try {
            // Check for valid bundlr node.
            await bundlr.utils.getBundlerAddress(currency);
        }
        catch (error) {
            throw new FailedToConnectToBundlrAddressError(address, error);
        }
        if (bundlr instanceof WebBundlr) {
            try {
                // Try to initiate bundlr.
                await bundlr.ready();
            }
            catch (error) {
                throw new FailedToInitializeBundlrError(error);
            }
        }
        this.bundlr = bundlr;
        return bundlr;
    }
}
//# sourceMappingURL=BundlrStorageDriver.js.map