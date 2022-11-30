import { Sprite } from "./src/sprite.js";
import { AttackBox, isColliding } from "./src/attackbox.js";
import { spriteSets } from "./src/animation.js";
import { Player } from "./src/player.js";

//CREATE ENVIRONMENT
export const c = canvas.getContext("2d");

export const env = {
  width: 1024,
  height: 576,
  gravity: 0.6,
  airResistance: 0.05,
  gameRunning: false,
  displayAttackBoxes: false
};

export const renderQueue = [];

canvas.width = env.width;
canvas.height = env.height;

let background = new Sprite({ spriteSet: spriteSets.background, randomSprite: true });


//CREATE PLAYERS
export const playerOne = new Player({
  defaultPosition: {
    x: 150,
    y: 100,
  },
  hasGravity: true,
  spriteSet: spriteSets.eskil,
  healthBar: document.getElementById('playerOneHealth'),
  name: 'Eskil',
  lastDirection: 'Right',
  hasDoubleJump: true
});

export const playerTwo = new Player({
  defaultPosition: {
    x: 875,
    y: 100,
  },
  hasGravity: true,
  spriteSet: spriteSets.jonathan,
  healthBar: document.getElementById('playerTwoHealth'),
  name: 'Jonathan',
  lastDirection: 'Left',
  hasDoubleJump: true
});

playerOne.enemy = playerTwo;
playerTwo.enemy = playerOne;


//RENDER QUEUE - ORDER MATTERS
renderQueue.push(background, playerOne, playerTwo);


//CREATE ATTACKS
playerOne.attacks = {

  shoot: new AttackBox(playerOne, {
    isShooting: true,
    api: 'https://meme-api.herokuapp.com/gimme/wholesomememes',
    cooldown: 1000,
    knockback: { x: 5, y: -5 },
    velocity: { x: 12, y: 0 },
    damage: 170

  }),

  punch: new AttackBox(playerOne, {
    damage: 70,
    knockback: { x: 10, y: -15 }
  })
};

playerTwo.attacks = {

  shoot: new AttackBox(playerTwo, {
    isShooting: true,
    api: 'https://meme-api.herokuapp.com/gimme/wholesomememes',
    cooldown: 1000,
    knockback: { x: 5, y: -5 },
    velocity: { x: 12, y: 0 },
    damage: 170
  }),

  punch: new AttackBox(playerTwo, {
    damage: 70,
    knockback: { x: 10, y: -15 },
  })
};


//ANIMATION LOOP
function animate() {
  if (!env.gameRunning) return;

  window.requestAnimationFrame(animate); // this creates an infinite loop.

  renderQueue.forEach((element) => {
    element.update();
  });
}

//SOUNDS
export function playSound(soundString) {

  const sound = document.createElement('audio');

  sound.src = `../assets/sound/${soundString}.mp3`;

  document.body.append(sound);

  sound.play();

  setTimeout(() => {
    sound.remove()
  }, 1000);

};


//EVENT LISTENERS
function eventInput(event, isKeydown) {
  if (!env.gameRunning) return;
  switch (event.key) {
    //Player 1
    case "d":
      playerOne.moving.right = isKeydown;
      break;
    case "a":
      playerOne.moving.left = isKeydown;
      break;
    case "w":
      if (isKeydown) playerOne.jump();

      break;
    case "s":
      event.preventDefault();
      if (isKeydown) playerOne.attacks.punch.attack();
      break;
    case "f":
      event.preventDefault();
      if (isKeydown) playerOne.attacks.shoot.attack();
      break;
    //Player 2
    case "ArrowRight":
      event.preventDefault();
      playerTwo.moving.right = isKeydown;
      break;
    case "ArrowLeft":
      event.preventDefault();
      playerTwo.moving.left = isKeydown;
      break;
    case "ArrowUp":
      event.preventDefault();
      if (isKeydown) playerTwo.jump();
      break;
    case "ArrowDown":
      event.preventDefault();
      if (isKeydown) playerTwo.attacks.punch.attack();
      break;
    case "Insert":
      event.preventDefault();
      if (isKeydown) playerTwo.attacks.shoot.attack();
      break;
  }
}

window.addEventListener("keydown", (event) => {
  eventInput(event, true);
});

window.addEventListener("keyup", (event) => {
  eventInput(event, false);
});


//RESET GAME
function resetGame() {

  const winnerOverlayEl = document.getElementById('winnerOverlay')

  winnerOverlayEl.style.display = "none";

  background = new Sprite({ spriteSet: spriteSets.background, randomSprite: true });

  [playerOne, playerTwo].forEach(player => {
    player.health = 1000;
    player.position = { ...player.defaultPosition };
    player.velocity = { x: 0, y: 0 };
    player.activeSprite.callback = () => { };
    player.updateHealthBar();

  });

}

function startGame() {
  env.gameRunning = true;

  animate();
}

//BUTTONS
const startMenu = document.getElementById('startMenu');

document.getElementById('startButton').onclick = () => {

  startMenu.style.display = 'none';

  startGame();
}


document.getElementById('mainMenuButton').onclick = () => {

  resetGame();

  startMenu.style.display = 'flex';

}


document.getElementById('playAgainButton').onclick = () => {

  resetGame();

  startGame();

}

