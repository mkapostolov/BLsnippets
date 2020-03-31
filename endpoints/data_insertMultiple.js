// var sampleBody = {
//   collection: 'books',
//   items: [
//     { title: 'Sample book 1', author: 'Jonh 1' },
//     { title: 'Sample book 2', author: 'John 2' },
//   ],
// };

function onRequest(request, response, modules) {
  var collection = request.body.collection;
  var items = request.body.items;

  var missingError = null;
  missingError = missingError || checkIfPropertyExist('collection', collection);
  missingError = missingError || checkIfPropertyExist('items', items);
  if (missingError) return sendErrorResponse(missingError, response, 400);

  items.forEach(function (item) {
    item = modules.kinvey.entity(item);
  });

  var dataStore = modules.collectionAccess.collection(collection);
  dataStore
    .insertAsync(items)
    .then(function (items) {
      sendSucessResponse(items, response);
    })
    .catch(function (error) {
      sendErrorResponse(error, response, 400);
    });
}
