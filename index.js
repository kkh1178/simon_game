var gamePattern = [];
var userClickedPattern = [];
buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;

// Choose a random whole number between 0 and 3
function nextSequence () {
    var randomNumber = Math.floor(Math.random()*4);
    console.log(randomNumber);
    return randomNumber;
    level++;
    // $("h1").text(`Level ${level}`)
};

// Chose the random color and push to the game pattern array
var randomChosenColor = buttonColors[nextSequence()];
console.log(randomChosenColor);
gamePattern.push(randomChosenColor);


// When the randomChosenColor is clicked play a sound and "blink"
$("#"+randomChosenColor).click(function(e) {
    const sound = new Audio("./sounds/"+randomChosenColor+".mp3")
    sound.play();
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    });

// Listen for a button click and then get the user chosen color; play the 
// sound and push the color to the user selected array
$('.btn').on('click', function() {
    
    // console.log($(this)[0].id);
    var userChosenColor = $(this)[0].id;
    const sound = new Audio("./sounds/"+userChosenColor+".mp3")
    sound.play();
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log("user Clicked this", userClickedPattern)
})

// add a class of pressed to the color we selected and then remove pressed after a delay
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

$(document).keydown(function() {
    nextSequence();
    $("h1").text("Level 0")
});



