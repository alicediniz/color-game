var resetButton = document.querySelector("#resetGame");
var button = document.querySelectorAll("button");
var level = document.querySelectorAll(".level");
var colors = document.querySelectorAll(".dot");
var colorToGuess = document.querySelector("#colorToGuess");
var mensagem = document.querySelector("#mensagem");
var jumbo = document.querySelector(".jumbotron.jumbotron-fluid");

var numOpcoes = 6; 
var colorPick; 
var answer; 
var colorClick;

resetButton.addEventListener("click", resetGame);

gaming();

function gaming() {
	resetGame();
	gameDificult();
	jogada();
}


function jogada(){
	for (var i = 0 ; i<6;i++){
		colors[i].addEventListener("click", function(){
			colorClick = this.style.background;

			// ACERTOU
			if ( colorClick == colorToGuess.textContent){
				jumbo.style.background = colorClick;
				mensagem.textContent = "Congratulations!";
				resetButton.textContent = "PLAY AGAIN";
				for (var i=0; i<numOpcoes; i++){
					colors[i].style.background = colorClick;
				}
			}

			// ERROU 
			else {
				this.style.background = "#232323";
				mensagem.textContent = "Try Again!";
			}
		});
	}
}

// DEFININDO DIFICULDADE DO JOGO
function gameDificult (){
	for ( var i = 0; i<2 ; i++){
		level[i].addEventListener("click", function(){
			level[0].classList.remove("selected");
			level[1].classList.remove("selected");
			this.classList.add("selected");
			if ( this.textContent === "EASY")
				numOpcoes = 3;
			else 
				numOpcoes = 6;
			resetGame();
		});
	}
}


// RESETANDO O JOGO 
function resetGame (){
	resetButton.textContent = "NEW COLORS";
	mensagem.textContent = " ";
	jumbo.style.background = "steelblue";
	// ESCOLHE NOVA COR
	colorPick = colorGeneration ();
	colorToGuess.textContent = "rgb("+colorPick[0]+", "+colorPick[1]+", "+colorPick[2]+")";

	// RECOLORE AS BOLINHAS
	colorOptions(numOpcoes);
	// UMA DAS BOLINHAS DEVE SER DA COR DA RESPOSTA
	answer = Math.floor(Math.random() * numOpcoes);
	colors[answer].style.background = colorToGuess.textContent; 
};

// FUNCAO GERADORA DE CORES 
function colorGeneration () {
	var rgb = []; 
	for (var i=0; i<3;i++){
		rgb[i] = Math.floor(Math.random() * 256);  // gera numeros aleatorios entre 0 e 255
	}
	return rgb;  
};


// COLORINDO BOLINHAS INICIO JOGO
function colorOptions (dificuldade) {
	for (var i = 0 ; i<dificuldade;i++){
		colorPick = colorGeneration();
		colors[i].style.background = "rgb("+colorPick[0]+", "+colorPick[1]+", "+colorPick[2]+")";
	}
	for (var j = dificuldade; j< colors.length; j++){
		colors[j].style.background = "#232323";
	}
}