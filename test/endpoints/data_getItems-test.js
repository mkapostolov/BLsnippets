const assert = require('chai').assert;
const { rpcRequest } = require('../requestFactory');
const endpointName = 'data_getItems';

describe(endpointName, function () {
  describe('With no parameters', function () {
    let result;
    let resultError;

    before(async () => {
      result = await rpcRequest({
        url: endpointName,
        data: { collection: 'books' },
      });

      try {
        await rpcRequest({ url: endpointName, data: {} });
      } catch (err) {
        resultError = err.response;
      }
    });

    it('Should return 200', function () {
      assert.equal(result.status, 200);
    });

    it('Should return an array', function () {
      assert.isArray(result.data);
    });

    it('Should return an error if no collection is passed', function () {
      assert.equal(
        resultError.data.error,
        `Missing 'collection' property in the request body.`
      );
    });
  });

  describe('With limit', async function () {
    it('Should return 1 item', async function () {
      const result = await rpcRequest({
        url: endpointName,
        data: { collection: 'books', limit: 1 },
      });

      assert.equal(result.data.length, 1);
    });
  });

  describe('With fields', async function () {
    it('Should return 3 fields when using fields=[title, author]', async function () {
      const result = await rpcRequest({
        url: endpointName,
        data: { collection: 'books', limit: 1, fields: ['title', 'author'] },
      });

      var fieldsCount = Object.keys(result.data[0]).length;
      assert.equal(fieldsCount, 3);
    });
  });

  describe('With filter', async function () {
    it('Should return 1 item when filtered by title', async function () {
      const result = await rpcRequest({
        url: endpointName,
        data: {
          collection: 'books',
          query: { title: 'Hunger' },
        },
      });

      assert.equal(result.data.length, 1);
    });

    it.skip('Should return 1 item when filtered by _id', async function () {
      const result = await rpcRequest({
        url: endpointName,
        data: {
          collection: 'books',
          query: { _id: '5de77a0fd086db0017d4672f' },
        },
      });

      assert.equal(result.data.length, 1);
    });
  });
});
