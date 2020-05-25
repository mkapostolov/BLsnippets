/ requires utils.processResponse()
// requires utils.getContext()
function onRequest(request, response, modules) {
  var imageString = request.body.image;
  var mimeType = request.body.mimeType;
  var fileName = request.body.fileName;
  var isPublic = request.body.public;

  //Convert Base64 string to buffer
  var binaryFile = new Buffer(imageString, 'base64');
  var context = getContext(modules, request);
  var fileMetadata = {
    _filename: fileName,
    _public: isPublic,
    mimeType: mimeType,
    size: binaryFile.length,
  };

  uploadToKinvey(fileMetadata, modules, context)
    .then(function (kinveyResult) {
      var fileData = processResponse(kinveyResult);
      return uploadToGCS(fileData, binaryFile, modules);
    })
    .then(function (gcsResult) {
      return processResponse(gcsResult);
    })
    .then(function success() {
      sendSucessResponse('successfully uploaded file', response);
    })
    .catch(function (err) {
      sendErrorResponse(err, response);
    });
}

function uploadToKinvey(fileMetaData, modules, context) {
  var url =
    'https://' + context.baseUrl + '/blob/' + context.appKey + '?tls=true';

  var kinveyRequestOptions = {
    uri: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: context.authString,
      'X-Kinvey-Content-Type': fileMetaData.mimeType,
    },
    body: JSON.stringify(fileMetaData),
  };

  return modules.request.requestAsync(kinveyRequestOptions);
}

function uploadToGCS(fileData, binaryFile, modules) {
  var requiredHeaders = fileData._requiredHeaders;
  requiredHeaders['Content-Length'] = binaryFile.length;
  requiredHeaders['Content-Type'] = fileData.mimeType;

  var gcsRequestOptions = {
    uri: fileData._uploadURL,
    method: 'PUT',
    headers: requiredHeaders,
    body: binaryFile,
  };

  return modules.request.requestAsync(gcsRequestOptions);
}
