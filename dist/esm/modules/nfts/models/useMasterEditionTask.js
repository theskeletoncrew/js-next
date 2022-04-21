import { MasterEditionAccount } from "../../../programs";
import { useTask } from "../../../shared";
export const useMasterEditionTask = (metaplex, nft) => useTask(async () => {
    const masterEditionPda = await MasterEditionAccount.pda(nft.mint);
    const masterEditionInfo = await metaplex.rpc().getAccountInfo(masterEditionPda);
    if (!masterEditionInfo) {
        return null;
    }
    return MasterEditionAccount.fromAccountInfo(masterEditionInfo);
});
//# sourceMappingURL=useMasterEditionTask.js.map