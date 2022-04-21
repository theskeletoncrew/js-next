import { Buffer } from 'buffer';
import { MasterEditionV1, MasterEditionV2, Key } from '@metaplex-foundation/mpl-token-metadata';
import { TokenMetadataProgram } from "./..";
import { Account, Pda } from "../../../shared";
export class MasterEditionAccount extends Account {
    static async pda(mint) {
        return Pda.find(TokenMetadataProgram.publicKey, [
            Buffer.from('metadata', 'utf8'),
            TokenMetadataProgram.publicKey.toBuffer(),
            mint.toBuffer(),
            Buffer.from('edition', 'utf8'),
        ]);
    }
    static fromAccountInfo(accountInfo) {
        if (accountInfo.data?.[0] === Key.MasterEditionV1) {
            return this.parseAccountInfo(accountInfo, MasterEditionV1);
        }
        return this.parseAccountInfo(accountInfo, MasterEditionV2);
    }
}
//# sourceMappingURL=MasterEditionAccount.js.map