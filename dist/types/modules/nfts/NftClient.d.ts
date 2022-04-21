import { ModuleClient, Plan } from "../../shared";
import { Nft } from "./";
import { PublicKey } from '@solana/web3.js';
import { UploadMetadataInput, UploadMetadataOutput, CreateNftInput, CreateNftOutput, UpdateNftInput, UpdateNftOutput } from './operations';
export declare class NftClient extends ModuleClient {
    findNftByMint(mint: PublicKey): Promise<Nft>;
    findNftsByMintList(mints: PublicKey[]): Promise<(Nft | null)[]>;
    findNftsByOwner(owner: PublicKey): Promise<Nft[]>;
    findNftsByCreator(creator: PublicKey, position?: number): Promise<Nft[]>;
    findNftsByCandyMachine(candyMachine: PublicKey, version?: 1 | 2): Promise<Nft[]>;
    uploadMetadata(input: UploadMetadataInput): Promise<UploadMetadataOutput>;
    planUploadMetadata(input: UploadMetadataInput): Promise<Plan<undefined, UploadMetadataOutput>>;
    createNft(input: CreateNftInput): Promise<{
        nft: Nft;
    } & CreateNftOutput>;
    updateNft(nft: Nft, input: Omit<UpdateNftInput, 'nft'>): Promise<{
        nft: Nft;
    } & UpdateNftOutput>;
}
