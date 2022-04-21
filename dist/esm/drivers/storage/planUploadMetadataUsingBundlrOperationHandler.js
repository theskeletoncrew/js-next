import { getAssetsFromJsonMetadata, planUploadMetadataOperationHandler, replaceAssetsWithUris, } from "../../modules/nfts";
import { MetaplexFile } from '../filesystem';
import { BundlrStorageDriver } from './BundlrStorageDriver';
export const planUploadMetadataUsingBundlrOperationHandler = {
    handle: async (operation, metaplex, scope) => {
        const metadata = operation.input;
        const plan = await planUploadMetadataOperationHandler.handle(operation, metaplex, scope);
        const storage = metaplex.storage();
        if (!(storage instanceof BundlrStorageDriver)) {
            return plan;
        }
        const assets = getAssetsFromJsonMetadata(metadata);
        const mockUri = 'x'.repeat(100);
        const mockUris = assets.map(() => mockUri);
        const mockedMetadata = replaceAssetsWithUris(metadata, mockUris);
        const files = [...assets, MetaplexFile.fromJson(mockedMetadata)];
        return plan.prependStep({
            name: 'Fund Bundlr wallet',
            handler: async () => {
                const needsFunding = await storage.needsFunding(files);
                if (!needsFunding) {
                    return;
                }
                await storage.fund(files);
            },
        });
    },
};
//# sourceMappingURL=planUploadMetadataUsingBundlrOperationHandler.js.map