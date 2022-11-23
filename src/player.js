import { Sprite } from "./sprite.js";

export class Player extends Sprite {
  constructor(...args) {
    super(...arguments);
    this.moving = { right: false, left: false }
  }


  update() {
    super.update();
    if (this.moving.right === this.moving.left) {
      this.velocity.x = 0;
    }
    if (this.moving.left) {
      this.velocity.x = -5;
    }
    if (this.moving.right) {
      this.velocity.x = 5;
    }
  }
  playerJump() {
    if (this.isOnTheGround) {
      this.velocity.y = -10;
    }
  }
}
