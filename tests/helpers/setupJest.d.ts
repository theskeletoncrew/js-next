import { PublicKey } from "@solana/web3.js";

interface CustomMatchers<R = unknown> {
  toBePublicKey(publicKey?: PublicKey): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}
