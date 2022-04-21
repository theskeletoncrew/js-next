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
exports.useMasterEditionTask = void 0;
const programs_1 = require("../../../programs");
const shared_1 = require("../../../shared");
const useMasterEditionTask = (metaplex, nft) => (0, shared_1.useTask)(() => __awaiter(void 0, void 0, void 0, function* () {
    const masterEditionPda = yield programs_1.MasterEditionAccount.pda(nft.mint);
    const masterEditionInfo = yield metaplex.rpc().getAccountInfo(masterEditionPda);
    if (!masterEditionInfo) {
        return null;
    }
    return programs_1.MasterEditionAccount.fromAccountInfo(masterEditionInfo);
}));
exports.useMasterEditionTask = useMasterEditionTask;
//# sourceMappingURL=useMasterEditionTask.js.map