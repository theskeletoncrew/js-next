"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nft = void 0;
const shared_1 = require("../../../shared");
const utils_1 = require("../../../utils");
const useJsonMetadataTask_1 = require("./useJsonMetadataTask");
const useMasterEditionTask_1 = require("./useMasterEditionTask");
class Nft extends shared_1.Model {
    constructor(metadataAccount, metaplex) {
        super();
        this.metadataAccount = metadataAccount;
        this.metadataTask = (0, useJsonMetadataTask_1.useJsonMetadataTask)(metaplex, this);
        this.masterEditionTask = (0, useMasterEditionTask_1.useMasterEditionTask)(metaplex, this);
        this.updateAuthority = metadataAccount.data.updateAuthority;
        this.mint = metadataAccount.data.mint;
        this.name = (0, utils_1.removeEmptyChars)(metadataAccount.data.data.name);
        this.symbol = (0, utils_1.removeEmptyChars)(metadataAccount.data.data.symbol);
        this.uri = (0, utils_1.removeEmptyChars)(metadataAccount.data.data.uri);
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
        var _a;
        return (_a = this.metadataTask.getResult()) !== null && _a !== void 0 ? _a : {};
    }
    get masterEditionAccount() {
        var _a;
        return (_a = this.masterEditionTask.getResult()) !== null && _a !== void 0 ? _a : null;
    }
    get masterEdition() {
        var _a, _b;
        return (_b = (_a = this.masterEditionAccount) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : {};
    }
    is(other) {
        const mint = other instanceof Nft ? other.mint : other;
        return this.mint.equals(mint);
    }
}
exports.Nft = Nft;
//# sourceMappingURL=Nft.js.map