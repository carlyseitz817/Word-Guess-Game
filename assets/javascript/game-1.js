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

function hasWhiteSpace(s) {
    return /\s/g.test(s);
  }

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

var questionAnswer = [
    { answer: "palazzo", question: "What style of wide-legged pants became popular for women in the 1960s?", image: "assets/images/adele-simpson-jumpsuit.jpg" },
    { answer: "nylon", question: "During WWII, this fabric was rationed for the war effort, leading women to paint their legs with makeup in order to give the appearance of wearing stockings.", image: "assets/images/wwii-leg-makeup.jpg" },
    { answer:"Space Age", question: "What style trend did designer Andre Courreges start in the 1960s?", image: "assets/images/1960s-space-age.jpg" },
    { answer:"Tippi Hedren", question: "In 1975, this actress went to a Vietnamese refugee camp and had her beautician teach a group of 20 women how to do manicures. As a result, she is now credited with the popularity of nail salons amongst the Vietnamese community.", image: "assets/images/vietnamese-manicure-class.jpg" },
    { answer:"tulle", question: "What is a material that was commonly used for prom dresses in the 1950s?", image: "assets/images/1950s-prom.jpg" },
    { answer:"wristwatches", question: "World War I led to the popularization of this men’s fashion accessory.", image: "assets/images/wwi-trench.jpg" },
    { answer:"hat", question: "President John F. Kennedy failed to wear this to his inauguration, which led its decline in popularity in men’s fashion.", image: "assets/images/jfk-inauguration.jpg" },
    { answer:"New Look", question: "In 1947, Christian Dior brought this style into fashion. It was marked by full skirts, narrow waistlines, and, overall, a more feminine appearance than the styles popular during WWII.", image: "assets/images/1947-christian-dior.jpg" },
    { answer: "cat eye", question: "This shape was popular for 1950s eyewear.", image: "assets/images/1950s-eyewear.jpg" }
];

var game = {
    currentWordDisplay: "",
    currentGuesses: "",
    previousGuess: false,
    wordComplete: false,
    lives: 10,
    gamesWon:0,
    gamesLost:0,
    initialized: false,
    correctGuess: false,
    soundRight:document.getElementById("soundRight"),
    soundFail:document.getElementById("soundFail"),
    soundEnd:document.getElementById("soundEnd"),
    continue: false,
};

// Chooses a random item in questionAnswer array
var index = questionAnswer[Math.floor(Math.random() * questionAnswer.length)];
console.log(index);

// Makes it so an answer can be called upon to calculate the length -- or number of characters -- in it
var answer = {
    justAnswer: function() {
    return this.answer.length;
},
    answerNotlength: function() {
        return this.answer;
    }
};

// Actually shoots back the length of an answer now that it is being matched with the index of the object array item it's contained in
var xAnswer = answer.justAnswer.call(index);
console.log(xAnswer);

var nAnswer = answer.answerNotlength.call(index);
console.log(nAnswer);

// Allows for grabbing of question
var question = {
    justQuestion: function() {
    return this.question + "<br><br>" + "<img src='" + this.image + "'>";
}
};

// Gives question associated with answer
var xQuestion = question.justQuestion.call(index);
// console.log(xQuestion);


    
questionplz.innerHTML = "<p>" + xQuestion + "</p>";


