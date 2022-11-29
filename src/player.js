import { Sprite } from "./sprite.js";
import { env, playSound } from "../game.js";

export class Player extends Sprite {
  constructor({
    defaultPosition,
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
    super({ position: { ...defaultPosition }, velocity, hasGravity, spriteSet });
    this.defaultPosition = defaultPosition;
    this.moving = { right: false, left: false };
    this.jumpHeight = jumpHeight;
    this.hasDoubleJump = hasDoubleJump;
    this.health = health;
    this.healthBar = healthBar;
    this.name = name;

    this.lastDirection = lastDirection;

  }

  //UPDATE MOVEMENT
  update() {
    super.update();

    //PLAYER MOVEMENT
    if (this.moving.right === this.moving.left) {

      if (this.isOnTheGround) {

        this.velocity.x = 0;

        this.playAnimation(this.spriteSet['idle' + this.lastDirection]);

      } else {

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

    //CAN'T ESCAPE SCREEN
    //left side
    if (this.position.x <= 0 && this.velocity.x < 0) {
      this.velocity.x = 0;
      this.position.x = 0;

    }
    //right side
    if (this.position.x + this.width >= env.width && this.velocity.x > 0) {
      this.velocity.x = 0;
      this.position.x = env.width - this.width;

    }

    //FALL ANIMATION
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

    if (!env.gameRunning) return;

    this.health -= damage;

    //UPDATE GRAPHICS AND PLAY SOUND
    this.updateHealthBar()
    this.playAnimation(this.spriteSet['hit' + this.lastDirection], true);
    playSound('hit');


    //APPLY KNOCKBACK
    if (knockback) this.velocity = { ...knockback };

    if (this.enemy.lastDirection === 'Left') {
      this.velocity.x = -this.velocity.x
    }

    //CHECK DEATH
    if (this.health <= 0) {
      const winnerTextEl = document.getElementById('winnerText');
      winnerTextEl.innerText = (`${this.enemy.name} WON!`)

      const winnerOverlayEl = document.getElementById('winnerOverlay')
      winnerOverlayEl.style.display = "flex"

      this.playAnimation(this.spriteSet['death' + this.lastDirection], true, () => {

        console.table(this.isLastFrame);

        env.gameRunning = false;

      });

    }

  }

  updateHealthBar() {
    this.healthBar.style.width = Math.floor(this.health / 10) + '%';

  }

  //PREVENT INTERRUPTION OF DEATH ANIMATION
  playAnimation(sprite, playOnce = false, callback = () => { }) {

    if (this.activeSprite) {
      if (sprite !== this.spriteSet['death' + this.lastDirection]) {
        if (!this.isLastFrame && this.activeSprite.playOnce) return console.log('Death animation can not be interrupted');

      }
    }

    super.playAnimation(sprite, playOnce, callback);

  }

}






