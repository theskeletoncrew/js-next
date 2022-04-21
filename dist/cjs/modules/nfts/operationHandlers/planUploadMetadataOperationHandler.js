"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceAssetsWithUris = exports.getAssetsFromJsonMetadata = exports.planUploadMetadataOperationHandler = void 0;
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const drivers_1 = require("../../../drivers");
const shared_1 = require("../../../shared");
const utils_1 = require("../../../utils");
exports.planUploadMetadataOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const metadata = operation.input;
        const files = (0, exports.getAssetsFromJsonMetadata)(metadata);
        if (files.length <= 0) {
            return shared_1.Plan.make().addStep({
                name: 'Upload the metadata',
                handler: () => uploadMetadata(metaplex, metadata),
            });
        }
        return shared_1.Plan.make()
            .addStep({
            name: 'Upload assets',
            handler: () => uploadAssets(metaplex, metadata),
        })
            .addStep({
            name: 'Upload the metadata',
            handler: (input) => uploadMetadata(metaplex, input),
        });
    }),
};
const uploadAssets = (metaplex, input) => __awaiter(void 0, void 0, void 0, function* () {
    const files = (0, exports.getAssetsFromJsonMetadata)(input);
    const uris = yield metaplex.storage().uploadAll(files);
    return (0, exports.replaceAssetsWithUris)(input, uris);
});
const uploadMetadata = (metaplex, metadata) => __awaiter(void 0, void 0, void 0, function* () {
    const uri = yield metaplex.storage().uploadJson(metadata);
    return { metadata, uri };
});
const getAssetsFromJsonMetadata = (input) => {
    const files = [];
    (0, utils_1.walk)(input, (walk, value) => {
        if (value instanceof drivers_1.MetaplexFile) {
            files.push(value);
        }
        else {
            walk(value);
        }
    });
    return files;
};
exports.getAssetsFromJsonMetadata = getAssetsFromJsonMetadata;
const replaceAssetsWithUris = (input, replacements) => {
    const clone = (0, lodash_clonedeep_1.default)(input);
    let index = 0;
    (0, utils_1.walk)(clone, (walk, value, key, parent) => {
        if (value instanceof drivers_1.MetaplexFile && index < replacements.length) {
            parent[key] = replacements[index++];
        }
        walk(value);
    });
    return clone;
};
exports.replaceAssetsWithUris = replaceAssetsWithUris;
//# sourceMappingURL=planUploadMetadataOperationHandler.js.map