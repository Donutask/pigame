const writtenDigits = document.getElementById("writtenDigits");
const lifeCounter = document.getElementById("livesLeft");
const settingsPopup = document.getElementById("settings");
const inputDigit = document.getElementById("inputDigit");

const score = document.getElementById("score");

const mobileInputToggle = document.getElementById("mobileInput");
const startPosInput = document.getElementById("startPosInput");
const startLivesInput = document.getElementById("startLivesInput");

const openSettings = document.getElementById("openSettings");
const endGame = document.getElementById("endGame");
const playAgainButton = document.getElementById("replay");

let startingPosition = 0;
let position;

let startingLives = 3;
let lives;

let mobileInput;
let inputAllowed;

let number = pi;

document.addEventListener('keyup', (e) => {
    let key = e.key;

    if (inputAllowed) {
        if (!isNaN(key) && key != " ") {
            let num = parseInt(key);

            if (position >= number.digits.length) {
                TooGood();
            } else if (num == number.digits[position]) {
                position++;
                UpdateWrittenDigits();
            } else {
                //wrong, lose ife
                lives--;
            }
            UpdateLifeCounter()
        }
    }
});


function UpdateWrittenDigits() {
    writtenDigits.innerHTML = `${number.symbol} = ${number.start}.${number.digits.substring(0, position)}?`;
    writtenDigits.scrollLeft = 99999999;
}

function UpdateLifeCounter() {
    if (position == 0 && lives == startingLives) {
        lifeCounter.innerHTML = "Type a number to begin";

        endGame.style.display = "none";
        openSettings.style.display = "block";

    } else {
        lifeCounter.innerHTML = "Lives: " + lives;

        endGame.style.display = "block";
        openSettings.style.display = "none";
    }

    if (lives <= 0) {
        GameOver();
    }
}


function TooGood() {
    inputAllowed = false;
    lifeCounter.innerHTML = `You've recited all the digits of ${number.symbol} that this website knows! Well done!!`
}

function GameOver() {
    inputAllowed = false;

    writtenDigits.innerHTML = "Game Over";

    if (position > 1) {
        lifeCounter.innerHTML = `You recited <b>${position}</b> digits of ${number.symbol}!`
    } else {
        lifeCounter.innerHTML = `You recited 1 digit of ${number.symbol}!`
    }


    playAgainButton.style.display = "block";

    endGame.style.display = "none";
    openSettings.style.display = "none";
}

function OpenSettings() {
    settingsPopup.style.display = "block";
    inputAllowed = false;
}

function ChangeStartPos(value) {
    let parsed = parseInt(value);
    if (parsed < 0) {
        parsed = 0;
    }
    if (parsed >= number.digits.length) {
        parsed = number.digits.length - 2;
    }
    startingPosition = parsed;

    localStorage.setItem("startPos", startingPosition);
}

function ChangeStartLives(value) {
    let parsed = parseInt(value);
    if (parsed < 0) {
        parsed = 0;
    }
    //arbitary max value
    if (parsed > 10) {
        parsed = 10;
    }
    startingLives = parsed;

    localStorage.setItem("startingLives", startingLives);
}

function ChangeMobileInput(value) {
    mobileInput = value;

    if (mobileInput == true) {
        mobileInputToggle.checked = true;
    } else {
        mobileInputToggle.checked = false;
    }

    localStorage.setItem("mobileInput", mobileInput);

    if (mobileInput == true) {
        //activate the input thingy
        inputDigit.hidden = false;

    } else {
        inputDigit.hidden = true;
    }

}

function ResetGame() {
    settingsPopup.style.display = "none";
    playAgainButton.style.display = "none";

    lives = startingLives;
    position = startingPosition;

    startLivesInput.value = startingLives;
    startPosInput.value = startingPosition;

    UpdateLifeCounter();
    UpdateWrittenDigits();

    ChangeMobileInput(mobileInput);

    inputDigit.style.width = '150px';
    writtenDigits.focus();

    endGame.style.display = "none";
    openSettings.style.display = "block";

    inputAllowed = true;
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == settingsPopup) {
        ResetGame();
    }
}


window.onload = function () {
    Load();
    ResetGame();
    RegisterServiceWorker();
    ShowHideInstallButton();

    if (window.location.hash) {
        OpenSettings();
    }
}

function Load() {
    let _input = localStorage.getItem("mobileInput");
    if (_input != null) {
        mobileInput = _input;

    } else {
        mobileInput = MobileCheck();
        localStorage.setItem("mobileInput", mobileInput);
    }
}

function DigitInputValueChange() {
    inputDigit.placeholder = "";
    inputDigit.value = "";

    inputDigit.style.width = '50px';
}

function DigitInputLoseFocus() {
    inputDigit.value = "";
    inputDigit.placeholder = "Tap here to type";
    inputDigit.style.width = '150px';
}

// disable mousewheel on a input number field when in focus
// (to prevent Cromium browsers change the value when scrolling)
$('form').on('focus', '#inputDigit', function (e) {
    $(this).on('wheel.disableScroll', function (e) {
        e.preventDefault()
    })
})
$('form').on('blur', '#inputDigit', function (e) {
    $(this).off('wheel.disableScroll')
})

function MobileCheck() {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};