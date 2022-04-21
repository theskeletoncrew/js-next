import { MetaplexFile } from "../../../drivers";
import { OperationHandler } from "../../../shared";
import { JsonMetadata } from '../models';
import { PlanUploadMetadataOperation, UploadMetadataInput } from '../operations';
export declare const planUploadMetadataOperationHandler: OperationHandler<PlanUploadMetadataOperation>;
export declare const getAssetsFromJsonMetadata: (input: UploadMetadataInput) => MetaplexFile[];
export declare const replaceAssetsWithUris: (input: UploadMetadataInput, replacements: string[]) => JsonMetadata;
