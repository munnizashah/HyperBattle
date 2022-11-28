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
  displayAttackBoxes: false,
};

export const renderQueue = [];

canvas.width = env.width;
canvas.height = env.height;

c.fillRect(0, 0, canvas.width, canvas.height);

const playerOne = new Player({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  hasGravity: true,
  spriteSet: spriteSets.ronin,
  healthBar: document.getElementById('playerOneHealth'),
  name: 'Eskil',
});

playerOne.attacks = {
  first: new AttackBox(playerOne, { isShooting: true }),
};

const playerTwo = new Player({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  hasGravity: true,
  healthBar: document.getElementById('playerTwoHealth'),
  name: 'Jonathan'
});

playerTwo.attacks = {
  first: new AttackBox(playerTwo, { isShooting: true }),
};


playerOne.enemy = playerTwo;
playerTwo.enemy = playerOne;

const background = new Sprite({ spriteSet: spriteSets.background });

renderQueue.push(background, playerOne, playerTwo);

function animate() {
  window.requestAnimationFrame(animate); // this creates an infinite loop.

  renderQueue.forEach((element) => {
    element.update();
  });

  
}

animate();

playerOne.lastDirection = 'right';
playerTwo.lastDirection = 'left';

// eventlistners
function eventInput(event, isKeydown) {
  console.log(event.key);  
  
  switch (event.key) {
    //Player 1
    case "d":
      playerOne.moving.right = isKeydown;
      playerOne.playAnimation('runRight');
      playerOne.lastDirection = 'right';
      break;
    case "a":
      playerOne.moving.left = isKeydown; 
      playerOne.playAnimation('runLeft');     
      playerOne.lastDirection = 'left';
      break;
    case "w":
      // playerOne.playerJump();
      if(isKeydown){
      if( playerOne.lastDirection === 'right'){       
        playerOne.playerJump();
        playerOne.playAnimation('jumpRight');
    }else if(playerOne.lastDirection === 'left'){
        playerOne.playAnimation('jumpLeft');
        playerOne.playerJump();
    } 
  }
      break;
    case " ":
      // playerOne.attacks.first.attack();
      if(playerOne.lastDirection === 'right'){
        playerOne.playAnimation('attackRight');
        playerOne.attacks.first.attack();
    }else if(playerOne.lastDirection === 'left'){
        playerOne.playAnimation('attackLeft');
        playerOne.attacks.first.attack();
    } 

      break;
    //Player 2
    case "ArrowRight":
      playerTwo.moving.right = isKeydown;
      playerTwo.playAnimation('runRight');
      playerTwo.lastDirection = 'right';
      break;
    case "ArrowLeft":
      playerTwo.moving.left = isKeydown;      
      playerTwo.playAnimation('runLeft');
      playerTwo.lastDirection = 'left';
      break;
    case "ArrowUp":
      playerTwo.playerJump();
      break;
    case "ArrowDown":
      playerTwo.attacks.first.attack();
      break;

  }

}

window.addEventListener("keydown", (event) => {
  eventInput(event, true);
});

window.addEventListener("keyup", (event) => {
  eventInput(event, false);
  playerOne.isIdle();
  playerTwo.isIdle();
});


