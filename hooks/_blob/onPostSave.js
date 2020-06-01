// requires utils.getContext()
// requires utils.processResponse()

// This hook gets the _donwloadUrl of a just uploaded file and sends it as an email

function onPostSave(request, response, modules) {
  var context = getContext(modules, request);
  var fileId = request.body._id;

  getFileMetadata(fileId, modules, context)
    .then(function (rawResponse) {
      return processResponse(rawResponse);
    })
    .then(function (fileMetadata) {
      var fileDetails = response.body;
      fileDetails._downloadURL = fileMetadata._downloadURL;

      var from = 'sender@sample.com';
      var to = 'matioa@gmail.com';
      var subject = 'Uploaded file notification';
      var textBody = 'A file has just been uploaded.\n';
      textBody += JSON.stringify(fileDetails);
      modules.email.send(from, to, subject, textBody);

      response.continue();
    })
    .catch(function (err) {
      sendErrorResponse(err, response);
    });
}

function getFileMetadata(fileId, modules, context) {
  var UrlExpiration = 24 * 3600;
  var url =
    'https://' +
    context.baseUrl +
    '/blob/' +
    context.appKey +
    '/' +
    fileId +
    '?tls=true&ttl_in_seconds=' +
    UrlExpiration;

  var kinveyRequestOptions = {
    uri: url,
    method: 'GET',
    headers: {
      Authorization: context.authString,
    },
  };

  return modules.request.requestAsync(kinveyRequestOptions);
}
