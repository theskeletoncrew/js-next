import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { awsStorage } from '@/drivers/storage/awsStorageDriver';
import { MetaplexFile } from '@/drivers/filesystem';
import { metaplex, teardownMetaplex } from '../../helpers';
import { Metaplex } from '@/Metaplex';

const awsClient = {
  async send() {
    return {}
  },
  config: {
    async region() {
      return 'us-east';
    }
  }
} as unknown as S3Client;

describe('AwsStorageDriver', () => {
  let mx: Metaplex;
  beforeEach(async () => mx = await metaplex());
  afterEach(() => teardownMetaplex(mx));

  it('it can upload assets to a S3 bucket', async () => {
    // Given a mock awsClient.
    const spy = jest.spyOn(awsClient, 'send');
  
    // Fed to a Metaplex instance.
    mx.use(awsStorage(awsClient, 'some-bucket'));
  
    // When we upload some content to AWS S3.
    const file = new MetaplexFile('some-image', 'some-image.jpg', { uniqueName: 'some-key' });
    const uri = await mx.storage().upload(file);
  
    // Then we get the URL of the uploaded asset.
    expect(uri).toEqual('https://s3.us-east.amazonaws.com/some-bucket/some-key');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.any(PutObjectCommand));
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      input: expect.objectContaining({
        Bucket: 'some-bucket',
        Key: 'some-key',
        Body: expect.any(Buffer),
      })
    }));
  });
});
