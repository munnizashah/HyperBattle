import { Sprite } from "./sprite.js";
import { endGame, env } from "../game.js";

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

    //player movement
    if (this.moving.right === this.moving.left) {

      if (this.isOnTheGround) {

        this.velocity.x = 0;

        this.playAnimation(this.spriteSet['idle' + this.lastDirection]);

      } else {

        //Air resistance
        this.velocity.x -= this.velocity.x * env.airResistance;

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

    //Can't escape screen

    if (this.position.x <= 0 && this.velocity.x < 0) {
      this.velocity.x = 0;
    }
    if (this.position.x + this.width >= env.width && this.velocity.x > 0) {
      this.velocity.x = 0;

    }

    //display fall animation
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


  takeDamage(damage, knockback) {


    this.health -= damage;
    this.healthBar.style.width = Math.floor(this.health / 10) + '%';
    this.playAnimation(this.spriteSet['hit' + this.lastDirection], true);

    if (knockback) this.velocity = { ...knockback };

    // this.velocity = { x: 10, y: -15 };

    if (this.enemy.lastDirection === 'Left') {
      this.velocity.x = -this.velocity.x
    }

    if (this.health <= 0) {
      let winner = document.getElementById('winnerText');
      winner.innerText = (`${this.enemy.name} WON!`)
      winner.style.display = "block"

      this.playAnimation(this.spriteSet['death' + this.lastDirection], true, () => {

        console.table(this.isLastFrame);

        endGame();



      });

    }

  }

  playAnimation(sprite, playOnce = false, callback = () => { }) {
    if (this.activeSprite) {
      if (sprite !== this.spriteSet['death' + this.lastDirection]) {
        if (!this.isLastFrame && this.activeSprite.playOnce) return console.log('Playonce animation cant be interrupted');

      }
    }

    super.playAnimation(sprite, playOnce, callback);

  }

}






