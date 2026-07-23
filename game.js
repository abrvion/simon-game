  userInput = [];
  computerInput = [];
  level = 0;

buttons = [
    { id: "green", color: "green" , sound: new Audio("sounds/green.mp3") },
    { id: "red", color: "red" , sound: new Audio("sounds/red.mp3") },
    { id: "yellow", color: "yellow" , sound: new Audio("sounds/yellow.mp3") },
    { id: "blue", color: "blue" , sound: new Audio("sounds/blue.mp3") }
]

$(document).keydown(function(event) {
  if (level === 0) {
    startGame();
  }
});

function startGame() {
  level++;
  userInput = [];
  $("#level-title").text("Level " + level);
  randomButton = buttons[Math.floor(Math.random() * buttons.length)];
  computerInput.push(randomButton.id);
  randomButton.sound.currentTime = 0;
  randomButton.sound.play();
  $("#" + randomButton.id).fadeOut(100).fadeIn(100);
  return computerInput;
} 

$(".btn").click(function(){
 
    let clickedButtonId = $(this).attr("id");
    $("#" + clickedButtonId).addClass("pressed");
    setTimeout(() => {
      $("#" + clickedButtonId).removeClass("pressed");
    }, 200);

    let buttonSound = buttons.find((button) => button.id === clickedButtonId).sound;
    buttonSound.currentTime = 0;
    buttonSound.play();

    userInput.push(clickedButtonId);

    let currentStep = userInput.length - 1;

    if (userInput[currentStep] === computerInput[currentStep]) {
      if (userInput.length === computerInput.length) {
        setTimeout(() => {
          startGame(); // Adds the next random button to computerInput
        }, 1000);
      }

    } else {
      // WRONG BUTTON - GAME OVER
      let wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
      $(document.body).addClass("game-over");

      setTimeout(() => {
        $(document.body).removeClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        level = 0;
        userInput = [];
        computerInput = [];
      }, 1000);
    }
  });
