import { useTask } from "../../../shared";
export const useJsonMetadataTask = (metaplex, nft) => useTask(({ signal }) => {
    return metaplex.storage().downloadJson(nft.uri, { signal });
});
//# sourceMappingURL=useJsonMetadataTask.js.map