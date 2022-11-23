import { Sprite } from "./sprite.js";

export class Player extends Sprite {
  update() {
    super.update();
    if (this.moving.right === this.moving.left) {
      this.velocity.x = 0;
    } else if (this.moving.left) {
      this.velocity.x = -5;
    } else if (this.moving.right) {
      this.velocity.x = 5;
    }
  }
  playerJump() {
    if (this.isOnTheGround) {
      this.velocity.y = -10;
    }
  }
}

function movment (event, isKeyDown) {
    switch (event.key) {
      //Player 1
      case "d":
        keys.d.pressed = true;
        player1.moving.right = true;
        break;
      case "a":
        keys.a.pressed = true;
        player1.moving.left = true;
        break;
      case "w":
        keys.w.pressed = true;
        playerOne.playerJump();
        break;
      case " ":
        player1.attack();
        break;
      //Player 2
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        break;
      case "ArrowUp":
        keys.ArrowUp.pressed = true;
        break;
      case "ArrowDown":
        player2.attack();
        break;
    }
    console.log(event.key);
  });

  window.addEventListener("keydown", (event) => {
    movment(event, true)
});

// Eventlistners
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    //Player 1
    case "d":
      keys.d.pressed = true;
      player1.moving.right = true;
      break;
    case "a":
      keys.a.pressed = true;
      player1.lastKey = "a";
      break;
    case "w":
      keys.w.pressed = true;
      player1.lastKey = "w";
      playerOne.playerJump();
      break;
    case " ":
      player1.attack();
      break;
    //Player 2
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      player2.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      player2.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      player2.lastKey = "ArrowUp";
      break;
    case "ArrowDown":
      player2.attack();
      break;
  }
  console.log(event.key);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    //Player 1
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
    //Player 2
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
  }
  console.log(event.key);
});
