const assert = require('chai').assert;
const { rpcRequest } = require('../requestFactory');
const endpointName = 'files_getMetadata';

describe(endpointName, async function() {
  describe('Passing correct data', async function() {
    let result;

    before(async () => {
      result = await rpcRequest({
        url: endpointName,
        data: { fileId: '40ce0f7e-8fe1-4dcf-b0e4-8026c07abf6a' }
      });
    });

    it('Should return status 200', async function() {
      assert.equal(result.status, 200);
    });

    it('Should contain _downloadURL', async function() {
      const properties = Object.keys(result.data);
      assert.include(properties, '_downloadURL');
    });
  });

  describe('Passing wrong data', async function() {
    let result;

    before(async () => {
      try {
        await rpcRequest({
          url: endpointName,
          data: { fileId: 'noFile' }
        });
      } catch (err) {
        result = err.response;
      }
    });

    it('Should return status 404', async function() {
      assert.equal(result.status, 404);
    });

    it('Should return BlobNotFound', async function() {
      assert.equal(result.data.message.error, 'BlobNotFound');
    });
  });
});
