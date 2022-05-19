var context;
var shape = new Object();
var board;
var score;
var pacColor;
var startTime;
var timeElapsed;
var pacmanInterval;
var fantomesInterval;
var cherryInterval;
var clockInterval;
var candyInterval;
var heartInterval;

var boardRows = 26;
var boardCols = 18;

var doc;
var users = { "k": "k" };
var goDownCode = 40;
var goUpCode = 38;
var goRightCode =39;
var goLeftCode=37;

var foodRemain;
var chosenFood;
var chosenTime;
var chosen5PointsColor;
var chosen15PointsColor;
var chosen25PointsColor;
var food5Count = 45;
var food15Count = 25;
var food25Count = 10;

var livesLeft;

var pacMouth = 0;
var pacMouthCheck = true;
var pacDirection = "right";

var reCP = false;
var changePath = 10;

var fantomesBoard = new Array(boardRows);
var fantomes;
var fantomesRemain;

var random = false;
var isLoggedIn;

var cherryPic = new Image();
cherryPic.src = 'images/cherry.png';
var cherryObj;

var clockPic = new Image();
clockPic.src = 'images/clock.png';
var clockObj;
var clockTimer;
var isDisplayClock = false;
var isClockEaten = false;

var candyPic = new Image();
candyPic.src = 'images/candy.png';
var candyObj;
var candyTimer;
var isDisplayCandy = false;

var heartPic = new Image();
heartPic.src = 'images/heart.png';
var heartObj;
var isDisplayHeart = false;
var heartTimer;

var wallPic = new Image();
wallPic.src = "images/wall.png";

var isInGame = false;





$(document).ready(function () {
	resetAllDocumnets();
	document.getElementById("welcomeScreen").style.display = "block";
	document.getElementById("notInGame").style.display = "block";



	context = canvas.getContext("2d");

	$("#signUpForm").validate({
		rules: {
			userNameS: {
				required: true,
				isUserExist: true
			},
			passwordS: {
				required: true,
				isStrongPassword: true
			},
			email: {
				required: true,
				email: true
			},
			birthday: {
				required: true,
			},
			fullName: {
				required: true,
				isValidName: true
			}
		},
		messages: {
			userNameS: {
				required: "Please enter a user name.",
				isUserExist: "The user name is already exists."
			},
			passwordS: {
				required: "Please enter a password.",
				isStrongPassword: "the password must contain at least 6 chars and at least 1 number."
			},
			email: {
				required: "please enter an email.",
				email: "please enter a valid email."
			},
			birthday: {
				required: "please enter your birthday."
			},
			fullName: {
				required: "Please enter your full name.",
				isValidName: "Please enter letters only."
			}
		},

		submitHandler: function () {
			let userName = document.getElementById("userNameS").value;
			let password = document.getElementById("passwordS").value;

			users[userName] = password;
			console.log(users);
			backHome();
		}
	});


	$("#loginForm").validate({
		rules: {
			userNameL: {
				required: true,
			},
			passwordL: {
				required: true,
				isValidLogin: true
			}
		},
		messages: {
			userNameL: {
				required: "Please enter user name."
			},
			passwordL: {
				required: "Please enter your password",
				isValidLogin: "Username or password is wrong."
			}
		},
		submitHandler: function () {
			//continue to game propertis choose;
			console.log("successful login");
			logIN();
		}

	});
	var logInmodal = document.getElementById('login');
	var signInmodal = document.getElementById('signUp');
	//var settingmodal = document.getElementById('settingScreen');
	var aboutmodal = document.getElementById('aboutScreen');
	var aboutLoggedmodal = document.getElementById('aboutScreenlogged');

	window.onclick = function(event) {
		if (event.target == logInmodal) {
			logInmodal.style.display = "none";
			logOut();
		}
		else if (event.target == signInmodal) {
			signInmodal.style.display = "none";
			logOut();
		}
		else if (event.target == aboutmodal) {
			aboutmodal.style.display = "none";
			logOut();
		}
		else if(event.target == aboutLoggedmodal){

			backHome();
		}
	}
	// Settings Variables from settings

		//food
	var fSlider = document.getElementById("totalFood");
	var fSliderInGame = document.getElementById("totalFoodInGame");

	var foodOutPut = document.getElementById("outputTotalFood");
	var foodOuPutInGame = document.getElementById("outputTotalFoodInGame");

	foodOutPut.innerHTML = fSlider.value;
	foodOuPutInGame.innerHTML = fSliderInGame.value;

	fSlider.oninput = function() {
		foodOutPut.innerHTML = this.value;
		foodOuPutInGame.innerHTML = this.value;

	  }
	  //The slider inside the game
	fSliderInGame.oninput = function() {
		foodOuPutInGame.innerHTML = this.value;
	  }

	  	//time
	var tSlider = document.getElementById("totalTime");
	var tSliderInGame = document.getElementById("totalTimeInGame");

	var timeOutPut = document.getElementById("outputTime");
	var timeOutPutInGame = document.getElementById("outputTimeInGame");

	timeOutPut.innerHTML = tSlider.value;
	timeOutPutInGame.innerHTML= tSliderInGame.value;

	tSlider.oninput = function() {
		timeOutPut.innerHTML = this.value;
		timeOutPutInGame.innerHTML = this.value;
	  }

	  //time slider inside the game
	  tSliderInGame.oninput = function() {
		timeOutPutInGame.innerHTML = this.value;
	  }

	  //enemies
	var eSlider = document.getElementById("totalEnemies");
	var eSliderInGame = document.getElementById("totalEnemiesInGame");

	var enemiesOutPut = document.getElementById("outputEnemies");
	var enemiesOutPutInGame = document.getElementById("outputEnemiesInGame");

	enemiesOutPut.innerHTML = eSlider.value;
	enemiesOutPutInGame.innerHTML = eSliderInGame.value;

	eSlider.oninput = function() {
		enemiesOutPut.innerHTML = this.value;
		enemiesOutPutInGame.innerHTML = this.value;
	  }
	eSliderInGame.oninput = function(){
		enemiesOutPutInGame.innerHTML = this.value;
	}

	  //colors
	var color5Points = document.getElementById("color5Pick");
	var color5PointsInGame = document.getElementById("color5PickInGame");

	var outputColor5Points = document.getElementById("color5points");
	var outputColor5PointsInGame = document.getElementById("color5pointsInGame");

	outputColor5Points.innerHTML = color5Points.value;
	outputColor5PointsInGame.innerHTML = color5PointsInGame.value;

	color5Points.oninput = function() {
		outputColor5Points.innerHTML = this.value;
		outputColor5PointsInGame.innerHTML = this.value;
	  }
	color5PointsInGame.oninput = function() {
		outputColor5PointsInGame.innerHTML = this.value;
	  }

	var color15Points = document.getElementById("color15Pick");
	var color15PointsInGame =  document.getElementById("color15PickInGame");

	var outputColor15Points = document.getElementById("color15points");
	var outputColor15PointsInGame = document.getElementById("color15pointsInGame");

	outputColor15Points.innerHTML = color15Points.value;
	outputColor15PointsInGame.innerHTML = color15PointsInGame.value;

	color15Points.oninput = function() {
		  outputColor15Points.innerHTML = this.value;
		  outputColor15PointsInGame.innerHTML = this.value;
		}
	color15PointsInGame.oninput = function() {
		outputColor15PointsInGame.innerHTML = this.value;
	}

	var color25Points = document.getElementById("color25Pick");
	var color25PointsInGame = document.getElementById("color25PickInGame");

	var outputColor25Points = document.getElementById("color25points");
	var outputColor25PointsInGame =document.getElementById("color25pointsInGame");

	outputColor25Points.innerHTML = color25Points.value;
	outputColor25PointsInGame.innerHTML = color25PointsInGame.value;

	color25Points.oninput = function() {
		outputColor25Points.innerHTML = this.value;
		outputColor25PointsInGame.innerHTML = this.value;
	}
	color25PointsInGame.oninput = function(){
		outputColor25PointsInGame.innerHTML = this.value;
	}


});
/*------------------- validator function-------------------------*/
$(function () {
	$.validator.addMethod("isUserExist", function (user, elem) {
		if (user in users) {
			isUserExist = false;
			return false;
		}
		else {
			isUserExist = true;
			return true;
		}
	})
});

