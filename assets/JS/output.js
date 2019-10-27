function checkUserAnwers(event) {
  event.preventDefault();

  var userInputAns;

  var answers = window.localStorage.getItem("storedAnswers");
  var answerArray = answers.split(",");

  for (let i = 0; i < answerArray.length; i++) {
    userInputAns = document.getElementById('userAnswer' + (i + 1));
    actualAnswer = document.getElementById('answerNum' + (i + 1));
    if (userInputAns.value.toLowerCase() == answerArray[i].toLowerCase()) {
      userInputAns.style.borderColor = '1px solid green';
      userInputAns.style.backgroundColor = "#d4ffdd";
      actualAnswer.style.filter = "blur(0px)";
      actualAnswer.style.color = "green";
    } else {
      userInputAns.style.border = '1px solid red';
      userInputAns.style.backgroundColor = "#ffd4d4";
      actualAnswer.style.filter = "blur(0px)";
      actualAnswer.style.color = "red";
    }
  }
}