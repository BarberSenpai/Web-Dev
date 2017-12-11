var ok;
ok = true;
var num = 1;

function Game() {
    if (window.ok) {
        window.num = document.getElementById("player").value;
        document.getElementById("response").innerHTML = num;
        var tries = 0;
        document.getElementById("response").innerHTML
            = "Player 2 Please Enter your Guess: ";
        ok = false;
    }
    else {
        var num2 = document.getElementById("player").value;
        if (num2 > window.num) {
            document.getElementById("response").innerHTML
                = "That number was too high, sorry.";
            tries += 1;
        }
        else if (num2 < window.num) {
            document.getElementById("response").innerHTML
                = "That number was too low, sorry.";
            tries += 1;
        }
        else if (window.num == num2) {
            document.getElementById("response").innerHTML
                = "Good Job! you guessed it " + tries + " tries to get it!";
        }

    }
}