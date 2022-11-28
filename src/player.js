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
    super({ position, velocity, hasGravity, spriteSet, lastDirection});
    this.moving = { right: false, left: false };//what's that mean?
    this.jumpHeight = jumpHeight;
    this.hasDoubleJump = hasDoubleJump;
    this.health = health;
    this.healthBar = healthBar;
    this.name = name;
    
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
    } else if (this.hasDoubleJump && !this.hasUsedDoubleJump && this.lastDirection === 'left') {
      this.velocity.y = -this.jumpHeight * 0.8;
      this.hasUsedDoubleJump = true;
    } else if(this.hasDoubleJump && !this.hasUsedDoubleJump && this.lastDirection === 'right') {
      this.velocity.y = -this.jumpHeight * 0.8;
      this.hasUsedDoubleJump = true;
    } else {
      return;
    }
  }

  isIdle() {
      if (this.lastDirection === 'left') 
      this.playAnimation('idleLeft')
      else this.playAnimation('idleRight')
      }
  

takeDamage (damage) {
  this.health -= damage;
  this.healthBar.style.width = Math.floor(this.health/10) + '%';

  if (this.health <= 0) {
    console.log(this.enemy.name);
  }
}

}




