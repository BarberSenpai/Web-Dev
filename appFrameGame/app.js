"use strict";
	var ok;
	ok = true;
	var num = 1;
	var tries = 0;
	
// using a function contructor form to create an object
function MyApp()
{
	var version = "v1.0";

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		$('#enterb').on('click', function(){Game();})
		setStatus("ready");
	}



	function Game(){
	if(window.ok){
		window.num = document.getElementById("user").value;
		document.getElementById("response").innerHTML = num;
		
		document.getElementById("response").innerHTML = "Player 2 Enter a number: ";
		ok = false;
	}
	else{
		var num2 = document.getElementById("user").value;	
		if(num2 > window.num){document.getElementById("response").innerHTML = "That number was too high."; window.tries+=1;}
		else if(num2 < window.num){document.getElementById("response").innerHTML = "That number was too low."; window.tries+=1;}
		else if (window.num == num2){ document.getElementById("response").innerHTML = "You guessed it! It took "+window.tries+" tries to get it!";} 

		}
	}


} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);
		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new MyApp();
	window.app.start();
});

