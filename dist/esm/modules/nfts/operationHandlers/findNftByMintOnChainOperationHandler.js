import { Nft } from '../models';
import { MasterEditionAccount, MetadataAccount } from "../../../programs";
import { NftNotFoundError } from "../../../errors";
export const findNftByMintOnChainOperationHandler = {
    handle: async (operation, metaplex) => {
        const mint = operation.input;
        const [metadataInfo, masterEditionInfo] = await metaplex
            .rpc()
            .getMultipleAccountsInfo([
            await MetadataAccount.pda(mint),
            await MasterEditionAccount.pda(mint),
        ]);
        const metadataAccount = metadataInfo ? MetadataAccount.fromAccountInfo(metadataInfo) : null;
        const masterEditionAccount = masterEditionInfo
            ? MasterEditionAccount.fromAccountInfo(masterEditionInfo)
            : null;
        if (!metadataAccount) {
            throw new NftNotFoundError(mint);
        }
        const nft = new Nft(metadataAccount, metaplex);
        await nft.metadataTask.run();
        nft.masterEditionTask.loadWith(masterEditionAccount);
        return nft;
    },
};
//# sourceMappingURL=findNftByMintOnChainOperationHandler.js.map