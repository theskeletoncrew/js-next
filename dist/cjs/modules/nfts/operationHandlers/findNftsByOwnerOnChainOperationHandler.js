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
exports.findNftsByOwnerOnChainOperationHandler = void 0;
const programs_1 = require("../../../programs");
const operations_1 = require("../operations");
exports.findNftsByOwnerOnChainOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const owner = operation.input;
        const mints = yield programs_1.TokenProgram.tokenAccounts(metaplex.connection)
            .selectMint()
            .whereOwner(owner)
            .whereAmount(1)
            .getDataAsPublicKeys();
        const nfts = yield metaplex.execute((0, operations_1.findNftsByMintListOperation)(mints));
        return nfts.filter((nft) => nft !== null);
    }),
};
//# sourceMappingURL=findNftsByOwnerOnChainOperationHandler.js.map