// global variables

var startButton = document.getElementById("start-button");
var gameContainer = document.getElementById("game-container");

var listOfMovies = [
    {
        "name": "get out",
        "image": "./assets/img/get-out.jpg",
        "year": 2018
    },
    {
        "name": "moonlight",
        "image": "./assets/img/moonlight.jpg",
        "year": 2017
    },
    {
        "name": "spotlight",
        "image": "./assets/img/spotlight.jpg",
        "year": 2016
    },
    {
        "name": "birdman",
        "image": "./assets/img/birdman.jpg",
        "year": 2015
    },
    {
        "name": "twelve years a slave",
        "image": "./assets/img/twelve-years.png",
        "year": 2014
    },
    {
        "name": "argo",
        "image": "./assets/img/argo.jpg",
        "year": 2013
    },
    {
        "name": "the artist",
        "image": "./assets/img/the-artist.jpg",
        "year": 2012
    },
    {
        "name": "the king's speech",
        "image": "./assets/img/kings-speech.jpg",
        "year": 2011
    },
    {
        "name": "the hurt locker",
        "image": "./assets/img/hurt-locker.jpg",
        "year": 2010
    },
    {
        "name": "slumdog millionaire",
        "image": "./assets/img/slumdog-millionaire.jpeg",
        "year": 2009
    },    
]

var numberOfWins = 0;
var numberOfWinsElement = document.getElementById("number-of-wins");
numberOfWinsElement.textContent = numberOfWins + "/10";

var numberOfGuesses;
var numberOfGuessesElement = document.getElementById("number-of-guesses");

var lettersGuessed;
var lettersGuessedElement = document.getElementById("letters-guessed");

var currentMovie;

var currentMovieName;
var displayedWord;
var displayedWordElement = document.getElementById("displayed-word");

var currentMovieImage;
var moviePosterElement = document.getElementById("movie-poster");

var movieInfo = document.getElementById("movie-info");

var resultElement = document.getElementById("result");

var nextWordButton = document.getElementById("next-word-button");

var winMusic = document.getElementById("win-music");
var loseMusic = document.getElementById("lose-music");

// functions

startButton.onclick = function() {
    startButton.style.display = "none";
    gameContainer.style.display = "block";
    initializeGame();
}

function initializeGame() {
    document.onkeyup = playTurn;
    
    numberOfGuesses = 7;
    numberOfGuessesElement.textContent = numberOfGuesses;

    lettersGuessed = [];
    lettersGuessedElement.textContent = lettersGuessed;

    currentMovie = selectRandomMovie();
    currentMovieName = currentMovie.name;

    displayedWord = convertToUnderscores();
    displayedWordElement.textContent = displayedWord;

    currentMovieImage = currentMovie.image;
    moviePosterElement.src = currentMovieImage;
    moviePosterElement.style.display = "none";

    movieInfo.textContent = "";
    resultElement.textContent = "";
}

function selectRandomMovie() {
    var randomlySelectedMovie = listOfMovies[Math.floor(Math.random()*listOfMovies.length)];
    return randomlySelectedMovie;
}

function convertToUnderscores() {
    var underscoredWord = currentMovieName.replace(/[a-z]/g, "_");
    return underscoredWord
}

function playTurn() {
    var playerGuess = event.key;
    var playerGuessesWrong = true;

    if ((playerGuess.length > 1) || (!/[a-z]/.test(playerGuess))) {
        return;
    }

    for (var i = 0; i < currentMovieName.length; i++) {
        if (playerGuess === currentMovieName[i]) {
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

        if (!playerRepeatsGuess) {   
            lettersGuessed.push(playerGuess);
            var formattedLettersGuessed = lettersGuessed.join(", ");
            lettersGuessedElement.textContent = formattedLettersGuessed.toUpperCase();
            numberOfGuesses--;
            numberOfGuessesElement.textContent = numberOfGuesses;
        }
    }

    if (displayedWord === currentMovieName) {
        numberOfWins++;
        numberOfWinsElement.textContent = numberOfWins + "/10";
        resultElement.textContent = "You got it!";
        moviePosterElement.style.display = "block";
        provideMovieInfo();
        winMusic.play();
        deleteMovieFromList();
        checkStatusOfGame();
        document.onkeyup = "";
    }

    if (numberOfGuesses === 0) {
        displayedWordElement.textContent = currentMovieName.toUpperCase();
        resultElement.textContent = "Better luck next time.";
        moviePosterElement.style.display = "block";
        provideMovieInfo();
        loseMusic.play();
        deleteMovieFromList();
        checkStatusOfGame();
        document.onkeyup = "";
    }
}

function provideMovieInfo() {
    movieInfo.textContent = "Best Picture " + currentMovie.year;
}

function deleteMovieFromList() {
    var movieToDelete = listOfMovies.indexOf(currentMovie);
    listOfMovies.splice(movieToDelete, 1);
}

function checkStatusOfGame() {
    if (listOfMovies.length > 0) {
        nextWordButton.style.display = "block";
    } 
    else {
        resultElement.innerHTML = resultElement.textContent + "<br>Thanks for playing!";
    }
}

nextWordButton.onclick = function() {
    nextWordButton.style.display = "none";
    winMusic.pause();
    winMusic.currentTime = 0;
    initializeGame();
}