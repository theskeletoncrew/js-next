import { Plan, Operation } from "../../../shared";
import { UploadMetadataInput, UploadMetadataOutput } from './uploadMetadataOperation';
export declare const planUploadMetadataOperation: import("../../../shared").OperationConstructor<PlanUploadMetadataOperation, "PlanUploadMetadataOperation", UploadMetadataInput, Plan<any, UploadMetadataOutput>>;
export declare type PlanUploadMetadataOperation = Operation<'PlanUploadMetadataOperation', UploadMetadataInput, Plan<any, UploadMetadataOutput>>;
