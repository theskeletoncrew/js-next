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
exports.MetadataAccount = void 0;
const buffer_1 = require("buffer");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const tokenMetadata_1 = require("./..");
const shared_1 = require("../../../shared");
class MetadataAccount extends shared_1.Account {
    static pda(mint) {
        return __awaiter(this, void 0, void 0, function* () {
            return shared_1.Pda.find(tokenMetadata_1.TokenMetadataProgram.publicKey, [
                buffer_1.Buffer.from('metadata', 'utf8'),
                tokenMetadata_1.TokenMetadataProgram.publicKey.toBuffer(),
                mint.toBuffer(),
            ]);
        });
    }
    static fromAccountInfo(accountInfo) {
        return this.parseAccountInfo(accountInfo, mpl_token_metadata_1.Metadata);
    }
}
exports.MetadataAccount = MetadataAccount;
//# sourceMappingURL=MetadataAccount.js.map