// Wait on a key to be pressed to run the main logic
document.onkeyup = function doThisOnKeyUp(event){
    // Use this flag to avoid displaying the same letter multiple times
    game.previousGuess = findLetter(game.currentGuesses,event.key);
    game.correctGuess = false;
  
    // Start game when a key is pressed
    if (event.keyCode !== (-1) && !game.initialized) {
      // Update instructions and blank image
      instructions.innerHTML = "Enter letters to guess the answer!";
      // Initiliaze game display
      game.initialized = true;
      // Inititate answer display with underscores
    //   justAnswer();
      // Hide the letters using underscores
      game.currentWordDisplay = nAnswer.replace(/\S/gi, "_");
      // Update display with underscores
      currentWord.innerHTML = game.currentWordDisplay;
      
    //   currentWord.innerHTML = showDashes;
      // Remove previous guesses
      game.currentGuesses = "";
      console.log(game.currentGuesses = "");
      // Update Lives
      livesLeft.innerHTML = game.lives;
    }

    if (game.initialized) {                                     // Start the game if the variable is true, for this any key has to be pressed prior
        if (!game.previousGuess) {                                // Verify that the user is not trying to enter an already entered key
          for (i = 0; i < nAnswer.length; i++) {          // Check the length of the secret word and compare every single character with the key pressed
            if (nAnswer[i] === event.key.toLowerCase() || nAnswer[i] === event.key.toUpperCase() && nAnswer[i] == event.key.toLowerCase()) {
            // if (nAnswer[i] == event.key) {                                          //Convert the key to LowerCase
              game.correctGuess = true;                                                                   //Flag to know that the entered key matches
              game.currentWordDisplay = replaceAt(game.currentWordDisplay, i, event.key.toLowerCase());   //Replace the key in the underscored secretword
              // game.currentWordDisplay.push(nAnswer[i]);
            } 
            else if (nAnswer[i] === event.key.toLowerCase() || nAnswer[i] === event.key.toUpperCase() && nAnswer[i] == event.key.toUpperCase()) {
              // if (nAnswer[i] == event.key) {                                          //Convert the key to LowerCase
                game.correctGuess = true;                                                                   //Flag to know that the entered key matches
                game.currentWordDisplay = replaceAt(game.currentWordDisplay, i, event.key.toUpperCase());   //Replace the key in the underscored secretword
                // game.currentWordDisplay.push(nAnswer[i]);
              } 
            // if (nAnswer[i].hasWhiteSpace(s)) {
            //   nAnswer[i].titleCase(str);
            // }
            else if (i == nAnswer.length - 1 && !game.correctGuess && isLetter(event.key)) {      //Check that is not a previously correct letter and that it is actually a letter
              game.currentGuesses += event.key.toUpperCase() + ", ";                                       //Add the LowerCase key to the wrong letter  
              game.lives --;                                                                            //Decrease one life
            }
          }
        
        
        
        }
       
            currentWord.innerHTML = game.currentWordDisplay;                                             // Update displays                                
            wrongGuess.innerHTML = game.currentGuesses;
            livesLeft.innerHTML = game.lives;
        
        if (game.lives == 0) {                                                                       //Verify if the user already lost all lives 
          game.gamesLost += 1;                                                                       //Increase a Lost to the overall Missed score
        //   if (questionAnswer.length > 0){
        //   game.soundFail.volume = 0.1;                                                               //Decrease volume
        //   game.soundFail.play();                                                                     //Play sound
        //   }
          setTimeout(function() { alert("The answer was " + nAnswer); },100);                 //Pop a delayed alert with the correct answer
        }

        if (game.currentWordDisplay == nAnswer) {                                            //Verify is the current word display matches the secretWord     
            game.gamesWon ++;                                                                        //Increase a Lost to the overall Guessed score
            // if (questionAnswer.length > 0){
            // game.soundRight.volume = 0.1;                                                              //Decrease volume
            // game.soundRight.play();                                                                    //Play sound
            // }                                                                  
            game.wordComplete = true;                                                                  //Flag to know that the user completed one word 
            setTimeout(function() { alert("You guessed the right answer!"); },100);                                   //Pop a delayed alert with the correct answer
          }
      
          if (game.wordComplete || game.lives == 0) {                                                   //Verify if the user completed a word or lost all lives
            game.wordComplete = false;                                                                  //Remove flag
            game.lives = 10;                                                                            //Reset Lives
            instructions.innerHTML = "Press any key for a new word";                                    //Update instructions
      
            if (questionAnswer.length == 1) {                                                              //Verify if the array has one word left
              setTimeout(function() { alert("Last Word"); },150);                                       //Alert the user that next will be last word
            }
      
            if (questionAnswer.length == 0) {                                                              //Verify if the array is already empty
              currentWord.innerHTML = "GAME OVER";                                                      //Display Game Over
              instructions.innerHTML = "No more questions";                                                //Display that there are no more houses left                               
            //   game.soundEnd.play();                                                                     //Play sound
            //   game.soundEnd.volume = 0.05;                                                              //Decrease volume
            }
      
            game.initialized = false;                                                                   //Remove flag
            wordsGuessed.innerHTML = game.gamesWon;                                                     //Update score display
            wordsMissed.innerHTML = game.gamesLost;
          }
        }
      };
