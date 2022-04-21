import { ModuleClient } from "../../shared";
import { uploadMetadataOperation, planUploadMetadataOperation, createNftOperation, findNftByMintOperation, updateNftOperation, findNftsByOwnerOperation, findNftsByMintListOperation, findNftsByCreatorOperation, findNftsByCandyMachineOperation, } from './operations';
export class NftClient extends ModuleClient {
    findNftByMint(mint) {
        return this.metaplex.execute(findNftByMintOperation(mint));
    }
    findNftsByMintList(mints) {
        return this.metaplex.execute(findNftsByMintListOperation(mints));
    }
    findNftsByOwner(owner) {
        return this.metaplex.execute(findNftsByOwnerOperation(owner));
    }
    findNftsByCreator(creator, position = 1) {
        return this.metaplex.execute(findNftsByCreatorOperation({ creator, position }));
    }
    findNftsByCandyMachine(candyMachine, version) {
        return this.metaplex.execute(findNftsByCandyMachineOperation({ candyMachine, version }));
    }
    uploadMetadata(input) {
        return this.metaplex.execute(uploadMetadataOperation(input));
    }
    planUploadMetadata(input) {
        return this.metaplex.execute(planUploadMetadataOperation(input));
    }
    async createNft(input) {
        const operation = createNftOperation(input);
        const createNftOutput = await this.metaplex.execute(operation);
        const nft = await this.findNftByMint(createNftOutput.mint.publicKey);
        return { ...createNftOutput, nft };
    }
    async updateNft(nft, input) {
        const operation = updateNftOperation({ ...input, nft });
        const updateNftOutput = await this.metaplex.execute(operation);
        const updatedNft = await this.findNftByMint(nft.mint);
        return { ...updateNftOutput, nft: updatedNft };
    }
}
//# sourceMappingURL=NftClient.js.map