import { MetadataAccount } from "../../../programs";
import { updateNftBuilder } from '../transactionBuilders';
export const updateNftOperationHandler = {
    handle: async (operation, metaplex) => {
        const { nft, newUpdateAuthority = nft.updateAuthority, primarySaleHappened = nft.primarySaleHappened, isMutable = nft.isMutable, updateAuthority = metaplex.identity(), confirmOptions, } = operation.input;
        const data = resolveData(operation.input);
        const metadata = await MetadataAccount.pda(nft.mint);
        const { signature } = await metaplex.rpc().sendAndConfirmTransaction(updateNftBuilder({
            data,
            newUpdateAuthority,
            primarySaleHappened,
            isMutable,
            updateAuthority,
            metadata,
        }), undefined, confirmOptions);
        return { transactionId: signature };
    },
};
const resolveData = (input) => {
    const { nft } = input;
    return {
        name: input.name ?? nft.name,
        symbol: input.symbol ?? nft.symbol,
        uri: input.uri ?? nft.uri,
        sellerFeeBasisPoints: input.sellerFeeBasisPoints ?? nft.sellerFeeBasisPoints,
        creators: input.creators ?? nft.creators,
        collection: input.collection ?? nft.collection,
        uses: input.uses ?? nft.uses,
    };
};
//# sourceMappingURL=updateNftOperationHandler.js.map