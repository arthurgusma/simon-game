var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var firstKey = true;


$(document).on("keydown", function() {
  if (firstKey === true) {
    firstKey = false;
    nextSequence();
  }
});

$(".btn").on("click", function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level " + level)
  level += 1;

}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    var audioWrong = new Audio("sounds/wrong.mp3");
    audioWrong.play();
    var gameOver = $("body").addClass("game-over")
    setTimeout(function() {
      gameOver.removeClass("game-over")
    }, 200);
    userClickedPattern = [];
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 1;
  gamePattern = [];
  firstKey = true;
}

function animatePress(currentColour) {
  var pressed = $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    pressed.removeClass("pressed");
  }, 100);
}

function playSound(color) {
  switch (color) {
    case "red":
      var audioRed = new Audio("sounds/red.mp3");
      audioRed.play();
      break;
    case "blue":
      var audioBlue = new Audio("sounds/blue.mp3");
      audioBlue.play();
      break;
    case "yellow":
      var audioYellow = new Audio("sounds/yellow.mp3");
      audioYellow.play();
      break;
    case "green":
      var audioGreen = new Audio("sounds/green.mp3");
      audioGreen.play();
      break;
    default:
      var audioWrong = new Audio("soudns/wrong.mp3");
      audioWrong.play();
  }
}
