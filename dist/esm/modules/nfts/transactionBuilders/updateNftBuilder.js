import { updateMetadataV2Builder } from "../../../programs/tokenMetadata";
import { TransactionBuilder } from "../../../shared";
export const updateNftBuilder = (params) => {
    const { data, isMutable, updateAuthority, newUpdateAuthority, primarySaleHappened, metadata, instructionKey, } = params;
    return TransactionBuilder.make().add(updateMetadataV2Builder({
        data,
        newUpdateAuthority,
        primarySaleHappened,
        isMutable,
        metadata,
        updateAuthority,
        instructionKey,
    }));
};
//# sourceMappingURL=updateNftBuilder.js.map