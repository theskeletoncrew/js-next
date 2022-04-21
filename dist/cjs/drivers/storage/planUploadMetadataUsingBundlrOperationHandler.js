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
Object.defineProperty(exports, "__esModule", { value: true });
exports.planUploadMetadataUsingBundlrOperationHandler = void 0;
const nfts_1 = require("../../modules/nfts");
const filesystem_1 = require("../filesystem");
const BundlrStorageDriver_1 = require("./BundlrStorageDriver");
exports.planUploadMetadataUsingBundlrOperationHandler = {
    handle: (operation, metaplex, scope) => __awaiter(void 0, void 0, void 0, function* () {
        const metadata = operation.input;
        const plan = yield nfts_1.planUploadMetadataOperationHandler.handle(operation, metaplex, scope);
        const storage = metaplex.storage();
        if (!(storage instanceof BundlrStorageDriver_1.BundlrStorageDriver)) {
            return plan;
        }
        const assets = (0, nfts_1.getAssetsFromJsonMetadata)(metadata);
        const mockUri = 'x'.repeat(100);
        const mockUris = assets.map(() => mockUri);
        const mockedMetadata = (0, nfts_1.replaceAssetsWithUris)(metadata, mockUris);
        const files = [...assets, filesystem_1.MetaplexFile.fromJson(mockedMetadata)];
        return plan.prependStep({
            name: 'Fund Bundlr wallet',
            handler: () => __awaiter(void 0, void 0, void 0, function* () {
                const needsFunding = yield storage.needsFunding(files);
                if (!needsFunding) {
                    return;
                }
                yield storage.fund(files);
            }),
        });
    }),
};
//# sourceMappingURL=planUploadMetadataUsingBundlrOperationHandler.js.map