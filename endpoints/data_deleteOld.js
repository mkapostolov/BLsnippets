// var sampleBody = { deleteBefore: '2018-02-01' };

function onRequest(request, response, modules) {
  var collection = request.body.collection;
  var before = request.body.deleteBefore;

  var missingError = null;
  missingError = missingError || checkIfPropertyExist('collection', collection);
  missingError = missingError || checkIfPropertyExist('deleteBefore', before);
  if (missingError) return sendErrorResponse(missingError, response);

  var query = request.body.query || {};
  query['_kmd.ect'] = { $lte: before };

  var dataStore = modules.collectionAccess.collection(collection);
  dataStore
    .removeAsync(query)
    .then(function (items) {
      sendSucessResponse(items, response);
    })
    .catch(function (error) {
      sendErrorResponse(error, response);
    });
}
