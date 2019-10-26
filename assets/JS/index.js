// Main JavaScript Page

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-2'; // Region/
AWS.config.credentials = new AWS.Credentials();
AWS.config.credentials.accessKeyId = keyA;
AWS.config.credentials.secretAccessKey = keyS;

var comprehend = new AWS.Comprehend({ apiVersion: '2017-11-27' });

function parseText(event) {
  event.preventDefault();

  var parseParams = {
    LanguageCode: 'en',
    Text: 'My name is Camdyn'
  };
  comprehend.detectKeyPhrases(parseParams, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
}