$(function () {
	$.validator.addMethod("isStrongPassword", function (password, elem) {
		if(password.length >= 6  && /\d/.test(password) && /[a-zA-Z]/.test(password)){
			isStrongPassword = true;
			return true;
		}
		else{
			isStrongPassword= false;
			return false;
		}
	})
});

$(function () {
	$.validator.addMethod("isValidName", function (name, elem) {
		if(/^[a-zA-Z" "]+$/.test(name)){
			isValidName = true;
			return true;

		}
		else{
			isValidName=false;
			return false;
		}
	})
});

$(function () {
	$.validator.addMethod("isValidLogin", function (password, elem) {
		let userName = document.getElementById("userNameL").value;
		if(users[userName] == password){
			isValidLogin=true;
			return true;
		}
		else{
			isValidLogin=false;
			return false;
		}
	})
});

/*---------------------Login validation---------------------*/


/*--------------------------start game-------------------------------*/
function Start() {
	resetAllDocumnets();
	document.getElementById("pacmanAnimation").style.display = "none";
	document.getElementById("game").style.display = "block";
	document.getElementById("score").style.display = "block";
	document.getElementById("time").style.display = "block";
	document.getElementById("livesLeft").style.display = "block";
	document.getElementById("exp").style.display = "block";
	document.getElementById("settingsInGame").style.display = "block";
	// if(!random){
	// 	console.log(isInGame);
	// 	if(!isInGame){
	// 		getSettingsVariables();
	// 	}
	// 	else{
	// 		getSettingsVariablesInGame()
	// 	}

	// }
	if(!isInGame){
		getSettingsVariables();
	}
	else{
		getSettingsVariablesInGame()
	}
	isInGame = false;
	board = [
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 4, 4, 0, 4, 4],
		[4, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 4],
		[4, 0, 4, 0, 4, 0, 4, 0, 0, 4, 0, 4, 4, 0, 4, 4, 0, 4],
		[4, 0, 4, 0, 4, 4, 4, 0, 0, 4, 0, 4, 0, 0, 4, 0, 0, 4],
		[4, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 4, 4, 0, 4, 4],
		[4, 0, 4, 4, 4, 4, 0, 0, 4, 4, 0, 4, 0, 0, 4, 0, 0, 4],
		[4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 4],
		[4, 0, 4, 4, 0, 0, 0, 4, 0, 4, 4, 4, 4, 0, 4, 0, 0, 4],
		[4, 0, 4, 0, 0, 4, 0, 4, 0, 4, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 0, 0, 0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 4],
		[4, 0, 4, 4, 4, 4, 0, 4, 0, 4, 0, 0, 4, 4, 4, 4, 0, 4],
		[4, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4],
		[4, 0, 4, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4, 4, 4, 4, 0, 4],
		[4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 4, 0, 4, 4, 0, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4],
		[4, 0, 4, 0, 4, 0, 0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 0, 4],
		[4, 0, 0, 0, 4, 0, 4, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4],
		[4, 0, 4, 0, 4, 0, 0, 4, 0, 4, 0, 0, 0, 4, 0, 4, 0, 4],
		[4, 0, 4, 0, 4, 4, 0, 4, 0, 4, 0, 4, 0, 4, 4, 4, 0, 4],
		[4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
	];

	score = 0;
	pacColor = "yellow";
	var cnt = boardRows * boardCols;
	var pacmanRemain = 1;
	clockTimer = new Date();
	candyTimer = new Date();
	heartTimer = new Date();
	foodRemain = chosenFood;
	startTime = new Date();
	cherryObj = new Object();
	cherryObj.i = Math.floor(boardRows / 2);
	cherryObj.j = Math.floor(boardCols / 2);
	clockObj = new Object();
	clockObj.i = -1;
	clockObj.j = -1;
	candyObj = new Object();
	candyObj.i = -1;
	candyObj.j = -1;
	heartObj = new Object();
	heartObj.i = -1;
	heartObj.j = -1;
	livesLeft = 5;

	for (var i = 0; i < boardRows; i++) {
		fantomesBoard[i] = new Array(boardCols);
		for (var j = 0; j < boardCols; j++) {
			if (!isFanstomeCell(i, j)) {
				if (board[i][j] == 4) {
					continue;
				} else {
					var randomNum = Math.random();
					if (randomNum <= (1.0 * chosenFood) / cnt) {
						randomNum = Math.floor(Math.random() * 3);
						if (randomNum == 0 && food5Count != 0) {
							food5Count--;
							board[i][j] = 5;
						} else if (randomNum == 1 && food15Count != 0) {
							food15Count--;
							board[i][j] = 15;
						} else if (randomNum == 2 && food25Count != 0) {
							food25Count--;
							board[i][j] = 25;
						} else {
							chosenFood++;
							board[i][j] = 0;
						}
						chosenFood--;
					} else if (randomNum < (1.0 * (pacmanRemain + chosenFood)) / cnt) {
						shape.i = i;
						shape.j = j;
						pacmanRemain--;
						board[i][j] = 2;
					} else {
						board[i][j] = 0;
					}
				}
				cnt--;
			}
			fantomesBoard[i][j] = 0;
		}
	}


	//init rest of food
	while (chosenFood > 0) {
		var emptyCell = findRandomEmptyCell(board);
		if (food5Count != 0) {
			board[emptyCell[0]][emptyCell[1]] = 5;
			food5Count--;
		} else if (food15Count != 0) {
			board[emptyCell[0]][emptyCell[1]] = 15;
			food5Count--;
		} else {
			board[emptyCell[0]][emptyCell[1]] = 25;
			food5Count--;
		}
		chosenFood--;
	}

	//init packman
	while (pacmanRemain != 0) {

		var emptyCell = findRandomEmptyCell(board);
		var i = emptyCell[0];
		var j = emptyCell[1];
		if (!isFanstomeCell(i,j)) {
			shape.i = i;
			shape.j = j;
			pacmanRemain--;
			board[i][j] = 2;
		}
	}

	//init fantomes
	fantomes = new Array(fantomesRemain);
	placeFantomes();

	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);

	setAllIntervals();
}

