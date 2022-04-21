import { createMintAndMintToAssociatedTokenBuilder } from "../../../programs/token";
import { createMetadataV2Builder, createMasterEditionV3Builder } from "../../../programs/tokenMetadata";
import { TransactionBuilder } from "../../../shared";
export const createNftBuilder = (params) => {
    const { lamports, data, isMutable, maxSupply, mint, payer, mintAuthority, updateAuthority = mintAuthority, owner, associatedToken, freezeAuthority, metadata, masterEdition, tokenProgram, associatedTokenProgram, createAccountInstructionKey, initializeMintInstructionKey, createAssociatedTokenInstructionKey, mintToInstructionKey, createMetadataInstructionKey, createMasterEditionInstructionKey, } = params;
    return (TransactionBuilder.make()
        // Create the mint account and send one token to the holder.
        .add(createMintAndMintToAssociatedTokenBuilder({
        lamports,
        decimals: 0,
        amount: 1,
        createAssociatedToken: true,
        mint,
        payer,
        mintAuthority,
        owner,
        associatedToken,
        freezeAuthority,
        tokenProgram,
        associatedTokenProgram,
        createAccountInstructionKey,
        initializeMintInstructionKey,
        createAssociatedTokenInstructionKey,
        mintToInstructionKey,
    }))
        // Create metadata account.
        .add(createMetadataV2Builder({
        data,
        isMutable,
        mintAuthority,
        payer,
        mint: mint.publicKey,
        metadata,
        updateAuthority: updateAuthority.publicKey,
        instructionKey: createMetadataInstructionKey,
    }))
        // Create master edition account (prevents further minting).
        .add(createMasterEditionV3Builder({
        maxSupply,
        payer,
        mintAuthority,
        updateAuthority,
        mint: mint.publicKey,
        metadata,
        masterEdition,
        instructionKey: createMasterEditionInstructionKey,
    })));
};
//# sourceMappingURL=createNftBuilder.js.map