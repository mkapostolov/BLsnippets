// var sampleBody = {
//   collection: 'books',
//   update: [
//     { title: 'Sample book 1 updated' },
//     { title: 'Sample book 2 updated' },
//   ],
//   query:{ '_kmd.lmt': { $gte: '2020-04-01' } }
// };

function onRequest(request, response, modules) {
  var collection = request.body.collection;
  var update = request.body.update;

  var missingError = null;
  missingError = missingError || checkIfPropertyExist('collection', collection);
  missingError = missingError || checkIfPropertyExist('update', update);
  if (missingError) return sendErrorResponse(missingError, response);

  var query = request.body.query || {};
  update._kmd = { lmt: new Date() };
  var updateData = { $set: update };

  var dataStore = modules.collectionAccess.collection(collection);
  dataStore
    .updateAsync(query, updateData)
    .then(function (item) {
      sendSucessResponse(item, response);
    })
    .catch(function (error) {
      sendErrorResponse(error, response);
    });
}
