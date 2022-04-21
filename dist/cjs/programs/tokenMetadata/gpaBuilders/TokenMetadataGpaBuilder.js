"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMetadataGpaBuilder = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const shared_1 = require("../../../shared");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const MetadataV1GpaBuilder_1 = require("./MetadataV1GpaBuilder");
class TokenMetadataGpaBuilder extends shared_1.GpaBuilder {
    whereKey(key) {
        return this.where(0, new bn_js_1.default(key, 'le'));
    }
    metadataV1Accounts() {
        return MetadataV1GpaBuilder_1.MetadataV1GpaBuilder.from(this).whereKey(mpl_token_metadata_1.Key.MetadataV1);
    }
    masterEditionV1Accounts() {
        return this.whereKey(mpl_token_metadata_1.Key.MasterEditionV1);
    }
    masterEditionV2Accounts() {
        return this.whereKey(mpl_token_metadata_1.Key.MasterEditionV1);
    }
}
exports.TokenMetadataGpaBuilder = TokenMetadataGpaBuilder;
//# sourceMappingURL=TokenMetadataGpaBuilder.js.map