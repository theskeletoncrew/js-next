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
exports.createNftOperationHandler = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const tokenMetadata_1 = require("../../../programs/tokenMetadata");
const transactionBuilders_1 = require("../transactionBuilders");
exports.createNftOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const { uri, isMutable, maxSupply, allowHolderOffCurve = false, mint = web3_js_1.Keypair.generate(), payer = metaplex.identity(), mintAuthority = payer, updateAuthority = mintAuthority, owner = mintAuthority.publicKey, freezeAuthority, tokenProgram, associatedTokenProgram, confirmOptions, } = operation.input;
        const metadata = yield metaplex.storage().downloadJson(uri);
        const data = resolveData(operation.input, metadata, updateAuthority.publicKey);
        const metadataPda = yield tokenMetadata_1.MetadataAccount.pda(mint.publicKey);
        const masterEditionPda = yield tokenMetadata_1.MasterEditionAccount.pda(mint.publicKey);
        const lamports = yield (0, spl_token_1.getMinimumBalanceForRentExemptMint)(metaplex.connection);
        const associatedToken = yield (0, spl_token_1.getAssociatedTokenAddress)(mint.publicKey, owner, allowHolderOffCurve, tokenProgram, associatedTokenProgram);
        const { signature } = yield metaplex.rpc().sendAndConfirmTransaction((0, transactionBuilders_1.createNftBuilder)({
            lamports,
            data,
            isMutable,
            maxSupply,
            mint,
            payer,
            mintAuthority,
            updateAuthority,
            owner,
            associatedToken,
            freezeAuthority,
            metadata: metadataPda,
            masterEdition: masterEditionPda,
            tokenProgram,
            associatedTokenProgram,
        }), undefined, confirmOptions);
        return {
            mint,
            metadata: metadataPda,
            masterEdition: masterEditionPda,
            associatedToken,
            transactionId: signature,
        };
    }),
};
const resolveData = (input, metadata, updateAuthority) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const metadataCreators = (_b = (_a = metadata.properties) === null || _a === void 0 ? void 0 : _a.creators) === null || _b === void 0 ? void 0 : _b.filter((creator) => creator.address).map((creator) => {
        var _a;
        return ({
            address: new web3_js_1.PublicKey(creator.address),
            share: (_a = creator.share) !== null && _a !== void 0 ? _a : 0,
            verified: false,
        });
    });
    let creators = (_d = (_c = input.creators) !== null && _c !== void 0 ? _c : metadataCreators) !== null && _d !== void 0 ? _d : null;
    if (creators === null) {
        creators = [
            {
                address: updateAuthority,
                share: 100,
                verified: true,
            },
        ];
    }
    else {
        creators = creators.map((creator) => {
            if (creator.address.toBase58() === updateAuthority.toBase58()) {
                return Object.assign(Object.assign({}, creator), { verified: true });
            }
            else {
                return creator;
            }
        });
    }
    return {
        name: (_f = (_e = input.name) !== null && _e !== void 0 ? _e : metadata.name) !== null && _f !== void 0 ? _f : '',
        symbol: (_h = (_g = input.symbol) !== null && _g !== void 0 ? _g : metadata.symbol) !== null && _h !== void 0 ? _h : '',
        uri: input.uri,
        sellerFeeBasisPoints: (_k = (_j = input.sellerFeeBasisPoints) !== null && _j !== void 0 ? _j : metadata.seller_fee_basis_points) !== null && _k !== void 0 ? _k : 500,
        creators,
        collection: (_l = input.collection) !== null && _l !== void 0 ? _l : null,
        uses: (_m = input.uses) !== null && _m !== void 0 ? _m : null,
    };
};
//# sourceMappingURL=createNftOperationHandler.js.map