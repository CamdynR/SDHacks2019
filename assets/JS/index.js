// Main JavaScript Page

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-2'; // Region/
AWS.config.credentials = new AWS.Credentials();
AWS.config.credentials.accessKeyId = keyA;
AWS.config.credentials.secretAccessKey = keyS;

var comprehend = new AWS.Comprehend({apiVersion: '2017-11-27'});

function parseText(event) {
  event.preventDefault();

  const userInput = document.getElementById('userInput').value;

  var parseParams = {
    LanguageCode: 'en',
    Text: userInput
  };

  comprehend.detectEntities(parseParams, function (err, data) {
    if (err) console.log(err, err.stack);
    else generateQuiz(userInput, data);
  });
}

function linkUser(event) {
  event.preventDefault();
  window.location.href = 'output.html';
}

function generateQuiz(userInput, data) {
  console.log(data);

  var entries = data['Entities'];
  var toRemove = [];
  var toRemoveKeys = [];

  // Select all 'LOCATION' types from the data
  // Store text and key in data object
  for (key in entries) {
    if (entries[key].Type === 'LOCATION') {
      toRemove.push(entries[key].Text);
      toRemoveKeys.push(key);
    }
  }

  // Generate new paragraph with removed words
  var quizText = '';
  var prevLoc = 0;
  for (let i = 0; i < toRemoveKeys.length; i++) {
    quizText = quizText.concat(userInput.substr(prevLoc, entries[toRemoveKeys[i]].BeginOffset - prevLoc), '(', '' + (i + 1), ') <input name="answer' + (i + 1) + '" id="userAnswer' + (i + 1) + '" type="text" class="userGuess" spellcheck="false" autocomplete="off">');
    prevLoc = entries[toRemoveKeys[i]].EndOffset;
  }

  window.localStorage.clear();
  window.localStorage.setItem("storedQuestions", quizText);
  window.localStorage.setItem("storedAnswers", toRemove);

  window.location.href = 'output.html';
}

function readParagraph() {
  var speechParams = {
    OutputFormat: "mp3",
    SampleRate: "16000",
    Text: "",
    TextType: "text",
    VoiceId: "Matthew"
  };
  speechParams.Text = document.getElementById('generatedUserOutput').value;
  var polly = new AWS.Polly({apiVersion: '2016-06-10'});
  var signer = new AWS.Polly.Presigner(speechParams, polly);

  signer.getSynthesizeSpeechUrl(speechParams, function(error, url) {
    if (error) {
    } else {
        document.getElementById('audioSource').src = url;
        document.getElementById('audioPlayback').load();
    }
  });
}