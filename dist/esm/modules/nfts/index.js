export * from './models';
export * from './operationHandlers';
export * from './operations';
export * from './transactionBuilders';
export * from './NftClient';
import { NftClient } from './NftClient';
import * as o from './operations';
import * as h from './operationHandlers';
export const nftPlugin = () => ({
    install(metaplex) {
        metaplex.register(o.createNftOperation, h.createNftOperationHandler);
        metaplex.register(o.findNftByMintOperation, h.findNftByMintOnChainOperationHandler);
        metaplex.register(o.findNftsByCandyMachineOperation, h.findNftsByCandyMachineOnChainOperationHandler);
        metaplex.register(o.findNftsByCreatorOperation, h.findNftsByCreatorOnChainOperationHandler);
        metaplex.register(o.findNftsByMintListOperation, h.findNftsByMintListOnChainOperationHandler);
        metaplex.register(o.findNftsByOwnerOperation, h.findNftsByOwnerOnChainOperationHandler);
        metaplex.register(o.planUploadMetadataOperation, h.planUploadMetadataOperationHandler);
        metaplex.register(o.updateNftOperation, h.updateNftOperationHandler);
        metaplex.register(o.uploadMetadataOperation, h.uploadMetadataOperationHandler);
        metaplex.nfts = function () {
            return new NftClient(this);
        };
    },
});
//# sourceMappingURL=index.js.map