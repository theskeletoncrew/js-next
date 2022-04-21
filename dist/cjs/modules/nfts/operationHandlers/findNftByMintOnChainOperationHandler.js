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
exports.findNftByMintOnChainOperationHandler = void 0;
const models_1 = require("../models");
const programs_1 = require("../../../programs");
const errors_1 = require("../../../errors");
exports.findNftByMintOnChainOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const mint = operation.input;
        const [metadataInfo, masterEditionInfo] = yield metaplex
            .rpc()
            .getMultipleAccountsInfo([
            yield programs_1.MetadataAccount.pda(mint),
            yield programs_1.MasterEditionAccount.pda(mint),
        ]);
        const metadataAccount = metadataInfo ? programs_1.MetadataAccount.fromAccountInfo(metadataInfo) : null;
        const masterEditionAccount = masterEditionInfo
            ? programs_1.MasterEditionAccount.fromAccountInfo(masterEditionInfo)
            : null;
        if (!metadataAccount) {
            throw new errors_1.NftNotFoundError(mint);
        }
        const nft = new models_1.Nft(metadataAccount, metaplex);
        yield nft.metadataTask.run();
        nft.masterEditionTask.loadWith(masterEditionAccount);
        return nft;
    }),
};
//# sourceMappingURL=findNftByMintOnChainOperationHandler.js.map