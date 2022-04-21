import { TokenProgram } from "../../../programs";
import { findNftsByMintListOperation } from '../operations';
export const findNftsByOwnerOnChainOperationHandler = {
    handle: async (operation, metaplex) => {
        const owner = operation.input;
        const mints = await TokenProgram.tokenAccounts(metaplex.connection)
            .selectMint()
            .whereOwner(owner)
            .whereAmount(1)
            .getDataAsPublicKeys();
        const nfts = await metaplex.execute(findNftsByMintListOperation(mints));
        return nfts.filter((nft) => nft !== null);
    },
};
//# sourceMappingURL=findNftsByOwnerOnChainOperationHandler.js.map