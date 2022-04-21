import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { TokenProgramGpaBuilder } from './gpaBuilders';
export const TokenProgram = {
    publicKey: TOKEN_PROGRAM_ID,
    accounts(connection) {
        return new TokenProgramGpaBuilder(connection, this.publicKey);
    },
    mintAccounts(connection) {
        return this.accounts(connection).mintAccounts();
    },
    tokenAccounts(connection) {
        return this.accounts(connection).tokenAccounts();
    },
};
//# sourceMappingURL=TokenProgram.js.map