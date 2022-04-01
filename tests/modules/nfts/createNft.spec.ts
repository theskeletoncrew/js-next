// import { Keypair } from '@solana/web3.js';
// import { UseMethod } from '@metaplex-foundation/mpl-token-metadata';
import { JsonMetadata, MetaplexFile, Metaplex } from '@/index';
import { metaplex, teardownMetaplex } from '../../helpers';

describe('createNft', () => {
  let mx: Metaplex;
  beforeEach(async () => mx = await metaplex());
  afterEach(() => teardownMetaplex(mx));

	it('it can create an NFT with minimum configuration', async () => {
		// Given we uploaded an image.
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
			name: 'On-chain NFT name',
			uri: metadataUri,
		});

		// expect(nft).toMatchObject({
		// 	name: 'On-chain NFT name',
		// });
	
		// Then we created and retrieved the new NFT and it has appropriate defaults.
		// spok(t, nft, {
		// 	$topic: 'nft',
		// 	name: 'On-chain NFT name',
		// 	uri: metadataUri,
		// 	metadata: {
		// 		name: 'JSON NFT name',
		// 		description: 'JSON NFT description',
		// 		image: imageUri,
		// 	},
		// 	sellerFeeBasisPoints: 500,
		// 	primarySaleHappened: false,
		// 	updateAuthority: spokSamePubkey(mx.identity().publicKey),
		// 	creators: [
		// 		{
		// 			address: spokSamePubkey(mx.identity().publicKey),
		// 			share: 100,
		// 			verified: true,
		// 		},
		// 	],
		// 	collection: null,
		// 	uses: null,
		// });
	});
});
