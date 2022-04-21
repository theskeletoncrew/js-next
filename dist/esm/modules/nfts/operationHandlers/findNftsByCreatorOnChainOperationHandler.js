import { TokenMetadataProgram } from "../../../programs";
import { findNftsByMintListOperation } from '../operations';
export const findNftsByCreatorOnChainOperationHandler = {
    handle: async (operation, metaplex) => {
        const { creator, position = 1 } = operation.input;
        const mints = await TokenMetadataProgram.metadataV1Accounts(metaplex.connection)
            .selectMint()
            .whereCreator(position, creator)
            .getDataAsPublicKeys();
        const nfts = await metaplex.execute(findNftsByMintListOperation(mints));
        return nfts.filter((nft) => nft !== null);
    },
};
//# sourceMappingURL=findNftsByCreatorOnChainOperationHandler.js.map