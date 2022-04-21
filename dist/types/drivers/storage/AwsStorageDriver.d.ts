import { S3Client } from '@aws-sdk/client-s3';
import { Metaplex } from "../../Metaplex";
import { MetaplexPlugin } from "../../MetaplexPlugin";
import { StorageDriver } from './StorageDriver';
import { MetaplexFile } from '../filesystem/MetaplexFile';
import { SolAmount } from "../../shared";
export declare const awsStorage: (client: S3Client, bucketName: string) => MetaplexPlugin;
export declare class AwsStorageDriver extends StorageDriver {
    protected client: S3Client;
    protected bucketName: string;
    constructor(metaplex: Metaplex, client: S3Client, bucketName: string);
    getPrice(..._files: MetaplexFile[]): Promise<SolAmount>;
    upload(file: MetaplexFile): Promise<string>;
    protected getUrl(key: string): Promise<string>;
}
