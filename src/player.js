import { Sprite } from "./sprite.js";

export class Player extends Sprite {
  constructor({
    position,
    velocity,
    hasGravity,
    spriteSet,
    jumpHeight = 16,
    hasDoubleJump = false,
  }) {
    super({ position, velocity, hasGravity, spriteSet });
    this.moving = { right: false, left: false };
    this.jumpHeight = jumpHeight;
    this.hasDoubleJump = hasDoubleJump;
    console.log(this.jumpHeight);
    console.log(this.hasDoubleJump);
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
      this.hasUsedDoubleJump = false;
      this.velocity.y = -this.jumpHeight;
    } else if (this.hasDoubleJump && !this.hasUsedDoubleJump) {
      this.velocity.y = -this.jumpHeight * 0.8;
      this.hasUsedDoubleJump = true;
    } else {
      return;
    }

    this.playAnimation("jump", true);
  }
}
