// global variables

var startButton = document.getElementById("start-button");

var listOfWords = ["experience", "moon", "sleet", "mammoth", "store", "colorful", "lovely", "sneaky", "border", "scandalous"];

var numberOfWins = 0;
var numberOfWinsElement = document.getElementById("number-of-wins");
numberOfWinsElement.textContent = numberOfWins + "/10";

var numberOfGuesses;
var numberOfGuessesElement = document.getElementById("number-of-guesses");

var lettersGuessed;
var lettersGuessedElement = document.getElementById("letters-guessed");

var currentWord;

var displayedWord;
var displayedWordElement = document.getElementById("displayed-word")

var nextWordButton = document.getElementById("next-word-button");

// functions

startButton.onclick = function() {
    startButton.style.display = "none";
    initializeGame();
}

function initializeGame() {
    console.log(listOfWords);
    numberOfGuesses = 10;
    numberOfGuessesElement.textContent = numberOfGuesses;

    lettersGuessed = [];

    currentWord = selectRandomWord();

    displayedWord = convertToUnderscores();
    displayedWordElement.textContent = displayedWord;

    console.log(currentWord);
}

function selectRandomWord() {
    var randomlySelectedWord = listOfWords[Math.floor(Math.random()*listOfWords.length)]
    return randomlySelectedWord;
}

function convertToUnderscores() {
    var underscoredWord = currentWord.replace(/./g, "_");
    return underscoredWord
}

document.onkeyup = playTurn;

function playTurn() {
    var playerGuess = event.key;
    var playerGuessesWrong = true;

    for (var i = 0; i < currentWord.length; i++) {
        if (playerGuess === currentWord[i]) {
            splitWord = displayedWord.split("");
            splitWord[i] = playerGuess;
            displayedWord = splitWord.join("");
            displayedWordElement.textContent = displayedWord;
            playerGuessesWrong = false;
        }
    }

    if (playerGuessesWrong) {
        var playerRepeatsGuess = false;

        for (var i = 0; i < lettersGuessed.length; i++) {
            if (playerGuess === lettersGuessed[i]) {
                console.log("You already guessed this");
                playerRepeatsGuess = true;
            }
        }

        if (playerRepeatsGuess === false) {   
            console.log("Wrong guess");        
            lettersGuessed.push(playerGuess);
            console.log(lettersGuessed);
            lettersGuessedElement.textContent = lettersGuessed;
            numberOfGuesses--;
            numberOfGuessesElement.textContent = numberOfGuesses;
        }
    }

    if (displayedWord === currentWord) {
        numberOfWins++;
        console.log(numberOfWins);
        numberOfWinsElement.textContent = numberOfWins;
        nextWordButton.style.display = "block";
    }

    if (numberOfGuesses === 0) {
        console.log("You lose");
        nextWordButton.style.display = "block";
    }
}

nextWordButton.onclick = function() {
    nextWordButton.style.display = "none";
    playAgain();
}

function playAgain() {
    var wordToDelete = listOfWords.indexOf(currentWord);
    listOfWords.splice(wordToDelete, 1);

    if (listOfWords.length === 0) {
        console.log("you finished all the words");
    } else {
        initializeGame();
    }
}