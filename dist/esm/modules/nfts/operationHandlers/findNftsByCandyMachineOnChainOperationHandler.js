import { PublicKey } from '@solana/web3.js';
import { findNftsByCreatorOperation } from '../operations';
export const findNftsByCandyMachineOnChainOperationHandler = {
    handle: async (operation, metaplex) => {
        const { candyMachine, version = 2 } = operation.input;
        let firstCreator = candyMachine;
        if (version === 2) {
            // TODO: Refactor when we have a CandyMachine program in the SDK.
            [firstCreator] = await PublicKey.findProgramAddress([Buffer.from('candy_machine'), candyMachine.toBuffer()], new PublicKey('cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ'));
        }
        return metaplex.execute(findNftsByCreatorOperation({
            creator: firstCreator,
            position: 1,
        }));
    },
};
//# sourceMappingURL=findNftsByCandyMachineOnChainOperationHandler.js.map