const assert = require('chai').assert;
const { rpcRequest, collectionRequestMaster } = require('../requestFactory');
const endpointName = 'data_insertMultiple';

describe(endpointName, async function () {
  describe('Passing correct data', async function () {
    let result;

    before(async () => {
      const body = {
        collection: 'books',
        items: [{ title: 'title100' }, { title: 'title101' }],
      };
      result = await rpcRequest({
        url: endpointName,
        data: body,
      });
    });

    after(async () => {
      for (const item of result.data) {
        await collectionRequestMaster({
          method: 'DELETE',
          url: `books/${item._id}`,
        });
      }
    });

    it('Should return status 200', async function () {
      assert.equal(result.status, 200);
    });

    it('Should contain 2 items', async function () {
      assert.equal(result.data.length, 2);
    });
  });
});
