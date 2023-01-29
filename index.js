var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

// function to generate random sequence 
function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    
    var n = Math.random();
    n = n * 4;
    var randomNumber = Math.floor(n);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    

    playSound(randomChosenColor);
}

// function to detect clicked button
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


// function to play sound
function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3")
    audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    },100)

}


// first click to start the game
$(document).keydown(function () {
    if (!start) {
        $("#level-title").text("Level " + level);
        nextSequence(); 
        start = true;
    }
});


// checkAnswer function
function checkAnswer(currentLevel) {
    // for (var i = 0; i < gamePattern.length; i++) {
    //     if (userClickedPattern[i] == gamePattern[i])
    //         console.log("Success");
    //     else
    //         console.log("Wrong");
    // }


    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");
        var audioWrong = new Audio("sounds/wrong.mp3");
        audioWrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");}, 500);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
      }
}


function startOver() {
    level = 0;
    start = false;
    gamePattern = [];
}