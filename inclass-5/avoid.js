var btn;
var isStart;
var isShift;
window.onload = function() {
	isStart = true;
	isShift = false;
	btn = document.getElementById("click");
	btn.onmouseover = function() {
		if (isStart && !isShift) {
			btn.style.left = Math.random() * 450 + "px";
			btn.style.top = Math.random() * 450 + "px";
		}
	}

	window.onkeydown = function(event) {
		if (event.KeyCode = 16) {
			isShift = true;
		}
	}

	window.onkeyup = function() {
		isShift = false;
	}

	btn.onclick = function() {
		if (isStart) {
			this.innerHTML = "Play Again";
			isStart = false;
			document.getElementById("result").style.display = "block";
		} else {
			this.innerHTML = "Click me!";
			isStart = true;
			document.getElementById("result").style.display = "none";
		}
	}
}