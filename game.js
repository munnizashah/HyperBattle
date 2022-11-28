import { Sprite } from "./src/sprite.js";
import { AttackBox, isColliding } from "./src/attackbox.js";
import { spriteSets } from "./src/animation.js";
import { Player } from "./src/player.js";

const canvas = document.querySelector("canvas");

export const c = canvas.getContext("2d");

export const env = {
  width: 1024,
  height: 576,
  gravity: 0.6,
  displayAttackBoxes: true,
};

export const renderQueue = [];

canvas.width = env.width;
canvas.height = env.height;

c.fillRect(0, 0, canvas.width, canvas.height);

const playerOne = new Player({
  position: {
    x: 150,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  hasGravity: true,
  spriteSet: spriteSets.eskil,
  healthBar: document.getElementById('playerOneHealth'),
  name: 'Eskil',
  lastDirection: 'Right'

});



const playerTwo = new Player({
  position: {
    x: 875,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  hasGravity: true,
  spriteSet: spriteSets.jonathan,
  healthBar: document.getElementById('playerTwoHealth'),
  name: 'Jonathan',
  lastDirection: 'Left'
});



playerOne.enemy = playerTwo;
playerTwo.enemy = playerOne;

const background = new Sprite({ spriteSet: spriteSets.background });

renderQueue.push(background, playerOne, playerTwo);

playerOne.attacks = {
  shoot: new AttackBox(playerOne, { isShooting: true, api: 'https://meme-api.herokuapp.com/gimme/wholesomememes', cooldown: 1000 }),
  punch: new AttackBox(playerOne, {})
};

playerTwo.attacks = {
  shoot: new AttackBox(playerTwo, { isShooting: true, api: 'https://meme-api.herokuapp.com/gimme/wholesomememes', cooldown: 1000 }),
  punch: new AttackBox(playerTwo, {})
};

function animate() {
  window.requestAnimationFrame(animate); // this creates an infinite loop.

  renderQueue.forEach((element) => {
    element.update();
  });
}

animate();

// eventlistners
function eventInput(event, isKeydown) {
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
    case "Control":
      event.preventDefault();
      if (isKeydown) playerTwo.attacks.shoot.attack();
      break;
  }
}

window.addEventListener("keydown", (event) => {
  console.log(event.key);
  eventInput(event, true);
});

window.addEventListener("keyup", (event) => {
  eventInput(event, false);
});
