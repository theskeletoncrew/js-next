import { PublicKey } from '@solana/web3.js';
export class Pda extends PublicKey {
    constructor(value, bump) {
        super(value);
        this.bump = bump;
    }
    static async find(programId, seeds) {
        return this.fromPromise(PublicKey.findProgramAddress(seeds, programId));
    }
    static async fromPromise(promise) {
        const [publicKey, bump] = await promise;
        return new Pda(publicKey, bump);
    }
}
//# sourceMappingURL=Pda.js.map