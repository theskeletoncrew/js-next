import { GpaBuilder } from "../../../shared";
import { Key } from '@metaplex-foundation/mpl-token-metadata';
import { MetadataV1GpaBuilder } from './MetadataV1GpaBuilder';
export declare class TokenMetadataGpaBuilder extends GpaBuilder {
    whereKey(key: Key): this;
    metadataV1Accounts(): MetadataV1GpaBuilder;
    masterEditionV1Accounts(): this;
    masterEditionV2Accounts(): this;
}
