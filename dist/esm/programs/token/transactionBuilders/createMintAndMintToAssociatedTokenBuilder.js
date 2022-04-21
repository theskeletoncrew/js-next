import { createMintBuilder, createAssociatedTokenAccountBuilder, mintToBuilder, } from "./..";
import { TransactionBuilder } from "../../../shared";
export const createMintAndMintToAssociatedTokenBuilder = (params) => {
    const { lamports, decimals, amount, createAssociatedToken = true, mint, payer, mintAuthority, owner, associatedToken, freezeAuthority, tokenProgram, associatedTokenProgram, createAccountInstructionKey, initializeMintInstructionKey, createAssociatedTokenInstructionKey, mintToInstructionKey, } = params;
    return (TransactionBuilder.make()
        // Create and initialize the mint account.
        .add(createMintBuilder({
        lamports,
        decimals,
        mint,
        payer,
        mintAuthority: mintAuthority.publicKey,
        freezeAuthority,
        tokenProgram,
        createAccountInstructionKey,
        initializeMintInstructionKey,
    }))
        // Create the associated account if it does not exists.
        .when(createAssociatedToken, (tx) => tx.add(createAssociatedTokenAccountBuilder({
        payer,
        associatedToken,
        owner,
        mint: mint.publicKey,
        tokenProgram,
        associatedTokenProgram,
        instructionKey: createAssociatedTokenInstructionKey,
    })))
        // Mint to the associated token.
        .add(mintToBuilder({
        mint: mint.publicKey,
        destination: associatedToken,
        mintAuthority,
        amount,
        tokenProgram,
        instructionKey: mintToInstructionKey,
    })));
};
//# sourceMappingURL=createMintAndMintToAssociatedTokenBuilder.js.map