const languages = ["javascript", "python", "java", "ruby"];
const frameworks = ["react", "angular", "vue", "django", "flask"];
const tools = ["git", "webpack", "babel", "eslint", "prettier"];
const concept = ["closure", "callback", "promises", "async", "hosting"];
const databases = ["mongodb", "sqlite", "mysql"];

const allObjects = {languages, frameworks, tools, concept, databases};

let chosenWord = "";
let guessedLetters = [];
let wrongGuesses;

const wordContainer = document.getElementById("word-container");
const lettersContainer = document.getElementById("letters-container");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");
const hangmanImg = document.getElementById("hangman-img");
const hangmanAud = document.getElementById("hangman-aud");
const trials = document.getElementById("tries");
const clue = document.getElementById("clue");
function init() {
	const randomArray =
		Object.values(allObjects)[
			Math.floor(Math.random() * Object.keys(allObjects).length)
		];

	const randomValue =
		randomArray[Math.floor(Math.random() * randomArray.length)];
	console.log(randomValue);
	const getClue = () => {
		for (const [key, value] of Object.entries(allObjects)) {
			if (value.includes(randomValue)) {
				return key;
			}
		}
	};
	clue.textContent = `Clue: "${getClue().toUpperCase()}" in Programming`;
	chosenWord = randomValue;
	// words[Math.floor(Math.random() * words.length)];
	guessedLetters = [];
	remainingGuesses = 5;
	message.textContent = "";
	wordContainer.innerHTML = "_ ".repeat(chosenWord.length).trim();
	lettersContainer.innerHTML = "";
	hangmanImg.src = "hangmanSteady.png";
	trials.innerText = "YOU HAVE 5 TRIALS!";
	wrongGuesses = 0;
	for (let i = 65; i <= 90; i++) {
		const letterBtn = document.createElement("button");
		letterBtn.classList.add("letter-btn");
		letterBtn.textContent = String.fromCharCode(i);
		letterBtn.addEventListener("click", handleGuess);
		lettersContainer.appendChild(letterBtn);
	}
}

function disableAllButtons() {
	const buttons = document.querySelectorAll(".letter-btn");
	buttons.forEach((button) => {
		button.classList.add("disabled");
		button.disabled = true;
	});
}

restartBtn.addEventListener("click", init);

init();

function handleGuess(event) {
	const letter = event.target.innerText.toLowerCase();
	event.target.classList.add("disabled");
	event.target.disabled = true;

	if (chosenWord.includes(letter)) {
		guessedLetters.push(letter);
		const displayWord = chosenWord
			.split("")
			.map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
			.join(" ");
		wordContainer.textContent = displayWord;
	} else {
		wrongGuesses++;
		if (wrongGuesses === 1) {
			trials.innerText = "4 trials left";
			hangmanImg.src = "hangman1.png";
			hangmanAud.src = "failed.mp3";
			hangmanAud.play();
		} else if (wrongGuesses === 2) {
			hangmanImg.src = "hangman2.png";
			trials.innerText = "3 trials left";
			hangmanAud.src = "failed.mp3";
			hangmanAud.play();
		} else if (wrongGuesses === 3) {
			hangmanImg.src = "hangman3.png";
			trials.innerText = "2 trials left";
			hangmanAud.src = "failed.mp3";
			hangmanAud.play();
		} else if (wrongGuesses === 4) {
			hangmanImg.src = "hangman4.png";
			trials.innerText = "1 trials left";
			hangmanAud.src = "failed.mp3";
			hangmanAud.play();
		}
	}

	handleGameOver();
}

const handleGameOver = () => {
	if (wrongGuesses === 5) {
		message.textContent = `Game Over! ❌ The word was  "${chosenWord}".`;
		disableAllButtons();
		hangmanImg.src = "hangmanFailed.png";
		trials.innerText = "0 TRIAL!";
		hangmanAud.src = "gameover.mp3";
		hangmanAud.play();
		document.querySelector("#message").style.color = "red";
	}
	if (chosenWord.split("").every((letter) => guessedLetters.includes(letter))) {
		message.textContent = "Congratulations! You guessed the word!";
		hangmanImg.src = "hangmanSuccess.png";
		trials.innerText = "Congrats!";
		hangmanAud.src = "success.mp3";
		hangmanAud.play();
		document.querySelector("#message").style.color = "green";

		disableAllButtons();
	}
};

