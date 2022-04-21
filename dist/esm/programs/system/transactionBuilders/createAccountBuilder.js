import { SystemProgram } from '@solana/web3.js';
import { TransactionBuilder } from "../../../shared";
export const createAccountBuilder = (params) => {
    const { space, lamports, payer, newAccount, program = SystemProgram.programId, instructionKey = 'createAccount', } = params;
    return TransactionBuilder.make().add({
        instruction: SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: newAccount.publicKey,
            space,
            lamports,
            programId: program,
        }),
        signers: [payer, newAccount],
        key: instructionKey,
    });
};
//# sourceMappingURL=createAccountBuilder.js.map