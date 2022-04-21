export * from './models';
export * from './operationHandlers';
export * from './operations';
export * from './transactionBuilders';
export * from './NftClient';
import { MetaplexPlugin } from "../../MetaplexPlugin";
import { NftClient } from './NftClient';
export declare const nftPlugin: () => MetaplexPlugin;
declare module '../../Metaplex' {
    interface Metaplex {
        nfts(): NftClient;
    }
}
