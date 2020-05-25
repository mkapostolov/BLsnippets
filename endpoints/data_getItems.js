// Fetch items from a collection
// Documentation - https://devcenter.kinvey.com/rest/reference/business-logic/reference.html#collection-access-module

// var sampleBody = {
//   collection: 'books', // mandatory
//   query: { '_kmd.lmt': { $gte: '2019-12-05' } }, // optional
//   limit: 0, // optional
//   skip: 0, // optional
//   fields: [], // optional
//   sort: {} // optional
// };

function onRequest(request, response, modules) {
  var body = request.body;
  var collection = body.collection;

  var missingError = checkIfPropertyExist('collection', collection);
  if (missingError) return sendErrorResponse(missingError, response);

  var query = body.query || {};
  var options = {
    limit: body.limit,
    skip: body.skip,
    fields: body.fields,
    sort: body.sort,
  };

  var dataStore = modules.collectionAccess.collection(collection);
  dataStore
    .findAsync(query, options)
    .then(function (items) {
      sendSucessResponse(items, response);
    })
    .catch(function (error) {
      sendErrorResponse(error, response);
    });
}
