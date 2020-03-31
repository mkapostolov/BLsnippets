const assert = require('chai').assert;
const { rpcRequest } = require('../requestFactory');
const { collectionRequestMaster } = require('../requestFactory');
const endpointName = 'data_deleteOld';

const deleteBeforeDate = '2018-02-01';

async function createItems() {
  let promises = [];

  for (var i = 0; i < 2; i++) {
    promises.push(
      collectionRequestMaster({
        method: 'POST',
        url: 'books',
        data: {
          title: `Item to be deleted ${i}`,
          _kmd: {
            lmt: deleteBeforeDate,
            ect: deleteBeforeDate,
          },
        },
      })
    );
  }

  await Promise.all(promises);
}

describe(endpointName, async function () {
  describe('Passing correct data', async function () {
    let result;

    before(async () => {
      await createItems();

      result = await rpcRequest({
        url: endpointName,
        data: { collection: 'books', deleteBefore: deleteBeforeDate },
      });
    });

    it('Should return status 200', async function () {
      assert.equal(result.status, 200);
    });

    it('Should remove 2 items', async function () {
      assert.equal(result.data.result, 2);
    });
  });

  describe('Passing wrong data', async function () {
    describe('No collection property', async function () {
      let result;

      before(async () => {
        try {
          await rpcRequest({
            url: endpointName,
            data: { NOcollection: 'books', deleteBefore: deleteBeforeDate },
          });
        } catch (err) {
          result = err.response;
        }
      });

      it('Should return status 400', async function () {
        assert.equal(result.status, 400);
      });

      it('Should return missing property', async function () {
        assert.equal(
          result.data.error,
          'Missing "collection" property in the request body.'
        );
      });
    });

    describe('No deleteBefore property', async function () {
      let result;

      before(async () => {
        try {
          await rpcRequest({
            url: endpointName,
            data: { collection: 'books', NOdeleteBefore: deleteBeforeDate },
          });
        } catch (err) {
          result = err.response;
        }
      });

      it('Should return status 400', async function () {
        assert.equal(result.status, 400);
      });

      it('Should return missing property', async function () {
        assert.equal(
          result.data.error,
          'Missing "deleteBefore" property in the request body.'
        );
      });
    });
  });
});
