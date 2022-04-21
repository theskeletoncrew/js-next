import { setAuthorityBuilder } from "./..";
import { AuthorityType } from '@solana/spl-token';
import { TransactionBuilder } from "../../../shared";
export const disableMintingBuilder = (params) => {
    const { mint, mintAuthority, multiSigners, tokenProgram, instructionKey = 'disableMinting', } = params;
    return TransactionBuilder.make().add(setAuthorityBuilder({
        mint,
        currentAuthority: mintAuthority,
        authorityType: AuthorityType.MintTokens,
        newAuthority: null,
        multiSigners,
        tokenProgram,
        instructionKey,
    }));
};
//# sourceMappingURL=disableMintingBuilder.js.map