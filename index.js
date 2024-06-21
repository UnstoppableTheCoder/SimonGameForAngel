var gamePattern = [];
var userClickedPattern = [];
var colors = ["green", "red", "yellow", "blue"];
var level = 0;
var start = false;

$(".button-to-play").on("click", () => {
    if (!start) {
        $(".button-to-play").addClass("animate-button");
        setTimeout(() => {
            $(".button-to-play").removeClass("animate-button");
        }, 200);
        nextSequence();
        start = true;
    }
});

$(".btn").click(function () {
    var userClickedButton = $(this).attr('id');
    userClickedPattern.push(userClickedButton);
    playSound(userClickedButton);
    animateButton(userClickedButton);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(answerIndex) {
    if (userClickedPattern[answerIndex] === gamePattern[answerIndex]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        $(".button-to-play").text("Play Game");
        $("#game-title").text("Let's Play Again Miss...");
        $("#level").text("Your previous level was: " + level);
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");

        startOver();
    }
}


function nextSequence() {
    level++;
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = colors[randomNumber];
    gamePattern.push(randomColor);

    $(".button-to-play").text("level " + level);
    
    for (var i = 0; i < gamePattern.length; i++) {
        
        (function (index) {
            setTimeout(() => {
                if (index === gamePattern.length-1) {
                    $("#game-title").text("Play");
                } else {
                    $("#game-title").text("Watch");
                }
            }, index * 600);
        })(i);
        
        (function (index) {
            setTimeout(() => {
                animateButton(gamePattern[index]);
                playSound(gamePattern[index]);
            }, index * 500);
        })(i);
    }
}

function animateButton(name) {
    $("#" + name).addClass("pressed");
    setTimeout(() => {
        $("#" + name).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}