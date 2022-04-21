import { createCreateMasterEditionV3Instruction } from '@metaplex-foundation/mpl-token-metadata';
import { TransactionBuilder } from "../../../shared";
export const createMasterEditionV3Builder = (params) => {
    const { maxSupply = null, payer, mintAuthority, updateAuthority, mint, metadata, masterEdition, instructionKey = 'createMasterEditionV3', } = params;
    return TransactionBuilder.make().add({
        instruction: createCreateMasterEditionV3Instruction({
            edition: masterEdition,
            mint,
            updateAuthority: updateAuthority.publicKey,
            mintAuthority: mintAuthority.publicKey,
            payer: payer.publicKey,
            metadata,
        }, { createMasterEditionArgs: { maxSupply } }),
        signers: [payer, mintAuthority, updateAuthority],
        key: instructionKey,
    });
};
//# sourceMappingURL=createMasterEditionV3Builder.js.map