//Initialization
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

//Detect when a key is pressed to start game
document.addEventListener("keydown", function(){
  if(!started){
    nextSequence();
    started = true;
    document.querySelector("#level-title").innerHTML = "Level " + level;

  }
})

//adding event listeners to the buttons
for(var i=0;i<document.querySelectorAll(".btn").length;i++){

  document.querySelectorAll(".btn")[i].addEventListener("click", function(){
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    console.log(userClickedPattern);
  })


}

//choosing random sequence
function nextSequence(){
  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColor = buttonColors[randomNumber];
  animatePress(randomChosenColor);
  gamePattern.push(randomChosenColor);

  document.querySelector("#"+randomChosenColor);

  playSound(randomChosenColor);

  level++;
  document.querySelector("#level-title").innerHTML = "Level " + level;

  userClickedPattern = [];
}

//plays sound
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

//animate the buttons
function animatePress(currentColor){
  document.querySelector("#"+currentColor).classList.add("pressed");
  setTimeout(function(){
    document.querySelector("#"+currentColor).classList.remove("pressed");
  }, 100)
}

//checks the sequence of answers
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    if(gamePattern.length == userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 100)

      console.log("true");
    }
  }
  else{
    playSound("wrong");
    document.querySelector("body").classList.add("game-over");
    setTimeout(function(){
      document.querySelector("body").classList.remove("game-over");
    }, 100);
    document.querySelector("#level-title").innerHTML = "Game over! Press any key to restart";
    startOver();
    console.log("fail");
  }
}

//restarts the game
function startOver(){
  level=0;
  gamePattern = [];
  started = false;
}
