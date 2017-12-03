$(document).ready(function () {
    $( "#button" ).on( "click", function( event ) {
        console.log('meme')
        $.ajax('http://deckofcardsapi.com/api/deck/new/draw/?count=2', {
            success: function (response) {
                console.log('meme2.0')
                $("#card1").attr("src",response.cards[0].image);
                $("#card2").attr("src",response.cards[1].image);
                console.log(response.cards[1].image)
            }
        });
    });
});


