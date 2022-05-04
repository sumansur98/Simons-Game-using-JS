var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;
  }
})


$(".btn").click(function(){
  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})


function nextSequence(){

  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  level++;
  $("#level-title").text("Level "+ level);
}

function playSound(name){
  new Audio("sounds/"+name+".mp3").play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);

}


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel] ){
    if(gamePattern.length == userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 100);
    }
  }
  else{
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);

    $("#level-title").text("Game over, Press any key to restart");
    startOver();
  }

}

function startOver(){
  level=0;
  started = false;
  gamePattern=[];
}
