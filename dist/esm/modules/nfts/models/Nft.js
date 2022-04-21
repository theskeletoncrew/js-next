import { Model } from "../../../shared";
import { removeEmptyChars } from "../../../utils";
import { useJsonMetadataTask } from './useJsonMetadataTask';
import { useMasterEditionTask } from './useMasterEditionTask';
export class Nft extends Model {
    constructor(metadataAccount, metaplex) {
        super();
        this.metadataAccount = metadataAccount;
        this.metadataTask = useJsonMetadataTask(metaplex, this);
        this.masterEditionTask = useMasterEditionTask(metaplex, this);
        this.updateAuthority = metadataAccount.data.updateAuthority;
        this.mint = metadataAccount.data.mint;
        this.name = removeEmptyChars(metadataAccount.data.data.name);
        this.symbol = removeEmptyChars(metadataAccount.data.data.symbol);
        this.uri = removeEmptyChars(metadataAccount.data.data.uri);
        this.sellerFeeBasisPoints = metadataAccount.data.data.sellerFeeBasisPoints;
        this.creators = metadataAccount.data.data.creators;
        this.primarySaleHappened = metadataAccount.data.primarySaleHappened;
        this.isMutable = metadataAccount.data.isMutable;
        this.editionNonce = metadataAccount.data.editionNonce;
        this.tokenStandard = metadataAccount.data.tokenStandard;
        this.collection = metadataAccount.data.collection;
        this.uses = metadataAccount.data.uses;
    }
    get metadata() {
        return this.metadataTask.getResult() ?? {};
    }
    get masterEditionAccount() {
        return this.masterEditionTask.getResult() ?? null;
    }
    get masterEdition() {
        return this.masterEditionAccount?.data ?? {};
    }
    is(other) {
        const mint = other instanceof Nft ? other.mint : other;
        return this.mint.equals(mint);
    }
}
//# sourceMappingURL=Nft.js.map