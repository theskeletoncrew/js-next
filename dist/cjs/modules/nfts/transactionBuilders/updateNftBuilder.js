"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNftBuilder = void 0;
const tokenMetadata_1 = require("../../../programs/tokenMetadata");
const shared_1 = require("../../../shared");
const updateNftBuilder = (params) => {
    const { data, isMutable, updateAuthority, newUpdateAuthority, primarySaleHappened, metadata, instructionKey, } = params;
    return shared_1.TransactionBuilder.make().add((0, tokenMetadata_1.updateMetadataV2Builder)({
        data,
        newUpdateAuthority,
        primarySaleHappened,
        isMutable,
        metadata,
        updateAuthority,
        instructionKey,
    }));
};
exports.updateNftBuilder = updateNftBuilder;
//# sourceMappingURL=updateNftBuilder.js.map