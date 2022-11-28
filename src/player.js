import { Sprite } from "./sprite.js";

export class Player extends Sprite {
  constructor({
    position,
    velocity,
    hasGravity,
    spriteSet,
    jumpHeight = 16,
    hasDoubleJump = false,
    health = 1000,
    healthBar,
    name,
    lastDirection
  }) {
    super({ position, velocity, hasGravity, spriteSet });
    this.moving = { right: false, left: false };
    this.jumpHeight = jumpHeight;
    this.hasDoubleJump = hasDoubleJump;
    this.health = health;
    this.healthBar = healthBar;
    this.name = name;

    this.lastDirection = lastDirection;
  }

  update() {
    super.update();
    if (this.moving.right === this.moving.left) {
      this.velocity.x = 0;

      if (this.isOnTheGround) {

        this.playAnimation(this.spriteSet['idle' + this.lastDirection]);

      }

    }
    if (this.moving.left) {
      this.velocity.x = -5;
      this.lastDirection = 'Left';
      if (this.spriteSet) this.playAnimation(this.spriteSet['run' + this.lastDirection]);

    }
    if (this.moving.right) {
      this.velocity.x = 5;
      this.lastDirection = 'Right';
      if (this.spriteSet) this.playAnimation(this.spriteSet['run' + this.lastDirection]);

    }

    if (!this.isOnTheGround && this.velocity.y > 0) {

      if (this.spriteSet) this.playAnimation(this.spriteSet['fall' + this.lastDirection]);


    }
  }

  jump() {
    if (this.isOnTheGround) {
      this.hasUsedDoubleJump = false;
      this.velocity.y = -this.jumpHeight;
    } else if (this.hasDoubleJump && !this.hasUsedDoubleJump) {
      this.velocity.y = -this.jumpHeight * 0.8;
      this.hasUsedDoubleJump = true;
    } else {
      return;
    }

    this.playAnimation(this.spriteSet['jump' + this.lastDirection], true);
  }

  takeDamage(damage) {
    this.health -= damage;
    this.healthBar.style.width = Math.floor(this.health / 10) + '%';
    this.playAnimation(this.spriteSet['hit' + this.lastDirection], true);

    if (this.health <= 0) {
      console.log(this.enemy.name);

    }
  }


}




