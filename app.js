
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

$(document).ready(function () {
	document.getElementById("time").style.display = "none";
	document.getElementById("score").style.display = "none";
	document.getElementById("game").style.display = "none";
	document.getElementById("login").style.display = "none";
	document.getElementById("signUp").style.display = "none";


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

});
/*------------------- validator function-------------------------*/
$(function () {
	$.validator.addMethod("isUserExist", function (user, elem) {
		if (user in users) {
			return false;
		}
		else {
			return true;
		}
	})
});

$(function () {
	$.validator.addMethod("isStrongPassword", function (password, elem) {
		return password.length >= 6  && /\d/.test(password) && /[a-zA-Z]/.test(password);
	})
});

$(function () {
	$.validator.addMethod("isValidName", function (name, elem) {
		return /^[a-zA-Z" "]+$/.test(name);
	})
});

$(function () {
	$.validator.addMethod("isValidLogin", function (password, elem) {
		let userName = document.getElementById("userNameL").value;
		return users[userName] == password;
	})
});

/*---------------------Login validation---------------------*/


/*--------------------------start game-------------------------------*/
function Start() {
	document.getElementById("game").style.display = "block";
	document.getElementById("score").style.display = "block";
	document.getElementById("time").style.display = "block";
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
	document.getElementById("welcomeScreen").style.display = "none";
	document.getElementById("login").style.display = "block";
}

function signUpScreen() {
	document.getElementById("welcomeScreen").style.display = "none";
	document.getElementById("signUp").style.display = "block";
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

function validateUser() {

}