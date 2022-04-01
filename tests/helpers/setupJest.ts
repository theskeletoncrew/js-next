import { PublicKey } from "@solana/web3.js";

const expectation = (condition: boolean, notExpected: () => string, expected: () => string) => {
  return condition
    ? ({ pass: true, message: notExpected })
    : ({ pass: false, message: expected });
}

expect.extend({
  toBePublicKey(received, publicKey: any = undefined) {
    if (publicKey === undefined) {
      return expectation(
        received instanceof PublicKey,
        () => `Expected ${received} not to be a PublicKey`,
        () => `Expected ${received} to be a PublicKey`,
      );
    }

    if (!(publicKey instanceof PublicKey)) {
      throw new Error('Expected provided publicKey to be a PublicKey');
    }

    return expectation(
      received instanceof PublicKey && received.equals(publicKey),
      () => `Expected ${received} not to be a PublicKey`,
      () => `Expected ${received} to be a PublicKey`,
    );
  }
});
