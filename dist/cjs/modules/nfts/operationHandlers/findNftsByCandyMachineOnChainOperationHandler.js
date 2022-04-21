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
exports.findNftsByCandyMachineOnChainOperationHandler = void 0;
const web3_js_1 = require("@solana/web3.js");
const operations_1 = require("../operations");
exports.findNftsByCandyMachineOnChainOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const { candyMachine, version = 2 } = operation.input;
        let firstCreator = candyMachine;
        if (version === 2) {
            // TODO: Refactor when we have a CandyMachine program in the SDK.
            [firstCreator] = yield web3_js_1.PublicKey.findProgramAddress([Buffer.from('candy_machine'), candyMachine.toBuffer()], new web3_js_1.PublicKey('cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ'));
        }
        return metaplex.execute((0, operations_1.findNftsByCreatorOperation)({
            creator: firstCreator,
            position: 1,
        }));
    }),
};
//# sourceMappingURL=findNftsByCandyMachineOnChainOperationHandler.js.map