function isFanstomeCell(row, col) {
	if ((row == 1 && col == 1) || (row == 1 && col == boardCols - 2) || (row == boardRows - 2 && col == 1) || (row == boardRows - 2 && col == boardCols - 2)) {
		return true;
	}
	return false;
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * boardRows);
	var j = Math.floor(Math.random() * boardCols);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * boardRows);
		j = Math.floor(Math.random() * boardCols);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function placeFantomes() {
	var num = fantomesRemain;
	while (num > 0) {
		if (num == 1) {
			fantomesBoard[1][1] = 1;
			fantomes[0] = new Object();
			fantomes[0].i = 1;
			fantomes[0].j = 1;
			fantomes[0].color = "red";
			fantomes[0].dir = "right";
			fantomes[0].path = fantomesBFS(0, 0);
		} else if (num == 2) {
			fantomesBoard[1][boardCols - 2] = 1;
			fantomes[1] = new Object();
			fantomes[1].i = 1;
			fantomes[1].j = boardCols - 2;
			fantomes[1].color = "green";
			fantomes[1].dir = "right";
			fantomes[1].path = fantomesBFS(0, boardCols - 1);
		} else if (num == 3) {
			fantomesBoard[boardRows - 2][1] = 1;
			fantomes[2] = new Object();
			fantomes[2].i = boardRows - 2;
			fantomes[2].j = 1;
			fantomes[2].color = "pink";
			fantomes[2].dir = "right";
			fantomes[2].path = fantomesBFS(boardRows - 1, 0);
		} else {
			fantomesBoard[boardRows - 2][boardCols - 2] = 1;
			fantomes[3] = new Object();
			fantomes[3].i = boardRows - 2;
			fantomes[3].j = boardCols - 2;
			fantomes[3].color = "blue";
			fantomes[3].dir = "right";
			fantomes[3].path = fantomesBFS(boardRows - 1, boardCols - 1);
		}
		num--;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = chosenTime - timeElapsed;
	lblLives.value = livesLeft;
	for (var i = 0; i < boardRows; i++) {
		for (var j = 0; j < boardCols; j++) {
			var center = new Object();
			center.x = i * 30 + 15;
			center.y = j * 30 + 15;
			if (board[i][j] == 2) { // Pac-Man
				if (pacDirection == "up") {
					context.beginPath();
					context.arc(center.x, center.y, 15, 1.65 * Math.PI + pacMouth, 1.35 * Math.PI - pacMouth); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pacColor; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 7.5, center.y - 2.5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				} else if (pacDirection == "down") {
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.65 * Math.PI + pacMouth, 0.35 * Math.PI - pacMouth, false); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pacColor; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 7.5, center.y - 2.5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				} else if (pacDirection == "left") {
					context.beginPath();
					context.arc(center.x, center.y, 15, 1.15 * Math.PI + pacMouth, 0.85 * Math.PI - pacMouth); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pacColor; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 2.5, center.y - 7.5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				} else if (pacDirection == "right") {
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.15 * Math.PI + pacMouth, 1.85 * Math.PI - pacMouth); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pacColor; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 2.5, center.y - 7.5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				if (pacMouthCheck) {
					pacMouthCheck = false;
					pacMouth = 0.30;
				} else {
					pacMouthCheck = true;
					pacMouth = 0;
				}

			} else if (board[i][j] == 5) { // 5 Points Food
				context.beginPath();
				context.arc(center.x, center.y, 5.5, 0, 2 * Math.PI); // circle
				context.fillStyle = "#bdd6e0"; //color
				context.fill();
				context.beginPath();
				context.arc(center.x, center.y, 3.5, 0, 2 * Math.PI); // circle
				context.fillStyle = chosen5PointsColor; //color
				context.fill();

			} else if (board[i][j] == 15) { // 15 Points Food
				context.beginPath();
				context.arc(center.x, center.y, 7.5, 0, 2 * Math.PI); // circle
				context.fillStyle = "#bdd6e0"; //color
				context.fill();
				context.beginPath();
				context.arc(center.x, center.y, 5.5, 0, 2 * Math.PI); // circle
				context.fillStyle = chosen15PointsColor; //color
				context.fill();
			} else if (board[i][j] == 25) { // 25 Points Food
				context.beginPath();
				context.arc(center.x, center.y, 9.5, 0, 2 * Math.PI); // circle
				context.fillStyle = "#bdd6e0"; //color
				context.fill();
				context.beginPath();
				context.arc(center.x, center.y, 7.5, 0, 2 * Math.PI); // circle
				context.fillStyle = chosen25PointsColor; //color
				context.fill();
			} else if (board[i][j] == 4) { // Wall
				context.drawImage(wallPic, center.x - 15, center.y - 15, 30, 30);
			}

			// Fantome
			if (fantomesBoard[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 1 * Math.PI, 2 * Math.PI); // head
				context.fillStyle = getFantomeByLocation(i, j).color;
				context.fill();
				context.beginPath(); // legs
				context.moveTo(center.x, center.y);
				context.lineTo(center.x + 10, center.y);
				context.lineTo(center.x + 10, center.y + 10);
				context.lineTo(center.x + 7.5, center.y + 7.5);
				context.lineTo(center.x + 7.5, center.y + 10);
				context.lineTo(center.x + 2.5, center.y + 7.5);
				context.lineTo(center.x, center.y + 10);
				context.lineTo(center.x - 2.5, center.y + 7.5);
				context.lineTo(center.x - 5, center.y + 10);
				context.lineTo(center.x - 7.5, center.y + 7.5);
				context.lineTo(center.x - 10, center.y + 10);
				context.lineTo(center.x - 10, center.y);
				context.lineTo(center.x, center.y);
				context.fillStyle = getFantomeByLocation(i, j).color;
				context.fill();
				drawFantomeEyes(center, i, j); // eyes
			}

			if (cherryObj.i == i && cherryObj.j == j) {
				context.drawImage(cherryPic, center.x - 15, center.y - 15, 30, 30);
			}

			if (clockObj.i == i && clockObj.j == j) {
				context.drawImage(clockPic, center.x - 15, center.y - 15, 30, 30);
			}

			if (candyObj.i == i && candyObj.j == j) {
				context.drawImage(candyPic, center.x - 15, center.y - 15, 30, 30);
			}

			if (heartObj.i == i && heartObj.j == j) {
				context.drawImage(heartPic, center.x - 15, center.y - 15, 30, 30);
			}
		}
	}
}

