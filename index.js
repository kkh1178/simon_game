var gamePattern = [];
var userClickedPattern = [];
buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence () {
    var randomNumber = Math.floor(Math.random()*4);
    console.log(randomNumber);
    return randomNumber;
};

var randomChosenColor = buttonColors[nextSequence()];
console.log(randomChosenColor);
gamePattern.push(randomChosenColor);



$("#"+randomChosenColor).click(function(e) {
    const sound = new Audio("./sounds/"+randomChosenColor+".mp3")
    sound.play();
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    });


$('.btn').on('click', function() {
    
    // console.log($(this)[0].id);
    var userChosenColor = $(this)[0].id;
    const sound = new Audio("./sounds/"+userChosenColor+".mp3")
    sound.play();
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log("user Clicked this", userClickedPattern)
})

function playSound(name) {
    $(name).playAudio();
}

function animatePress(currentColor) {
    $(currentColor).addClass("pressed");

    setTimeout(function() {
        $(currentColor).removeClass("pressed");
    }, 100);
}