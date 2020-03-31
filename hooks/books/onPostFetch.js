// Return number of itmes mathing the passed fileter as a header

function onPostFetch(request, response, modules) {
  var countNeeded = request.headers['x-kinvey-include-items-count'] == 'true';
  if (!countNeeded) return response.continue();

  var query = {};
  if (request.params.query) {
    query = JSON.parse(request.params.query);
  }

  var dataStore = modules.collectionAccess.collection(request.collectionName);
  dataStore
    .countAsync(query)
    .then(function(itemCount) {
      response.headers['x-kinvey-items-count'] = itemCount;
      response.continue();
    })
    .catch(function(error) {
      response.headers['x-kinvey-items-count'] = -1;
      response.headers['x-kinvey-items-count-error'] = error.message;
      response.continue();
    });
}
