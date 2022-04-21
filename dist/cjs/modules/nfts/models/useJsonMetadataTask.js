"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useJsonMetadataTask = void 0;
const shared_1 = require("../../../shared");
const useJsonMetadataTask = (metaplex, nft) => (0, shared_1.useTask)(({ signal }) => {
    return metaplex.storage().downloadJson(nft.uri, { signal });
});
exports.useJsonMetadataTask = useJsonMetadataTask;
//# sourceMappingURL=useJsonMetadataTask.js.map