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
<<<<<<< HEAD
  for(let i = 0; i < toRemoveKeys.length; i++) {
    quizText = quizText.concat(userInput.substr(prevLoc, entries[toRemoveKeys[i]].BeginOffset - prevLoc), '(', ''+(i+1), ')<input type="text" class="userGuess" spellcheck="false">');
=======
  for (let i = 0; i < toRemoveKeys.length; i++) {
    quizText = quizText.concat(userInput.substr(prevLoc, entries[toRemoveKeys[i]].BeginOffset - prevLoc), '(', '' + (i + 1), ') <input type="text" class="userGuess" spellcheck="false">');
>>>>>>> db83b259331f1fade4442b4a55f6040b8f9bf4dc
    prevLoc = entries[toRemoveKeys[i]].EndOffset;
  }

  // var returnObject = { "Questions": quizText, "Answers": toRemove };

  window.localStorage.setItem("storedQuestions", quizText);
  window.localStorage.setItem("storedAnswers", toRemove);

  window.location.href = 'output.html';
}