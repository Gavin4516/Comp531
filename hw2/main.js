var curImage = ["1", "4", "7", "10", "13"]; //current index of the image
var images = [5]; //image elements
var intervals =[5]; // the array of different timers
var functions =[5]; //update functions
var btns = [5]; // start/stop buttons
var paused = [false, false, false, false, false]; //if the cur image is paused

// set the interval of card i
function setIntevlOfNum(i){
	var randomIntevel = Math.floor(Math.random() * 5 + 1) * 1000;
	intervals[i] = setInterval(functions[i], randomIntevel)
}

window.onload = function() {
	images[0] =	document.getElementById("img-1");
	images[1] =	document.getElementById("img-2");
	images[2] =	document.getElementById("img-3");
	images[3] =	document.getElementById("img-4");
	images[4] =	document.getElementById("img-5");

    // add onclick methods to buttons
	for (var i=0; i < 5; i ++) {
		btns[i] = images[i].nextElementSibling;
		(function(i) {
			btns[i].onclick = function() {
				if (paused[i]) {
					setIntevlOfNum(i);
					btns[i].innerHTML = "Stop";
					paused[i] = false;
				} else {
					clearInterval(intervals[i]);
					btns[i].innerHTML = "Start";
					paused[i] = true;
				}
			}
		})(i)
	}

	// initialize interval handle methods
	for (var j = 0; j < 5; j++) {
		(function(j) {
			functions[j] = function() {
				curImage[j]++;
				if(curImage[j] - 3 * j > 3){
					curImage[j] = 3 * j + 1;		
				}
				images[j].src = "Images/" + curImage[j] + ".jpg"; 
			}
		})(j)	
	}

	// initialize intervals for every card.
	for (var i = 0 ; i < 5; i++) {
		setIntevlOfNum(i);
	}
}