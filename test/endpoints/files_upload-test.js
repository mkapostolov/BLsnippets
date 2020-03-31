const assert = require('chai').assert;
const { imageString } = require('./imageInBase64');
const { rpcRequest } = require('../requestFactory');
const endpointName = 'files_upload';

describe(endpointName, async function() {
  describe('Passing correct data', async function() {
    let result;

    before(async () => {
      result = await rpcRequest({
        url: endpointName,
        data: {
          image: imageString,
          public: true,
          fileName: 'sample.png',
          mimeType: 'image/png'
        }
      });
    });

    it('Should return status 200', async function() {
      assert.equal(result.status, 200);
    });

    it('Should contain success', async function() {
      assert.equal(result.data.result, 'successfully uploaded file');
    });
  });
});
