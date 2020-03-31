const assert = require('chai').assert;
const { rpcRequest, collectionRequestMaster } = require('../requestFactory');
const endpointName = 'data_partialUpdate';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

describe(endpointName, async function () {
  describe('Passing correct data', async function () {
    let result;
    let updatedItem;

    before(async () => {
      const number = getRandomInt(100);
      const itemId = '5de77a0fd086db0017d4672f';

      const requestBody = {
        collection: 'books',
        update: { author: `François Rabelais ${number}` },
        query: { title: 'Hunger' },
      };

      result = await rpcRequest({
        url: endpointName,
        data: requestBody,
      });

      updatedItem = await collectionRequestMaster({
        method: 'GET',
        url: `books/${itemId}`,
      });
    });

    it('Should return status 200', async function () {
      assert.equal(result.status, 200);
    });

    it('Should update 1 item', async function () {
      assert.equal(result.data.result, 1);
    });

    it('Should have other properties unupdated', async function () {
      assert.equal(updatedItem.data.country, 'France');
    });
  });
});
