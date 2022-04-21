import { PublicKey } from '@solana/web3.js';
import { TokenStandard, Collection, Uses, Creator, MasterEditionV2Args } from '@metaplex-foundation/mpl-token-metadata';
import { Metaplex } from "../../../Metaplex";
import { Model } from "../../../shared";
import { MetadataAccount, MasterEditionAccount } from "../../../programs/tokenMetadata";
import { JsonMetadata } from './JsonMetadata';
import { JsonMetadataTask } from './useJsonMetadataTask';
import { MasterEditionTask } from './useMasterEditionTask';
export declare class Nft extends Model {
    /** The Metadata PDA account defining the NFT. */
    readonly metadataAccount: MetadataAccount;
    /** Tasks. */
    readonly metadataTask: JsonMetadataTask;
    readonly masterEditionTask: MasterEditionTask;
    /** Data from the Metadata account. */
    readonly updateAuthority: PublicKey;
    readonly mint: PublicKey;
    readonly name: string;
    readonly symbol: string;
    readonly uri: string;
    readonly sellerFeeBasisPoints: number;
    readonly creators: Creator[] | null;
    readonly primarySaleHappened: boolean;
    readonly isMutable: boolean;
    readonly editionNonce: number | null;
    readonly tokenStandard: TokenStandard | null;
    readonly collection: Collection | null;
    readonly uses: Uses | null;
    constructor(metadataAccount: MetadataAccount, metaplex: Metaplex);
    get metadata(): JsonMetadata;
    get masterEditionAccount(): MasterEditionAccount | null;
    get masterEdition(): Partial<Omit<MasterEditionV2Args, 'key'>>;
    is(other: Nft | PublicKey): boolean;
}
