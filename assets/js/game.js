// global variables

var listOfWords = ["experience", "moon", "sleet", "mammoth", "store", "colorful", "lovely", "sneaky", "border", "scandalous"];

var numberOfWins = 0;
var numberOfGuesses = 10;

var lettersGuessed = [];

var currentWord = document.getElementById("current-word");

// functions

function displayNewWord() {
    var randomlySelectedWord = listOfWords[Math.floor(Math.random()*listOfWords.length)]
    var wordLength = randomlySelectedWord.length;
    currentWord.innerHTML = randomlySelectedWord;
}

// calls

displayNewWord();

// TO DO
// if successful, delete word from array