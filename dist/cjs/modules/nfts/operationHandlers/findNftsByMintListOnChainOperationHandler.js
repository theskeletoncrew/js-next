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
exports.findNftsByMintListOnChainOperationHandler = void 0;
const programs_1 = require("../../../programs");
const shared_1 = require("../../../shared");
const models_1 = require("../models");
exports.findNftsByMintListOnChainOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const mints = operation.input;
        const metadataPdas = yield Promise.all(mints.map((mint) => programs_1.MetadataAccount.pda(mint)));
        const metadataInfos = yield shared_1.GmaBuilder.make(metaplex.connection, metadataPdas).get();
        return metadataInfos.map((metadataInfo) => {
            if (!metadataInfo || !metadataInfo.exists)
                return null;
            try {
                const metadata = programs_1.MetadataAccount.fromAccountInfo(metadataInfo);
                return new models_1.Nft(metadata, metaplex);
            }
            catch (error) {
                return null;
            }
        });
    }),
};
//# sourceMappingURL=findNftsByMintListOnChainOperationHandler.js.map