function getFantomeByLocation(fRow, fCol) {
	for (var i = 0; i < fantomes.length; i++) {
		if (fantomes[i].i == fRow && fantomes[i].j == fCol) {
			return fantomes[i];
		}
	}
}

function drawFantomeEyes(center, i, j) {
	var fantomeToDraw = getFantomeByLocation(i, j);
	context.beginPath();
	context.arc(center.x + 5, center.y - 2.5, 2.5, 0, 2 * Math.PI); // right eye
	context.fillStyle = "white";
	context.fill();
	context.beginPath();
	context.arc(center.x - 5, center.y - 2.5, 2.5, 0, 2 * Math.PI); // left eye
	context.fillStyle = "white";
	context.fill();

	if (fantomeToDraw.dir == "right") {
		context.beginPath();
		context.arc(center.x + 7.5, center.y - 2.5, 1.5, 0, 2 * Math.PI); // in right eye
		context.fillStyle = "black";
		context.fill();
		context.beginPath();
		context.arc(center.x - 2.5, center.y - 2.5, 1.5, 0, 2 * Math.PI); // in left eye
		context.fillStyle = "black";
		context.fill();
	} else if (fantomeToDraw.dir == "left") {
		context.beginPath();
		context.arc(center.x + 2.5, center.y - 2.5, 1.5, 0, 2 * Math.PI); // in right eye
		context.fillStyle = "black";
		context.fill();
		context.beginPath();
		context.arc(center.x - 7.5, center.y - 2.5, 1.5, 0, 2 * Math.PI); // in left eye
		context.fillStyle = "black";
		context.fill();
	} else if (fantomeToDraw.dir == "up") {
		context.beginPath();
		context.arc(center.x + 5, center.y - 5, 1.5, 0, 2 * Math.PI); // in right eye
		context.fillStyle = "black";
		context.fill();
		context.beginPath();
		context.arc(center.x - 5, center.y - 5, 1.5, 0, 2 * Math.PI); // in left eye
		context.fillStyle = "black";
		context.fill();
	} else if (fantomeToDraw.dir == "down") {
		context.beginPath();
		context.arc(center.x + 5, center.y, 1.5, 0, 2 * Math.PI); // in right eye
		context.fillStyle = "black";
		context.fill();
		context.beginPath();
		context.arc(center.x - 5, center.y, 1.5, 0, 2 * Math.PI); // in left eye
		context.fillStyle = "black";
		context.fill();
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			pacDirection = "up";
		}
	}
	if (x == 2) {
		if (shape.j < boardCols && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			pacDirection = "down";
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			pacDirection = "left";
		}
	}
	if (x == 4) {
		if (shape.i < boardRows && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			pacDirection = "right";
		}
	}
	if (board[shape.i][shape.j] == 5) {
		score += 5;
		foodRemain--;
	} else if (board[shape.i][shape.j] == 15) {
		score += 15;
		foodRemain--;
	} else if (board[shape.i][shape.j] == 25) {
		score += 25;
		foodRemain--;
	}
	if (shape.i == cherryObj.i && shape.j == cherryObj.j){
		pacmanEatCherry();
	}
	if (shape.i == clockObj.i && shape.j == clockObj.j){
		pacmanEatClock();
	}
	if (shape.i == candyObj.i && shape.j == candyObj.j){
		pacmanEatCandy();
	}
	if (shape.i == heartObj.i && shape.j == heartObj.j){
		pacmanEatHeart();
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	timeElapsed = (currentTime - startTime) / 1000;
	if (timeElapsed >= chosenTime) {
		clearAllIntervals();
		window.alert("Game Over");
	}
	if (foodRemain == 0) {
		clearAllIntervals();
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function updateFantomes() {
	for (var i = 0; i < fantomes.length; i++) {

		var fanRow = fantomes[i].i;
		var fanCol = fantomes[i].j;


		if (board[fanRow][fanCol] == 2 || (fanRow == shape.i && fanCol == shape.j) || fantomesBoard[shape.i][shape.j] == 1) {
			FantomeEatPacman();
			break;
		}

		if (fantomes[i].path.length == 0 || changePath == 0) {
			reCP = true;
			fantomes[i].path = fantomesBFS(fanRow, fanCol);
		}

		var nextState = fantomes[i].path.shift();

		if (fantomesBoard[nextState.i][nextState.j] == 1) {
			fantomes[i].path = fantomesBFS(fanRow, fanCol);
			var nextState = fantomes[i].path.shift();
		}

		fantomesBoard[fanRow][fanCol] = 0;
		fantomesBoard[nextState.i][nextState.j] = 1;
		fantomes[i].i = nextState.i;
		fantomes[i].j = nextState.j;
		if (fanCol < nextState.j) {
			fantomes[i].dir = "down";
		} else if (fanCol > nextState.j) {
			fantomes[i].dir = "up";
		} else if (fanRow < nextState.i) {
			fantomes[i].dir = "right";
		} else if (fanRow > nextState.i) {
			fantomes[i].dir = "left";
		}
		fanRow = nextState.i;
		fanCol = nextState.j;

		if (board[fanRow][fanCol] == 2 || (fanRow == shape.i && fanCol == shape.j) || fantomesBoard[shape.i][shape.j] == 1) {
			FantomeEatPacman();
			break;
		}
	}
	if (reCP) {
		reCP = false;
		changePath = 5;
	} else {
		changePath--;
	}
}

function updateCherry() {
	neighbors = getNeighbors(cherryObj);
	if (board[cherryObj.i][cherryObj.j] == 2) {
		pacmanEatCherry();
	}
	randNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
	cherryObj.i = randNeighbor.i;
	cherryObj.j = randNeighbor.j;
}

function updateClock() {
	var currTime = new Date();
	if((currTime - clockTimer)/1000 >= 15) {
		if(!isClockEaten && !isDisplayClock){
			var freeCell = findRandomEmptyCell(board);
			clockObj.i = freeCell[0];
			clockObj.j = freeCell[1];
			isDisplayClock = true;
			clockTimer = new Date();
		} else if (!isClockEaten && isDisplayClock) {
			clockObj.i = -1;
			clockObj.j = -1;
			isDisplayClock = false;
			clockTimer = new Date();
		}
	}
}

function updateCandy() {
	var currTime = new Date();
	if((currTime - candyTimer)/1000 >= 10) {
		if (!isDisplayCandy) {
			var freeCell = findRandomEmptyCell(board);
			candyObj.i = freeCell[0];
			candyObj.j = freeCell[1];
			isDisplayCandy = true;
			candyTimer = new Date();
		} else if (isDisplayCandy) {
			candyObj.i = -1;
			candyObj.j = -1;
			isDisplayCandy = false;
			candyTimer = new Date();
		}
	}
}

function updateHeart() {
	var currTime = new Date();
	if((currTime - heartTimer)/1000 >= 30) {
		if (!isDisplayHeart) {
			var freeCell = findRandomEmptyCell(board);
			heartObj.i = freeCell[0];
			heartObj.j = freeCell[1];
			isDisplayHeart = true;
			heartTimer = new Date();
		} else if (isDisplayHeart) {
			heartObj.i = -1;
			heartObj.j = -1;
			isDisplayHeart = false;
			heartTimer = new Date();
		}
	}
}

function resetFantomes() {
	for (var i = 0; i < fantomes.length; i++) {
		fantomesBoard[fantomes[i].i][fantomes[i].j] = 0;
	}
	fantomes.splice(0, fantomes.length);
	placeFantomes();
}

function FantomeEatPacman() {
	board[shape.i][shape.j] = 0;

	//decrease the Score
	score -= 10;
	if (score < 0) {
		score = 0;
	}

	livesLeft -= 1;

	if (livesLeft == 0) {
		clearAllIntervals();
		window.alert("Loser!");

	} else {
		//Reboot Ghosts
		resetFantomes();
		//Reboot Pac-Man
		while (true) {
			var emptyCell = findRandomEmptyCell(board);
			var i = emptyCell[0];
			var j = emptyCell[1];
			if (!isFanstomeCell(i, j)) {
				shape.i = i;
				shape.j = j;
				board[i][j] = 2;
				break;
			}
		}
		Draw();
	}
}

function fantomesBFS(fantomeRow, fantomeCol) {
	var closed = {};
	var queue = new Array();
	var neighbors = new Array();
	var startState = new Object;
	var goalState = new Object;
	startState.i = fantomeRow;
	startState.j = fantomeCol;
	goalState.i = shape.i;
	goalState.j = shape.j;
	var Statekey = fantomeRow.toString() + " " + fantomeCol.toString();

	closed[Statekey] = startState;
	queue.push(startState);

	while (queue.length != 0) {
		var currentState = queue.shift();
		if (currentState.i == goalState.i && currentState.j == goalState.j) {
			return getPathFromState(startState, currentState);
		}
		var neighbors = getNeighbors(currentState);
		for (var i = 0; i < neighbors.length; i++) {
			var neighborKey = neighbors[i].i.toString() + " " + neighbors[i].j.toString();
			if (!(neighborKey in closed)) {
				neighbors[i].cameFrom = currentState;
				closed[neighborKey] = neighbors[i];
				queue.push(neighbors[i]);
			}
		}
	}
	return new Array();
}

function getNeighbors(state) {
	var successors = new Array();
	if (state.j > 0 && board[state.i][state.j - 1] != 4) {
		var upState = new Object;
		upState.i = state.i;
		upState.j = state.j - 1;
		successors.push(upState);
	}
	if (state.j < boardCols - 1 && board[state.i][state.j + 1] != 4) {
		var downState = new Object;
		downState.i = state.i;
		downState.j = state.j + 1;
		successors.push(downState);
	}
	if (state.i > 0 && board[state.i - 1][state.j] != 4) {
		var leftState = new Object;
		leftState.i = state.i - 1;
		leftState.j = state.j;
		successors.push(leftState);
	}
	if (state.i < boardRows - 1 && board[state.i + 1][state.j] != 4) {
		var rightState = new Object;
		rightState.i = state.i + 1;
		rightState.j = state.j;
		successors.push(rightState);
	}
	return successors;
}

function getPathFromState(Sstate, Gstate) {
	var solPath = new Array();
	var cur = Gstate;
	solPath.unshift(cur);
	while (!(cur.i == Sstate.i && cur.j == Sstate.j)) {
		var cur = cur.cameFrom;
		solPath.unshift(cur);
	}
	return solPath;
}

function pacmanEatCherry() {
	if (cherryObj.i != -1 || cherryObj.j != -1 ||  window.intervalBitcoin){
		window.clearInterval(cherryInterval);
	}
	cherryObj.i = -1;
	cherryObj.j = -1;
	score += 50;
}

function pacmanEatClock() {
	isClockEaten = true;
	clockObj.i = -1;
	clockObj.j = -1;
	chosenTime += 20;
}

function pacmanEatCandy() {
	candyObj.i = -1;
	candyObj.j = -1;
	var randomNum = Math.random();
	if(randomNum < 0.5) {
		freeCell = findRandomEmptyCell(board);
		fantomesBoard[freeCell[0]][freeCell[1]] = 1;
		var newFantome = new Object();
		newFantome.i = freeCell[0];
		newFantome.j = freeCell[1];
		newFantome.color = Math.floor(Math.random()*16777215).toString(16);
		newFantome.dir = " right";
		newFantome.path = fantomesBFS(freeCell[0], freeCell[1]);
		fantomes.push(newFantome);
		fantomesRemain++;
	} else if(fantomes.length > 1) {
		var deletedFantome = fantomes.pop();
		fantomesBoard[deletedFantome.i][deletedFantome.j] = 0;
		fantomesRemain--;
	}
	candyTimer = new Date();
	isDisplayCandy = false;
}

function pacmanEatHeart() {
	heartObj.i = -1;
	heartObj.j = -1;
	livesLeft++;
	heartTimer = new Date();
	isDisplayHeart = false;
}

function clearAllIntervals() {
	if (window.pacmanInterval) {
		window.clearInterval(pacmanInterval);
	}
	if (window.fantomesInterval) {
		window.clearInterval(fantomesInterval);
	}
	if (window.cherryInterval) {
		window.clearInterval(cherryInterval);
	}
	if (window.clockInterval) {
		window.clearInterval(clockInterval);
	}
	if (window.heartInterval) {
		window.clearInterval(heartInterval);
	}
}

function setAllIntervals() {
	pacmanInterval = setInterval(UpdatePosition, 150);
	fantomesInterval = setInterval(updateFantomes, 150);
	cherryInterval = setInterval(updateCherry, 250);
	clockInterval = setInterval(updateClock, 500);
	candyInterval = setInterval(updateCandy, 500);
	heartInterval = setInterval(updateHeart, 1000);
}

function loginScreen() {

	resetAllDocumnets();
	if(isLoggedIn){
		alert("You must first log out in order to log in")
		document.getElementById("loggedInScreen").style.display = "block";
	}
	else{
		document.getElementById("login").style.display = "block"
	}
}

function signUpScreen() {
	resetAllDocumnets();
	if(isLoggedIn){
		alert("You must first log out in order to sign up")
		document.getElementById("loggedInScreen").style.display = "block";
	}
	else{
	document.getElementById("signUp").style.display = "block";
	}
}

function backHome(){
	//document.getElementById("notInGame").style.display = "block"
	resetAllDocumnets();
	document.getElementById("loggedInScreen").style.display = "block";

}

function logOut(){
	resetAllDocumnets();
	isLoggedIn = false;
	document.getElementById("welcomeScreen").style.display = "block";
}

function logIN(){
	loggedinON();
}

function resetAllDocumnets(){
	document.getElementById("welcomeScreen").style.display = "none";
	document.getElementById("login").style.display = "none";
	document.getElementById("signUp").style.display = "none";
	document.getElementById("aboutScreen").style.display = "none";
	document.getElementById("game").style.display = "none";
	document.getElementById("score").style.display = "none";
	document.getElementById("time").style.display = "none";
	document.getElementById("livesLeft").style.display = "none";
	document.getElementById("exp").style.display = "none";
	document.getElementById("settingScreen").style.display="none";
	document.getElementById("loggedInScreen").style.display = "none";
	document.getElementById("pacmanAnimation").style.display = "block";
	document.getElementById("aboutScreenlogged").style.display = "none";
	document.getElementById("settingsInGame").style.display = "none";
	clearAllIntervals();



}

function aboutON(){

	if(!isLoggedIn)
	{
		document.getElementById("aboutScreen").style.display = "block";
	}
	else{
		document.getElementById("aboutScreenlogged").style.display = "block";
	}

}
function settingsON(){
	resetAllDocumnets();
	document.getElementById("settingScreen").style.display = "block";

}
function loggedinON(){
	resetAllDocumnets();
	isLoggedIn = true;
	document.getElementById("loggedInScreen").style.display = "block";


}
function getSettingsVariables(){
	if(!random){

	}
	chosenFood = parseInt(document.getElementById('totalFood').value);
	chosenTime = parseInt(document.getElementById('totalTime').value);
	fantomesRemain = document.getElementById("totalEnemies").value;
	chosen5PointsColor = document.getElementById("color5Pick").value;
	chosen15PointsColor = document.getElementById("color15Pick").value;
	chosen25PointsColor =document.getElementById("color25Pick").value;
	document.getElementById("color5PickInGame").value = chosen5PointsColor;
	document.getElementById("color15PickInGame").value = chosen15PointsColor;
	document.getElementById("color25PickInGame").value = chosen25PointsColor;
	partitionFood();
}
function getSettingsVariablesInGame(){
	chosenFood = parseInt(document.getElementById('totalFoodInGame').value);
	chosenTime = parseInt(document.getElementById('totalTimeInGame').value);
	fantomesRemain = document.getElementById("totalEnemiesInGame").value;
	chosen5PointsColor = document.getElementById("color5PickInGame").value;
	chosen15PointsColor = document.getElementById("color15PickInGame").value;
	chosen25PointsColor =document.getElementById("color25PickInGame").value;
	livesLeft = 5;
	isDisplayCandy = false;
	isClockEaten = false;
	isDisplayClock = false;
	partitionFood();
}

function partitionFood() {
	food5Count = Math.floor(chosenFood * 0.6);
	food15Count = Math.floor(chosenFood * 0.3);
	food25Count = Math.floor(chosenFood * 0.1);
	while(food5Count + food15Count + food25Count < chosenFood) {
		food5Count++;
	}
}

function StartInGame(){
	isInGame = true;
	clearAllIntervals();
	rebootInGame();
	Start();
}

function rebootInGame() {
	chosenFood = parseInt(document.getElementById('totalFoodInGame').value);
	chosenTime = parseInt(document.getElementById('totalTimeInGame').value);
	fantomesRemain = document.getElementById("totalEnemiesInGame").value;
	chosen5PointsColor = document.getElementById("color5PickInGame").value;
	chosen15PointsColor = document.getElementById("color15PickInGame").value;
	chosen25PointsColor =document.getElementById("color25PickInGame").value;
}

function randomStart(){
	random = true;
	document.getElementById('UP').value = "Arrow UP";
	document.getElementById('DOWN').value = "Arrow DOWN";
	document.getElementById('RIGHT').value= "Arrow RIGHT";
	document.getElementById('LEFT').value= "Arrow LEFT";

	let food = Math.floor(Math.random() *(90-50) + 50);
	document.getElementById('totalFood').value = food;
	document.getElementById('outputTotalFood').innerHTML = food;

	let time = Math.floor(Math.random() *(180-60) + 60)
	document.getElementById('totalTime').value = time;
	document.getElementById('outputTime').innerHTML= time;

	let numEnemies = Math.floor(Math.random() *(4-1) + 1);
	document.getElementById('totalEnemies').value = numEnemies;
	document.getElementById("outputEnemies").innerHTML = numEnemies;

	let randcolor;
	randcolor ="#"+ Math.floor(Math.random() *16777215).toString(16);
	document.getElementById("color5Pick").value = randcolor;
	document.getElementById("color5points")

	randcolor = "#"+Math.floor(Math.random() *16777215).toString(16);
	document.getElementById("color15Pick").value = randcolor;
	document.getElementById("color15points").innerHTML=randcolor;

	randcolor = "#"+Math.floor(Math.random() *16777215).toString(16);
	document.getElementById("color25Pick").value = randcolor;
	document.getElementById("color25points").innerHTML = randcolor;
}

// About Modal - esc to return
$(document).on(
	'keydown', function(event) {
		var aboutmodal = document.getElementById('aboutScreen');
		var aboutmodalLogged = document.getElementById('aboutScreenlogged')
	  		if (event.key == "Escape") {
				if (aboutmodal.style.display == "block") {
					aboutmodal.style.display = "none";
					logOut();
				}
				else if (aboutmodalLogged.style.display == "block"){
					aboutmodalLogged.style.display = "none";
					backHome();
				}
			}


});
function chooseKey(data){
	$(document).keydown(function(event){
		let cKey;
		let chosenKey = event.keyCode;
		cKey = whatKeyPressed(chosenKey);
		if(data == 'UP'){
			document.getElementById('UP').value = cKey;
			document.getElementById('UPingame').value = cKey;
			goUpCode=chosenKey;
		}
		else if(data == "RIGHT"){
			document.getElementById('RIGHT').value = cKey;
			document.getElementById('RIGHTingame').value = cKey;
			goRightCode=chosenKey;
		}
		else if(data == "DOWN"){
			document.getElementById('DOWN').value = cKey;
			document.getElementById('DOWNingame').value = cKey;
			goDownCode=chosenKey;
		}
		else if(data == "LEFT"){
			document.getElementById('LEFT').value = cKey;
			document.getElementById('LEFTingame').value = cKey;
			goLeftCode=chosenKey;
		}

		$(document).unbind();
	});

}
function whatKeyPressed(chosenKey){

	if(chosenKey == 38)
	{
		return "Arrow UP";
	}
	else if(chosenKey == 40)
	{
		return "Arrow DOWN";
	}
	else if(chosenKey == 39)
	{
		return "Arrow RIGHT";
	}
	else if(chosenKey == 37)
	{
		return "Arrow LEFT";
	}
	else {
		return String.fromCharCode(chosenKey);
	}
}

function backToMain(){

	if(isLoggedIn){
		clearAllIntervals();
		backHome();
	}
	else{
		logOut();
	}
}



