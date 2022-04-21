import { createCreateMetadataAccountV2Instruction, } from '@metaplex-foundation/mpl-token-metadata';
import { TransactionBuilder } from "../../../shared";
export const createMetadataV2Builder = (params) => {
    const { data, isMutable = false, mintAuthority, payer, mint, metadata, updateAuthority, instructionKey = 'createMetadataV2', } = params;
    return TransactionBuilder.make().add({
        instruction: createCreateMetadataAccountV2Instruction({
            metadata,
            mint,
            mintAuthority: mintAuthority.publicKey,
            payer: payer.publicKey,
            updateAuthority,
        }, { createMetadataAccountArgsV2: { data, isMutable } }),
        signers: [payer, mintAuthority],
        key: instructionKey,
    });
};
//# sourceMappingURL=createMetadataV2Builder.js.map