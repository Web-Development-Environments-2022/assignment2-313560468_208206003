
var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var doc;
var users = { "k": "k" };
var goDownCode = 40;
var goUpCode = 38;
var goRightCode =39;
var goLeftCode=37;
var numOfFood;
var chosenFood;
var chosenTime;
var chosen5PointsColor;
var chosen15PointsColor;
var chosen25PointsColor
var random = false;
var isValidLogin;



	


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
		}
		
	});
	var logInmodal = document.getElementById('login');
	var signInmodal = document.getElementById('signUp');
	//var settingmodal = document.getElementById('settingScreen');
	var aboutmodal = document.getElementById('aboutScreen');

	window.onclick = function(event) {
		if (event.target == logInmodal) {
			logInmodal.style.display = "none";
			logOut();
		}
		if (event.target == signInmodal) {
			signInmodal.style.display = "none";
			logOut();
		}
		if (event.target == aboutmodal) {
			aboutmodal.style.display = "none";
			logOut();
		}
	}
	// Settings Variables from settings
	
		//food
	var fSlider = document.getElementById("totalFood");
	var foodOutPut = document.getElementById("outputTotalFood");
	foodOutPut.innerHTML = fSlider.value;	
	
	fSlider.oninput = function() {
		foodOutPut.innerHTML = this.value;
	  }
	  	//time
	var tSlider = document.getElementById("totalTime");
	var timeOutPut = document.getElementById("outputTime");
	timeOutPut.innerHTML = tSlider.value;

	tSlider.oninput = function() {
		timeOutPut.innerHTML = this.value;
	  }
	  //enemies
	var eSlider = document.getElementById("totalEnemies");
	var enemiesOutPut = document.getElementById("outputEnemies");
	enemiesOutPut.innerHTML = eSlider.value;
	
	eSlider.oninput = function() {
		enemiesOutPut.innerHTML = this.value;
	  }
	  //colors
	var color5Points = document.getElementById("color5Pick");
	var outputColor5Points = document.getElementById("color5points");
	outputColor5Points.innerHTML = color5Points.value;

	color5Points.oninput = function() {
		outputColor5Points.innerHTML = this.value;
	  }

	var color15Points = document.getElementById("color15Pick");
	var outputColor15Points = document.getElementById("color15points");
	outputColor15Points.innerHTML = color15Points.value;
  
	color15Points.oninput = function() {
		  outputColor15Points.innerHTML = this.value;
		}
	
	var color25Points = document.getElementById("color25Pick");
	var outputColor25Points = document.getElementById("color25points");
	outputColor25Points.innerHTML = color25Points.value;
	  
	color25Points.oninput = function() {
		outputColor25Points.innerHTML = this.value;
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
	if(!random){
		getSettingsVariables();
	}
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			console.log(e.keyCode);
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
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[goUpCode]) {
		return 1;
	}
	if (keysDown[goDownCode]) {
		return 2;
	}
	if (keysDown[goLeftCode]) {
		return 3;
	}
	if (keysDown[goRightCode]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}


function loginScreen() {
	document.getElementById("signUp").style.display = "none";
	document.getElementById("login").style.display = "block"
}



function signUpScreen() {
	//document.getElementById("welcomeScreen").style.display = "none";
	document.getElementById("signUp").style.display = "block";
}
function backHome(){
	//document.getElementById("notInGame").style.display = "block"
	resetAllDocumnets();
	document.getElementById("loggedInScreen").style.display = "block";
	
}
function logOut(){
	resetAllDocumnets();
	document.getElementById("welcomeScreen").style.display = "block";
}
function logIN(){
	if(isValidLogin){
		loggedinON();
	}
}
function resetAllDocumnets(){
	document.getElementById("welcomeScreen").style.display = "none";
	document.getElementById("login").style.display = "none";
	document.getElementById("signUp").style.display = "none";
	document.getElementById("aboutScreen").style.display = "none";
	document.getElementById("game").style.display = "none";
	document.getElementById("score").style.display = "none";
	document.getElementById("time").style.display = "none";
	document.getElementById("settingScreen").style.display="none";
	document.getElementById("loggedInScreen").style.display = "none";
	document.getElementById("pacmanAnimation").style.display = "block";
	
}

// function submitLogin() {
// 	let userName = document.getElementById("LuserName").value;
// 	let password = document.getElementById("Lpaswword").value;
// 	validateUser();

// }
// function submitSignUp() {
// 	let userName = document.getElementById("SuserName").value;
// 	let pass = document.getElementById("Spassword").value;
// 	let name = document.getElementById("fullName").value;
// 	let email = document.getElementById("Email").value;
// 	let birthday = document.getElementById("birthday").value;
// }
// function createUser(userName, pass, name, email, birthday) {

// 	let user = { username: userName, password: pass, fullName: name, mail: email, dayOfBirth: birthday }


// }

function aboutON(){
	document.getElementById("aboutScreen").style.display = "block";
	
}
function settingsON(){
	resetAllDocumnets();
	document.getElementById("settingScreen").style.display = "block";
	
}
function loggedinON(){
	resetAllDocumnets();
	document.getElementById("loggedInScreen").style.display = "block";
}
function getSettingsVariables(){
	chosenFood = parseInt(document.getElementById('totalFood').value);
	chosenTime = parseInt(document.getElementById('totalTime').value);
	chosen5PointsColor = document.getElementById("color5Pick").value;
	chosen5PointsColor = document.getElementById("color15Pick").value;
	chosen25PointsColor =document.getElementById("color25Pick").value;
}
function randomStart(){
	random = true;
	document.getElementById('UP').value = "Arrow UP";
	document.getElementById('DOWN').value = "Arrow DOWN";
	document.getElementById('RIGHT').value= "Arrow RIGHT";
	document.getElementById('LEFT').value= "Arrow LEFT";
	let food = Math.random() *(90-50) + 50;

	document.getElementById('totalFood').value = food;

	let time = Math.random() *(180-60) + 60
	
	document.getElementById('totalTime').value = time;

	let randcolor;
	randcolor ="#"+ Math.floor(Math.random() *16777215).toString(16);
	
	document.getElementById("color5Pick").value = randcolor;
	randcolor = "#"+Math.floor(Math.random() *16777215).toString(16);
	
	document.getElementById("color15Pick").value = randcolor;
	randcolor = "#"+Math.floor(Math.random() *16777215).toString(16);
	
	document.getElementById("color25Pick").value = randcolor;
}

// About Modal - esc to return
$(document).on(
	'keydown', function(event) {
		var aboutmodal = document.getElementById('aboutScreen');
	  if (event.key == "Escape") {
		if (aboutmodal.style.display == "block") {
			aboutmodal.style.display = "none";
			welcomeON();
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
			goUpCode=chosenKey;
		}
		else if(data == "RIGHT"){
			document.getElementById('RIGHT').value = cKey;
			goRightCode=chosenKey;
		}
		else if(data == "DOWN"){
			document.getElementById('DOWN').value = cKey;
			goDownCode=chosenKey;
		}
		else if(data == "LEFT"){
			document.getElementById('LEFT').value = cKey;
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



