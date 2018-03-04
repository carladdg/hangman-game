// global variables

var startButton = document.getElementById("start-button");
var gameContainer = document.getElementById("game-container");

var listOfWords = [
    "get out",
    "moonlight",
    "spotlight",
    "birdman",
    "twelve years a slave",
    "argo",
    "the artist",
    "the king's speech",
    "the hurt locker",
    "slumdog millionaire"
];

var listOfImages = [
    "/Users/Carla/code/week3/hangman-game/assets/img/get-out.jpg",
    "/Users/Carla/code/week3/hangman-game/assets/img/moonlight.jpg",
    "/Users/Carla/code/week3/hangman-game/assets/img/spotlight.jpg",
    "/Users/Carla/code/week3/hangman-game/assets/img/birdman.jpg",
    "/Users/Carla/code/week3/hangman-game/assets/img/twelve-years.png",
    "/Users/Carla/code/week3/hangman-game/assets/img/argo.jpg",
    "/Users/Carla/code/week3/hangman-game/assets/img/the-artist.jpg",
    "/Users/Carla/code/week3/hangman-game/assets/img/kings-speech.jpg",
    "/Users/Carla/code/week3/hangman-game/assets/img/hurt-locker.jpg",
    "/Users/Carla/code/week3/hangman-game/assets/img/slumdog-millionaire.jpeg"
]

var numberOfWins = 0;
var numberOfWinsElement = document.getElementById("number-of-wins");
numberOfWinsElement.textContent = numberOfWins + "/10";

var numberOfGuesses;
var numberOfGuessesElement = document.getElementById("number-of-guesses");

var lettersGuessed;
var lettersGuessedElement = document.getElementById("letters-guessed");

var currentWord;

var displayedWord;
var displayedWordElement = document.getElementById("displayed-word");

var resultElement = document.getElementById("result");

var currentImage;
var pictureOfWordElement = document.getElementById("picture-of-word");

var nextWordButton = document.getElementById("next-word-button");

// functions

startButton.onclick = function() {
    startButton.style.display = "none";
    gameContainer.style.display = "block";
    initializeGame();
}

function initializeGame() {
    numberOfGuesses = 10;
    numberOfGuessesElement.textContent = numberOfGuesses;

    lettersGuessed = [];
    lettersGuessedElement.textContent = lettersGuessed;

    currentWord = selectRandomWord();

    displayedWord = convertToUnderscores();
    displayedWordElement.textContent = displayedWord;

    currentImage = listOfImages[listOfWords.indexOf(currentWord)];
    pictureOfWordElement.src = currentImage;
    pictureOfWordElement.style.display = "none";

    resultElement.textContent = "";
}

function selectRandomWord() {
    var randomlySelectedWord = listOfWords[Math.floor(Math.random()*listOfWords.length)]
    return randomlySelectedWord;
}

function convertToUnderscores() {
    var underscoredWord = currentWord.replace(/[a-z]/g, "_");
    return underscoredWord
}

document.onkeyup = playTurn;

function playTurn() {
    var playerGuess = event.key;
    var playerGuessesWrong = true;

    if ((playerGuess.length > 1) || (!/[a-z]/.test(playerGuess))) {
        return;
    }

    for (var i = 0; i < currentWord.length; i++) {
        if (playerGuess === currentWord[i]) {
            splitWord = displayedWord.split("");
            splitWord[i] = playerGuess;
            displayedWord = splitWord.join("");
            displayedWordElement.textContent = displayedWord.toUpperCase();
            playerGuessesWrong = false;
        }
    }

    if (playerGuessesWrong) {
        var playerRepeatsGuess = false;

        for (var i = 0; i < lettersGuessed.length; i++) {
            if (playerGuess === lettersGuessed[i]) {
                playerRepeatsGuess = true;
            }
        }

        if (playerRepeatsGuess === false) {   
            lettersGuessed.push(playerGuess);
            var formattedLettersGuessed = lettersGuessed.join(", ");
            lettersGuessedElement.textContent = formattedLettersGuessed.toUpperCase();
            numberOfGuesses--;
            numberOfGuessesElement.textContent = numberOfGuesses;
        }
    }

    if (displayedWord === currentWord) {
        numberOfWins++;
        numberOfWinsElement.textContent = numberOfWins + "/10";
        resultElement.textContent = "You got it!";
        pictureOfWordElement.style.display = "block";
        deleteWordFromList();
        checkStatusOfGame();
    }

    if (numberOfGuesses === 0) {
        displayedWordElement.textContent = currentWord.toUpperCase();
        resultElement.textContent = "Better luck next time.";
        deleteWordFromList();
        checkStatusOfGame();
    }
}

function deleteWordFromList() {
    var wordToDelete = listOfWords.indexOf(currentWord);
    listOfWords.splice(wordToDelete, 1);

    var pictureToDelete = listOfImages.indexOf(currentImage);
    listOfImages.splice(pictureToDelete, 1);
}

function checkStatusOfGame() {
    if (listOfWords.length > 0) {
        nextWordButton.style.display = "block";
    } 
    else {
        resultElement.textContent = resultElement.textContent + " Thanks for playing!";
    }
}

nextWordButton.onclick = function() {
    nextWordButton.style.display = "none";
    initializeGame();
}

// function initializeGame() {
//     if (listOfWords.length === 0) {
//         console.log("you finished all the words");
//     } else {
//         initializeGame();
//     }
// }