// global variables

var listOfWords = ["experience", "moon", "sleet", "mammoth", "store", "colorful", "lovely", "sneaky", "border", "scandalous"];

var numberOfWins = 0;
var numberOfGuesses = 10;

var lettersGuessed = [];

var currentWord = selectRandomWord();
var displayedWord = convertToUnderscores();

// functions

function selectRandomWord() {
    var randomlySelectedWord = listOfWords[Math.floor(Math.random()*listOfWords.length)]
    return randomlySelectedWord;
}

function convertToUnderscores() {
    var underscoredWord = currentWord.replace(/./g, "_ ");
    return underscoredWord
}

function replaceWord() {

}

// calls

selectRandomWord();
console.log(currentWord);

convertToUnderscores();
console.log(displayedWord);

// TO DO
// if successful, delete word from array