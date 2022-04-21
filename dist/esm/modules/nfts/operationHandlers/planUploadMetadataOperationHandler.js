import cloneDeep from 'lodash.clonedeep';
import { MetaplexFile } from "../../../drivers";
import { Plan } from "../../../shared";
import { walk } from "../../../utils";
export const planUploadMetadataOperationHandler = {
    handle: async (operation, metaplex) => {
        const metadata = operation.input;
        const files = getAssetsFromJsonMetadata(metadata);
        if (files.length <= 0) {
            return Plan.make().addStep({
                name: 'Upload the metadata',
                handler: () => uploadMetadata(metaplex, metadata),
            });
        }
        return Plan.make()
            .addStep({
            name: 'Upload assets',
            handler: () => uploadAssets(metaplex, metadata),
        })
            .addStep({
            name: 'Upload the metadata',
            handler: (input) => uploadMetadata(metaplex, input),
        });
    },
};
const uploadAssets = async (metaplex, input) => {
    const files = getAssetsFromJsonMetadata(input);
    const uris = await metaplex.storage().uploadAll(files);
    return replaceAssetsWithUris(input, uris);
};
const uploadMetadata = async (metaplex, metadata) => {
    const uri = await metaplex.storage().uploadJson(metadata);
    return { metadata, uri };
};
export const getAssetsFromJsonMetadata = (input) => {
    const files = [];
    walk(input, (walk, value) => {
        if (value instanceof MetaplexFile) {
            files.push(value);
        }
        else {
            walk(value);
        }
    });
    return files;
};
export const replaceAssetsWithUris = (input, replacements) => {
    const clone = cloneDeep(input);
    let index = 0;
    walk(clone, (walk, value, key, parent) => {
        if (value instanceof MetaplexFile && index < replacements.length) {
            parent[key] = replacements[index++];
        }
        walk(value);
    });
    return clone;
};
//# sourceMappingURL=planUploadMetadataOperationHandler.js.map