import { PutObjectCommand } from '@aws-sdk/client-s3';
import { StorageDriver } from './StorageDriver';
import { SolAmount } from "../../shared";
export const awsStorage = (client, bucketName) => ({
    install(metaplex) {
        metaplex.setStorage(new AwsStorageDriver(metaplex, client, bucketName));
    },
});
export class AwsStorageDriver extends StorageDriver {
    constructor(metaplex, client, bucketName) {
        super(metaplex);
        this.client = client;
        this.bucketName = bucketName;
    }
    async getPrice(..._files) {
        return SolAmount.zero();
    }
    async upload(file) {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: file.uniqueName,
            Body: file.toBuffer(),
        });
        try {
            await this.client.send(command);
            return await this.getUrl(file.uniqueName);
        }
        catch (err) {
            // TODO: Custom errors.
            throw err;
        }
    }
    async getUrl(key) {
        const region = await this.client.config.region();
        const encodedKey = encodeURIComponent(key);
        return `https://s3.${region}.amazonaws.com/${this.bucketName}/${encodedKey}`;
    }
}
//# sourceMappingURL=AwsStorageDriver.js.map