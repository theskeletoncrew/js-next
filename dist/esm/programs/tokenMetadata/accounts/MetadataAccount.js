import { Buffer } from 'buffer';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { TokenMetadataProgram } from "./..";
import { Account, Pda } from "../../../shared";
export class MetadataAccount extends Account {
    static async pda(mint) {
        return Pda.find(TokenMetadataProgram.publicKey, [
            Buffer.from('metadata', 'utf8'),
            TokenMetadataProgram.publicKey.toBuffer(),
            mint.toBuffer(),
        ]);
    }
    static fromAccountInfo(accountInfo) {
        return this.parseAccountInfo(accountInfo, Metadata);
    }
}
//# sourceMappingURL=MetadataAccount.js.map