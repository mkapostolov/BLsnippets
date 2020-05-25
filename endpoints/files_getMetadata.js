// Custom endpoint to retrieve only the metadata
// (as there are no methods in Java SDK to get only the metadata
// without downloading the file itself)
function onRequest(request, response, modules) {
  var context = getContext(modules, request);
  var appKey = context.appKey;
  var baseUrl = context.baseUrl;
  var authString = context.authString;
  var fileId = request.body.fileId;

  var missingError = checkIfPropertyExist('fileId', fileId);
  if (missingError) return sendErrorResponse(missingError, response);

  var requestOptions = {
    uri: 'https://' + baseUrl + '/blob/' + appKey + '/' + fileId,
    headers: { Authorization: authString },
  };

  modules.request
    .getAsync(requestOptions)
    .then(function (rawResponse) {
      return processResponse(rawResponse);
    })
    .then(function success(data) {
      sendSucessResponse(data, response);
    })
    .catch(function (error) {
      sendErrorResponse(error, response, error.status || 500);
    });
}
