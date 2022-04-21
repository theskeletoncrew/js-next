import { ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID, } from '@solana/spl-token';
import { TransactionBuilder } from "../../../shared";
export const createAssociatedTokenAccountBuilder = (params) => {
    const { payer, associatedToken, owner, mint, tokenProgram = TOKEN_PROGRAM_ID, associatedTokenProgram = ASSOCIATED_TOKEN_PROGRAM_ID, instructionKey = 'createAssociatedTokenAccount', } = params;
    return TransactionBuilder.make().add({
        instruction: createAssociatedTokenAccountInstruction(payer.publicKey, associatedToken, owner, mint, tokenProgram, associatedTokenProgram),
        signers: [payer],
        key: instructionKey,
    });
};
//# sourceMappingURL=createAssociatedTokenAccountBuilder.js.map