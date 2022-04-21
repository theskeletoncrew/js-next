import { MetadataAccount } from "../../../programs";
import { GmaBuilder } from "../../../shared";
import { Nft } from '../models';
export const findNftsByMintListOnChainOperationHandler = {
    handle: async (operation, metaplex) => {
        const mints = operation.input;
        const metadataPdas = await Promise.all(mints.map((mint) => MetadataAccount.pda(mint)));
        const metadataInfos = await GmaBuilder.make(metaplex.connection, metadataPdas).get();
        return metadataInfos.map((metadataInfo) => {
            if (!metadataInfo || !metadataInfo.exists)
                return null;
            try {
                const metadata = MetadataAccount.fromAccountInfo(metadataInfo);
                return new Nft(metadata, metaplex);
            }
            catch (error) {
                return null;
            }
        });
    },
};
//# sourceMappingURL=findNftsByMintListOnChainOperationHandler.js.map