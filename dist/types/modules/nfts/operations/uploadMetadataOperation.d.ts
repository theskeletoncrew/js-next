import { MetaplexFile } from "../../../drivers";
import { Operation } from "../../../shared";
import { JsonMetadata } from '../models';
export declare const uploadMetadataOperation: import("../../../shared").OperationConstructor<UploadMetadataOperation, "UploadMetadataOperation", UploadMetadataInput, UploadMetadataOutput>;
export declare type UploadMetadataOperation = Operation<'UploadMetadataOperation', UploadMetadataInput, UploadMetadataOutput>;
export declare type UploadMetadataInput = JsonMetadata<MetaplexFile | string>;
export interface UploadMetadataOutput {
    metadata: JsonMetadata;
    uri: string;
}
