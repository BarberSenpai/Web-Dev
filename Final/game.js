var scores = { playerone: 0, playertwo: 0}
$(document).ready(function () {
    $( "#button" ).on( "click", function( event ) {
        console.log('meme')
        $.ajax('http://deckofcardsapi.com/api/deck/new/draw/?count=2', {
            success: function (response) {
                console.log('meme2.0')
                console.log(response.cards[0].value)
                $("#card1").fadeOut(400, function() {
                    $("#card1").attr("src",response.cards[0].image);
                })
                    .fadeIn(400).css("display","block");
                $("#card2").fadeOut(400, function() {
                    $("#card2").attr("src",response.cards[1].image);
                })
                    .fadeIn(400).css("display","block");
                $("#score").fadeOut(400, function() {
                    var hardoneval = getFace(response.cards[0].value)
                    var hardtwoval = getFace(response.cards[1].value)
                    getScore(hardoneval,hardtwoval)
                    $("#playerone").text("Playerone: "+scores.playerone);
                    $("#playertwo").text("Playertwo: "+scores.playertwo);

                })
                    .fadeIn(400);
            }
        });
    });
});


function getFace(face) {
    if (face === 'QUEEN') {
        return 12
    }
    else if (face === 'JACK') {
        return 11
    }
    else if (face === 'KING') {
        return 13
    }
    else if (face === 'ACE') {
        return 14
    }
    return Number(face)
}

function getScore(valone,valtwo) {
    if (valone > valtwo) {
     scores.playerone ++
    }
    else if (valone < valtwo) {
        scores.playertwo ++
    }
    else {
        return "you tied"
    }

}
