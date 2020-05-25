// var sampleBody = {
//   title: 'myBook',
//   author: 'myAuthor'
// };

function onRequest(request, response, modules) {
  var collection = request.body.collection;
  var data = request.body.item;

  var missingError = null;
  missingError = missingError || checkIfPropertyExist('collection', collection);
  missingError = missingError || checkIfPropertyExist('item', data);
  if (missingError) return sendErrorResponse(missingError, response);

  var kinveyData = modules.kinvey.entity(data);
  var dataStore = modules.collectionAccess.collection(collection);
  dataStore
    .saveAsync(kinveyData)
    .then(function (item) {
      sendSucessResponse(item, response);
    })
    .catch(function (error) {
      sendErrorResponse(error, response);
    });
}
