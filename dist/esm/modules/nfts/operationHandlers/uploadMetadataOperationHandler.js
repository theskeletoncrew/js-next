import { planUploadMetadataOperation, } from '../operations';
export const uploadMetadataOperationHandler = {
    handle: async (operation, metaplex) => {
        const plan = await metaplex.execute(planUploadMetadataOperation(operation.input));
        return plan.execute();
    },
};
//# sourceMappingURL=uploadMetadataOperationHandler.js.map