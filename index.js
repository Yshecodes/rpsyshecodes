const possibleResults = {
  //DRAW
  rockrock: 1,
  paperpaper: 2,
  scissorsscissors: 3,
  //WIN
  scissorspaper: 4,
  rockscissors: 5,
  paperrock: 6,
  //LOSE
  scissorsrock: 7,
  rockpaper: 8,
  paperscissors: 9,
};

const gifs = {
  spock: "/gif/spock.gif",
  flame: "/gif/flame.gif",
  loop: "/gif/loop.gif",
};

const gifManager = {
  getRandomGifPath() {
    const keys = Object.keys(gifs);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return gifs[randomKey];
  },
};

const randomGifPath = gifManager.getRandomGifPath();

const soundEffect = {
  gameStart: new Audio("/sounds/jankenpon_01.wav"),
  rematchSound: new Audio("/sounds/aikodesho_01.wav"),
  winSound: new Audio("/sounds/omedetou_01.wav"),
  loseSound: new Audio("/sounds/zannen_01.wav"),
  drawSound: new Audio("/sounds/shoubuda_01.wav"),
  pageAccess: new Audio("/sounds/isshoniasobo_01.wav"),
};

const user = document.querySelector("#user");
const computer = document.querySelector("#computer");
const resultDisplay = document.querySelector("#result");
const choicesDisplay = document.querySelector("#choices");
const choices = ["rock", "paper", "scissors"];

let isDraw = false;

const clearDisplay = () => {
  user.innerHTML = "";
  computer.innerHTML = "";
  resultDisplay.innerHTML = "";
};

const handleClick = (e) => {
  clearDisplay();
  const userChoice = e.target.textContent;
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  gamePlay(userChoice, computerChoice);
  const randomGifPath = gifManager.getRandomGifPath();
  displayGif(randomGifPath);
};

choices.forEach((choice) => {
  const button = document.createElement("button");
  button.textContent = choice;
  button.addEventListener("click", handleClick);
  choicesDisplay.append(button);
});

function displayGif(gifPath) {
  const gifContainer = document.getElementById("gif-container");
  gifContainer.src = gifPath;
}

displayGif("/gif/loop.gif");
soundEffect.pageAccess.play();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function gamePlay(userChoice, computerChoice) {
  if (!isDraw) {
    soundEffect.gameStart.play();
  } else {
    soundEffect.rematchSound.play();
  }

  user.textContent = `You chose ${userChoice.toUpperCase()}!`;

  await delay(1600);
  computer.textContent = `I chose ${computerChoice.toUpperCase()}!`;

  await delay(1160);

  const resultKey = userChoice + computerChoice;
  const gameResult = possibleResults[resultKey];

  if (gameResult === 4 || gameResult === 5 || gameResult === 6) {
    isDraw = false;
    switch (gameResult) {
      case 4:
        displayGif("/gif/scissorspaper.gif");
        break;
      case 5:
        displayGif("/gif/rockscissors.gif");
        break;
      case 6:
        displayGif("/gif/paperrock.gif");
        break;
    }
    resultDisplay.textContent = `YOU WIN😁!`;
    soundEffect.winSound.play();
  } else if (gameResult === 7 || gameResult === 8 || gameResult === 9) {
    isDraw = false;
    switch (gameResult) {
      case 7:
        displayGif("/gif/scissorsrock.gif");
        break;
      case 8:
        displayGif("/gif/rockpaper.gif");
        break;
      case 9:
        displayGif("/gif/paperscissors.gif");
        break;
    }
    resultDisplay.textContent = `YOU LOSE🥲!`;
    soundEffect.loseSound.play();
  } else {
    isDraw = true;
    switch (gameResult) {
      case 1:
        displayGif("/gif/rock.gif");
        break;
      case 2:
        displayGif("/gif/paper.gif");
        break;
      case 3:
        displayGif("/gif/scissors.gif");
        break;
    }
    resultDisplay.innerHTML = `It's a DRAW😑<br />Choose again!`;
    soundEffect.drawSound.play();
  }
}

const bgm = document.getElementById("bgm");
bgm.volume = 0.009;
window.onload = function () {
  bgm.play().catch((error) => {
    console.log("An error occurred: " + error);
  });
};
