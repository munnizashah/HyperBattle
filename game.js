import { Sprite } from "./src/sprite.js";
import { AttackBox, isColliding } from "./src/attackbox.js";
import { spriteSets } from "./src/animation.js";
import { Player } from "./src/player.js";


export const c = canvas.getContext("2d");

export const env = {
  width: 1024,
  height: 576,
  gravity: 0.6,
  displayAttackBoxes: false,
  airResistance: 0.05
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

const background = new Sprite({ spriteSet: spriteSets.background, randomSprite: true });

renderQueue.push(background, playerOne, playerTwo);

playerOne.attacks = {

  shoot: new AttackBox(playerOne, {
    isShooting: true,
    api: 'https://meme-api.herokuapp.com/gimme/wholesomememes',
    cooldown: 1000,
    knockback: { x: 5, y: -5 },
    velocity: { x: 12, y: 0 },
    damage: 100

  }),

  punch: new AttackBox(playerOne, {
    damage: 30,
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
    damage: 100


  }),

  punch: new AttackBox(playerTwo, {
    damage: 30,
    knockback: { x: 10, y: -15 },
  })
};

let gameRunning = false;

export function endGame() {
  gameRunning = false;
}

function animate() {
  if (!gameRunning) return;
  window.requestAnimationFrame(animate); // this creates an infinite loop.

  renderQueue.forEach((element) => {
    element.update();
  });
}


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
      startPlayBgm();
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
  startPlayBgm('punch', true);
});

window.addEventListener("keyup", (event) => {
  eventInput(event, false);
});

let startButton = document.getElementById('startButton')
startButton.onclick = function startGame() {

  let theStartButton = document.getElementById('startButton');
  let gameCanvas = document.getElementById('canvas');
  gameCanvas.style.display = 'block';
  theStartButton.style.display = 'none';

  gameRunning = true;

  animate();
}
 const soundEl = document.createElement('audio');
 soundEl.setAttribute("id", "bgm"); 

 soundEl.src = "../assets/backgrounds/wave_boxing.mp3";
 document.body.append(soundEl);


  let bgmStarted = false;
  const startPlayBgm = () => {
   if (bgmStarted) return;
  //  bgmStarted = true;
   soundEl.play();
  };
  

 







