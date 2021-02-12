var writtenDigits = document.getElementById("writtenDigits");
var lifeCounter = document.getElementById("livesLeft");
var gameOverPopup = document.getElementById("gameOver");
var settingsPopup = document.getElementById("settings");

var score = document.getElementById("score");

let piPosition;
let lives;
let startingLives;
let theme;
ResetGame();

document.addEventListener('keyup', (e) => {
    let key = e.key;

    if (lives > 0) {
        if (!isNaN(key) && key != " ") {
            let num = parseInt(key);

            if (piPosition >= pi.length - 1) {
                console.log("Digits of pi ran out");
            } else if (num == pi[piPosition]) {
                piPosition++;
                writtenDigits.value = "" + writtenDigits.value.substring(0, writtenDigits.value.length - 1) + num + "?";

                //scroll really far to make it max
                writtenDigits.scrollLeft = 99999999;

            } else {
                //wrong, lose ife
                lives--;
            }
            UpdateLifeCounter()
        }
    }
});

function UpdateLifeCounter() {
    if (piPosition == 0 && lives == startingLives) {
        lifeCounter.innerHTML = "Type a number to begin";
    } else {
        lifeCounter.innerHTML = "Lives: " + lives;
    }

    if (lives <= 0) {
        gameOverPopup.style.display = "block";
        score.innerHTML = piPosition;
    }
}

function OpenSettings() {
    settingsPopup.style.display = "block";
}

function ChangeTheme() {
    theme = document.getElementById("themeToggle").checked;

    if (theme == true) {
        document.body.style.backgroundColor = 'rgb(250, 250, 250)';
        document.body.style.color = 'rgb(0, 0, 0)';

        writtenDigits.style.backgroundColor = "rgb(255,255,255)";

    } else {
        document.body.style.backgroundColor = 'rgb(5, 5, 5)';
        document.body.style.color = 'rgb(255, 255, 255)';

        writtenDigits.style.backgroundColor = "rgb(20,20,35)";

    }
}

function ResetGame() {
    gameOverPopup.style.display = "none";
    settingsPopup.style.display = "none";

    writtenDigits.value = "π = 3.?";

    startingLives = 3;
    lives = 3;

    piPosition = 0;
    UpdateLifeCounter();

    ChangeTheme();

    writtenDigits.focus();
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == gameOverPopup) {
        ResetGame();
    }
}