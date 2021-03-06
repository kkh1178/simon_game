// empty arrays where we will store the game pattern and what the user clicks
var gamePattern = [];
var userClickedPattern = [];

// array of the colors
buttonColors = ["red", "blue", "green", "yellow"];

// Initializing variables
let level = 0;
let firstKeyPress = false;

// var debounceTimer;

// if any key is pressed, start the game and start the title name change
$(document).keydown(function(event) {
    if (!firstKeyPress && event.originalEvent.key) {
        console.log("Key was pressed");
        nextSequence();
        $("#level-title").text("Level " + level);
        firstKeyPress=true;
    }
});

// Listen for a button click and then get the user chosen color; play the 
// sound and push the color to the user selected array
$('.btn').click(function() {

    var userChosenColor = $(this).attr("id");
    
    userClickedPattern.push(userChosenColor);
    console.log("user Clicked this", userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    // Everytime you click on the button, check answer will compair your answer to
    // the game sequence
    checkAnswer(userClickedPattern.length-1);
});

// add a class of pressed to the color we selected and then remove 
// pressed after a delay
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    // check to see If the most current answer is correct 
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Most current answer is correct.");
        console.log("Game pattern:", gamePattern);
        console.log("User Pattern", userClickedPattern);
        
        // If the user has finished the sequence, run nextSequence again
        if (gamePattern.length===userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);  
            } 
            // If the user got an answer wrong, do the following
        } else {
            console.log("answer is incorrect.");
            playSound("wrong");
            $('body').addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            startOver();
    } 
}

function playSound (color) {
    const sound = new Audio("./sounds/"+color+".mp3");
    sound.play();
}

// Choose a random whole number between 0 and 3
function nextSequence () {
    userClickedPattern = [];
    // Increase level by one.
    level++;
    $("#level-title").text("Level " + level);

    // Chose the random color and push to the game pattern array
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);

    // When the randomChosenColor is clicked, blink
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
}

// If the user loses, start the game over again by resetting the arrays and level values
// also telling them to press a key if they would like to play again.
function startOver () {
    gamePattern=[];
    userClickedPattern=[];
    level=0;
    $("#level-title").text("Press any key to play again");
    firstKeyPress = false;
    console.log(gamePattern, userClickedPattern, firstKeyPress);
}
// function correctOrder (array1, array2) {

//      // if its correct, then check to see if the arrays are the right length and if the elements are in the correct order
//     for (var i =0;i<array1.length;i++) {
//         if (array1.length === array2.length && array1[i]===array2[i]) {
//             console.log(`Answer ${i} is correct!`);
//             return true;
//             }
//         } 
//     }   
