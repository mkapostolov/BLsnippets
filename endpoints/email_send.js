// var sampleRequest = {
//   from: 'sample@example.com',
//   to: 'example@some.com',
//   subject: 'Welcome to my app!',
//   textBody: 'You been invited to join my app.'
// };

function onRequest(request, response, modules) {
  var from = request.body.from;
  var to = request.body.to;
  var subject = request.body.subject;
  var textBody = request.body.textBody;

  var missingError = null;
  missingError = missingError || checkIfPropertyExist('from', from);
  missingError = missingError || checkIfPropertyExist('to', to);
  missingError = missingError || checkIfPropertyExist('subject', subject);
  missingError = missingError || checkIfPropertyExist('textBody', textBody);
  if (missingError) return sendErrorResponse(missingError, response);

  var email = modules.email;
  email.send(from, to, subject, textBody, function (err, result) {
    if (err) {
      return sendErrorResponse(err, response);
    }

    sendSucessResponse(result, response);
  });
}
