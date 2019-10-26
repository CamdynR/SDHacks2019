// Main JavaScript Page

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-2'; // Region/
AWS.config.credentials = new AWS.Credentials();
AWS.config.credentials.accessKeyId = keyA;
AWS.config.credentials.secretAccessKey = keyS;

var comprehend = new AWS.Comprehend({ apiVersion: '2017-11-27' });

function parseText(event) {
  event.preventDefault();

  const userInput = document.getElementById('userInput').value;

  var parseParams = {
    LanguageCode: 'en',
    Text: userInput
  };

  comprehend.detectKeyPhrases(parseParams, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
}

function linkUser(event) {
  event.preventDefault();
  window.location.href = 'output.html';
}