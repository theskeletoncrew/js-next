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
exports.NftClient = void 0;
const shared_1 = require("../../shared");
const operations_1 = require("./operations");
class NftClient extends shared_1.ModuleClient {
    findNftByMint(mint) {
        return this.metaplex.execute((0, operations_1.findNftByMintOperation)(mint));
    }
    findNftsByMintList(mints) {
        return this.metaplex.execute((0, operations_1.findNftsByMintListOperation)(mints));
    }
    findNftsByOwner(owner) {
        return this.metaplex.execute((0, operations_1.findNftsByOwnerOperation)(owner));
    }
    findNftsByCreator(creator, position = 1) {
        return this.metaplex.execute((0, operations_1.findNftsByCreatorOperation)({ creator, position }));
    }
    findNftsByCandyMachine(candyMachine, version) {
        return this.metaplex.execute((0, operations_1.findNftsByCandyMachineOperation)({ candyMachine, version }));
    }
    uploadMetadata(input) {
        return this.metaplex.execute((0, operations_1.uploadMetadataOperation)(input));
    }
    planUploadMetadata(input) {
        return this.metaplex.execute((0, operations_1.planUploadMetadataOperation)(input));
    }
    createNft(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = (0, operations_1.createNftOperation)(input);
            const createNftOutput = yield this.metaplex.execute(operation);
            const nft = yield this.findNftByMint(createNftOutput.mint.publicKey);
            return Object.assign(Object.assign({}, createNftOutput), { nft });
        });
    }
    updateNft(nft, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = (0, operations_1.updateNftOperation)(Object.assign(Object.assign({}, input), { nft }));
            const updateNftOutput = yield this.metaplex.execute(operation);
            const updatedNft = yield this.findNftByMint(nft.mint);
            return Object.assign(Object.assign({}, updateNftOutput), { nft: updatedNft });
        });
    }
}
exports.NftClient = NftClient;
//# sourceMappingURL=NftClient.js.map