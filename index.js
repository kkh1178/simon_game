// empty arrays where we will store the game pattern and what the user clicks
var gamePattern = [];
var userClickedPattern = [];

// array of the colors
buttonColors = ["red", "blue", "green", "yellow"];

// Initializing variables
let level = 0;
let firstKeyPress = false;

// if any key is pressed, start the game and start the title name change
$(document).keydown(function(event) {
    if (!firstKeyPress && event.originalEvent.key) {
        console.log("Key was pressed");
        nextSequence();
        $("#level-title").text("Level 0");
        firstKeyPress=true;
    }
});

// Listen for a button click and then get the user chosen color; play the 
// sound and push the color to the user selected array
$('.btn').on('click', function() {
    
    var userChosenColor = $(this)[0].id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log("user Clicked this", userClickedPattern);
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
        console.log("Success");
        // if its correct, then check to see if the arrays are the right length and if the elemeents are in the correct order
        if (gamePattern.length === userClickedPattern.length) {
            for (var i =0;i<gamePattern.length;i++) {
                if (gamePattern[i]===userClickedPattern[i]) {
                    console.log(`Answer ${i} is correct!`);
                    setTimeout(function() {
                        nextSequence()
                    }, 1000)
                } else {
                    console.log(`Answer ${i} is wrong.`)
                }
            }
    } else {
        console.log("Wrong")
    }
    }
}

function playSound (color) {
    const sound = new Audio("./sounds/"+color+".mp3");
    sound.play();
}

// Choose a random whole number between 0 and 3
function nextSequence () {
    userClickedPattern = [];
    level++;
    $(".level-title").text(`Level ${level}`);

    // Chose the random color and push to the game pattern array
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);

    // When the randomChosenColor is clicked, blink
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
}