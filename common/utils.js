function getTime() {
  return new Date();
}

function getContext(modules, request) {
  return {
    baseUrl: request.headers.host,
    appKey: modules.backendContext.getAppKey(),
    appSecret: modules.backendContext.getAppSecret(),
    masterKey: modules.backendContext.getMasterSecret(),
    authString: request.headers.authorization,
    masterAuthString:
      'Kinvey ' +
      modules.utils.base64.encode(
        modules.backendContext.getAppKey() +
          ':' +
          modules.backendContext.getMasterSecret()
      ),
  };
}

// The request module response is returned as an array:
// item0 - the response itself
// item1 - the response body
function processResponse(rawData) {
  var res = rawData[0];
  var body;

  try {
    body = JSON.parse(rawData[1]);
  } catch (err) {
    body = {};
  }

  if (res.status > 399) throw { message: body, status: res.status };

  return body;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function sendSucessResponse(data, response) {
  if (typeof data !== 'object') {
    response.body = { result: data };
  } else {
    response.body = data;
  }

  response.complete();
}

function sendErrorResponse(err, response, statusCode) {
  if (typeof err !== 'object') {
    response.body = { error: err };
  } else {
    response.body = err;
  }

  response.complete(statusCode);
}

function checkIfPropertyExist(name, value) {
  if (!value) {
    error = {
      error: "Missing '" + name + "' property in the request body.",
    };
    return error;
  }
  return null;
}
