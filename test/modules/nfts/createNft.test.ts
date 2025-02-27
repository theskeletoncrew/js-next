import test, { Test } from 'tape';
import spok, { Specifications } from 'spok';
import { Keypair } from '@solana/web3.js';
import { UseMethod } from '@metaplex-foundation/mpl-token-metadata';
import { JsonMetadata, MetaplexFile, Nft } from '@/index';
import { metaplex, spokSamePubkey, spokSameBignum, killStuckProcess } from '../../helpers';

killStuckProcess();

test('it can create an NFT with minimum configuration', async (t: Test) => {
  // Given we have a Metaplex instance.
  const mx = await metaplex();

  // And we uploaded an image.
  const imageFile = new MetaplexFile('some_image', 'some-image.jpg');
  const imageUri = await mx.storage().upload(imageFile);

  // And we uploaded some metadata containing this image.
  const metadataUri = await mx.storage().uploadJson<JsonMetadata>({
    name: 'JSON NFT name',
    description: 'JSON NFT description',
    image: imageUri,
  });

  // When we create a new NFT with minimum configuration.
  const { nft } = await mx.nfts().createNft({
    uri: metadataUri,
    name: 'On-chain NFT name',
  });

  // Then we created and returned the new NFT and it has appropriate defaults.
  const expectedNft = {
    name: 'On-chain NFT name',
    uri: metadataUri,
    metadata: {
      name: 'JSON NFT name',
      description: 'JSON NFT description',
      image: imageUri,
    },
    sellerFeeBasisPoints: 500,
    primarySaleHappened: false,
    updateAuthority: spokSamePubkey(mx.identity().publicKey),
    creators: [
      {
        address: spokSamePubkey(mx.identity().publicKey),
        share: 100,
        verified: true,
      },
    ],
    collection: null,
    uses: null,
  } as unknown as Specifications<Nft>;
  spok(t, nft, { $topic: 'nft', ...expectedNft });

  // When we then retrieve that NFT.
  const retrievedNft = await mx.nfts().findNftByMint(nft.mint);

  // Then it matches what createNft returned.
  spok(t, retrievedNft, { $topic: 'Retrieved Nft', ...expectedNft });
});

test('it can create an NFT with maximum configuration', async (t: Test) => {
  // Given we have a Metaplex instance.
  const mx = await metaplex();

  // And we uploaded some metadata.
  const { uri, metadata } = await mx.nfts().uploadMetadata({
    name: 'JSON NFT name',
    description: 'JSON NFT description',
    image: new MetaplexFile('some_image', 'some-image.jpg'),
  });

  // And a various keypairs for different access.
  const mint = Keypair.generate();
  const collection = Keypair.generate();
  const owner = Keypair.generate();
  const mintAuthority = Keypair.generate();
  const updateAuthority = Keypair.generate();
  const otherCreator = Keypair.generate();

  // When we create a new NFT with minimum configuration.
  const { nft } = await mx.nfts().createNft({
    uri,
    name: 'On-chain NFT name',
    symbol: 'MYNFT',
    sellerFeeBasisPoints: 456,
    isMutable: true,
    maxSupply: 123,
    mint: mint,
    payer: mx.identity(),
    mintAuthority: mintAuthority,
    updateAuthority: updateAuthority,
    owner: owner.publicKey,
    // Must be the same as mint authority.
    // https://github.com/metaplex-foundation/metaplex-program-library/blob/c0bf49d416d6aaf5aa9db999343b20be720df67a/token-metadata/program/src/utils.rs#L346
    freezeAuthority: mintAuthority.publicKey,
    collection: {
      verified: false,
      key: collection.publicKey,
    },
    uses: {
      useMethod: UseMethod.Burn,
      remaining: 0,
      total: 1000,
    },
    creators: [
      {
        address: updateAuthority.publicKey,
        share: 60,
        verified: true,
      },
      {
        address: otherCreator.publicKey,
        share: 40,
        verified: false,
      },
    ],
  });

  // Then we created and retrieved the new NFT and it has appropriate defaults.
  spok(t, nft, {
    $topic: 'nft',
    name: 'On-chain NFT name',
    uri: spok.string,
    metadata: {
      name: 'JSON NFT name',
      description: 'JSON NFT description',
      image: metadata.image,
    },
    sellerFeeBasisPoints: 456,
    primarySaleHappened: false,
    updateAuthority: spokSamePubkey(updateAuthority.publicKey),
    collection: {
      verified: false,
      key: spokSamePubkey(collection.publicKey),
    },
    uses: {
      useMethod: UseMethod.Burn,
      remaining: spokSameBignum(0),
      total: spokSameBignum(1000),
    },
    creators: [
      {
        address: spokSamePubkey(updateAuthority.publicKey),
        share: 60,
        verified: true,
      },
      {
        address: spokSamePubkey(otherCreator.publicKey),
        share: 40,
        verified: false,
      },
    ],
  } as unknown as Specifications<Nft>);
});

test('it fill missing on-chain data from the JSON metadata', async (t: Test) => {
  // Given we have a Metaplex instance.
  const mx = await metaplex();

  // And we uploaded some metadata.
  const creatorA = Keypair.generate().publicKey;
  const creatorB = Keypair.generate().publicKey;
  const { uri, metadata } = await mx.nfts().uploadMetadata({
    name: 'JSON NFT name',
    symbol: 'MYNFT',
    description: 'JSON NFT description',
    image: new MetaplexFile('some_image', 'some-image.jpg'),
    seller_fee_basis_points: 456,
    properties: {
      creators: [
        {
          address: mx.identity().publicKey.toBase58(),
          share: 50,
        },
        {
          address: creatorA.toBase58(),
          share: 30,
        },
        {
          address: creatorB.toBase58(),
          share: 20,
        },
      ],
    },
  });

  // When we create a new NFT using that JSON metadata only.
  const { nft } = await mx.nfts().createNft({ uri });

  // Then the created NFT used some of the JSON metadata to fill some on-chain data.
  spok(t, nft, {
    $topic: 'nft',
    name: 'JSON NFT name',
    symbol: 'MYNFT',
    uri,
    metadata,
    sellerFeeBasisPoints: 456,
    creators: [
      {
        address: spokSamePubkey(mx.identity().publicKey),
        share: 50,
        verified: true,
      },
      {
        address: spokSamePubkey(creatorA),
        share: 30,
        verified: false,
      },
      {
        address: spokSamePubkey(creatorB),
        share: 20,
        verified: false,
      },
    ],
  } as unknown as Specifications<Nft>);
});
