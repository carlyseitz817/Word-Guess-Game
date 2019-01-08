function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

function findLetter(string, letter) {
    for (i = 0; i < string.length; i++) {
        if (string[i] == letter) {
            return true;
        }
    }
    return false;
}

var questionAnswer = [
    { answer: "palazzo", question: "What style of wide-legged pants became popular for women in the 1960s?", image: "assets/images/adele-simpson-jumpsuit.jpg" },
    { answer: "nylon", question: "During WWII, this fabric was rationed for the war effort, leading women to paint their legs with makeup in order to give the appearance of wearing stockings.", image: "assets/images/wwii-leg-makeup.jpg" },
    { answer: "Space Age", question: "What style trend did designer Andre Courreges start in the 1960s?", image: "assets/images/1960s-space-age.jpg" },
    { answer: "Tippi Hedren", question: "In 1975, this actress went to a Vietnamese refugee camp and had her beautician teach a group of 20 women how to do manicures. As a result, she is now credited with the popularity of nail salons amongst the Vietnamese community.", image: "assets/images/vietnamese-manicure-class.jpg" },
    { answer: "tulle", question: "What is a material that was commonly used for prom dresses in the 1950s?", image: "assets/images/1950s-prom.jpg" },
    { answer: "wristwatches", question: "World War I led to the popularization of this men’s fashion accessory.", image: "assets/images/wwi-trench.jpg" },
    { answer: "hat", question: "President John F. Kennedy failed to wear this to his inauguration, which led its decline in popularity in men’s fashion.", image: "assets/images/jfk-inauguration.jpg" },
    { answer: "New Look", question: "In 1947, Christian Dior brought this style into fashion. It was marked by full skirts, narrow waistlines, and, overall, a more feminine appearance than the styles popular during WWII.", image: "assets/images/1947-christian-dior.jpg" },
    { answer: "cat eye", question: "This shape was popular for 1950s eyewear.", image: "assets/images/1950s-eyewear.jpg" }
];

var game = {
    currentAnswer: "",
    currentQuestion: "",
    currentImage: "",
    wins: 0,
    losses: 0,
    guessesLeft: 10,
    wordDisplay: "",
    currentGuesses: "",
    correctGuess: false,

    initialize: function () {
        // THIS IF STATEMENT MUST BE BEFORE THE SPLICE LINE OR THE GAME WILL END A QUESTION EARLY
        if (questionAnswer.length === 0) {
            alert("GAME OVER");
            window.location.reload();
        }

        var c = Math.floor(Math.random() * questionAnswer.length);
        // IMPORTANT THAT THE ARRAY ITEM IDENTIFIER (IN THIS CASE c) COMES AFTER THE ARRAY NAME, NOT AFTER THE OBJECT IN THE ARRAY
        // BASICALLY, IT NEEDS TO KNOW WHAT INDEX TO LOOK AT BEFORE IT CAN LOOK AT A SPECIFIC PART OF THAT INDEX 
        game.currentAnswer = questionAnswer[c].answer;
        game.currentQuestion = questionAnswer[c].question;
        game.currentImage = questionAnswer[c].image;

        game.currentGuesses = "";

        questionAnswer.splice(c, 1);

        game.wordDisplay = game.currentAnswer.replace(/\S/gi, "_");

        questionplz.innerHTML = "<p>" + game.currentQuestion + "</p><img src='" + game.currentImage + "'</p>";
        answer.innerHTML = game.wordDisplay
    },
}

game.initialize();


document.onkeyup = function doThisOnKeyUp(event) {
    var userGuess = String.fromCharCode(event.keyCode);
    game.correctGuess = false;
    // NEED THIS TO PREVENT SAME LETTER SHOWING IN INCORRECT GUESSES MULTIPLE TIMES
    if (game.currentGuesses.indexOf(userGuess) < 0) {
        for (i = 0; i < game.currentAnswer.length; i++) {
            if (game.currentAnswer[i] === event.key.toLowerCase() || game.currentAnswer[i] === event.key.toUpperCase() && game.currentAnswer[i] == event.key.toLowerCase()) {
                game.correctGuess = true;                                                                   //Flag to know that the entered key matches
                game.wordDisplay = replaceAt(game.wordDisplay, i, event.key.toLowerCase());   //Replace the key in the underscored secretword
            }
            
            else if (game.currentAnswer[i] === event.key.toLowerCase() || game.currentAnswer[i] === event.key.toUpperCase() && game.currentAnswer[i] == event.key.toUpperCase()) {
                game.correctGuess = true;                                                                   //Flag to know that the entered key matches
                game.wordDisplay = replaceAt(game.wordDisplay, i, event.key.toUpperCase());   //Replace the key in the underscored secretword
            }
            else if (i == game.currentAnswer.length - 1 && !game.correctGuess && isLetter(event.key)) {      //Check that is not a previously correct letter and that it is actually a letter
                game.currentGuesses += event.key.toUpperCase() + ", ";                                       //Add the LowerCase key to the wrong letter  
                game.guessesLeft--;                                                                            //Decrease one life
            }
        }
    }

    if (game.guessesLeft === 0) {
        game.losses += 1;
        game.guessesLeft = 10;
        game.currentGuesses = "";
        // THIS IF STATEMENT DOESN'T REQUIRE A TIMEOUT FOR ANY PART, BECAUSE WE AREN'T CONCERNED ABOUT SEEING THE WHOLE WORD POPULATED
        alert("WRONG! The answer was: " + game.currentAnswer);
        game.initialize();
    }

    if (game.wordDisplay === game.currentAnswer) {
        game.wins += 1;
        game.guessesLeft = 10;
        game.currentGuesses = "";
        setTimeout(function () {
            alert("HOORAY! YOU GOT THE RIGHT ANSWER!!!");
            // IF THIS LINE IS NOT NESTED INSIDE setTimeout, THE LAST LETTER WON'T SHOW BEFORE THE ALERT
            game.initialize();
        }, 100);
    }

    answer.innerHTML = game.wordDisplay;
    wrongGuess.innerHTML = game.currentGuesses;
    livesLeft.innerHTML = game.guessesLeft;
    wordsGuessed.innerHTML = game.wins;
    wordsMissed.innerHTML = game.losses;
};
