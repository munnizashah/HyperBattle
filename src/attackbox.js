import { c, env, renderQueue } from '../game.js'
import { Sprite } from './sprite.js'

export class AttackBox extends Sprite {
    constructor(player, {
        position = { ...player.position },
        velocity = { x: 3, y: 0 },
        isShooting,
        duration = 3000, //duration only applies for shooting attacks
        cooldown = 0,
        width = 150,
        height = 60,
        color = 'green',
        damage = 50,
        api

    }) {
        //Note that velocity IS NOT PASSED and is only applied when shooting
        super({ position, color }); //calling constructor function of parent class (Sprite)

        this.player = player; //Which player does the attack belong to?

        this.attackVelocity = velocity;

        this.width = width;
        this.height = height;

        this.damage = damage;
        this.isShooting = isShooting;

        if (this.isShooting) {
            this.animationName = 'shotAttack';
        } else {
            this.animationName = 'attack'
        }

        this.cooldown = cooldown;
        this.duration = duration;

        this.api = api;
        if (api) {
            this.image = new Image();
            this.isImage = true;

        }

        if (env.displayAttackBoxes) {
            renderQueue.push(this);
        }
    }

    get width() {
        if (this.activeSprite) {
            return this.image.width * this.activeSprite.scale;
        }
        return this._width
    }

    set width(width) {
        this._width = width;
    }

    get height() {
        if (this.activeSprite) {
            return this.image.height * this.activeSprite.scale;
        }
        return this._height
    }

    set height(height) {
        this._height = height;
    }

    attack() {
        if (this.isOnCooldown || this.currentlyShooting) return console.table(this.isOnCooldown, this.currentlyShooting);

        this.player.playAnimation(this.player.spriteSet[this.animationName + this.player.lastDirection],
            {
                playOnce: true,
                forceFullAnimation: true,
                callback: () => {
                    this.player.isAttacking = false;
                }
            });

        this.player.isAttacking = true;

        this.isOnCooldown = true;

        setTimeout(() => {
            this.isOnCooldown = false;
        }, this.cooldown);


        this.position = { ...this.player.position }; //Copy object without syncing them


        if (this.player.lastDirection === 'Left') {
            this.position.x = this.position.x - this.width / 2;
        }



        if (this.isShooting) {
            this.currentlyShooting = true;

            if (this.player.lastDirection === 'Right') {
                this.velocity.x = this.attackVelocity.x;

            } else {
                console.log('its going left!')
                this.velocity.x = -this.attackVelocity.x;

            }


            // this.velocity = this.attackVelocity;

            this.renderIndex = renderQueue.push(this) - 1; //returns length array

            this.shootingTimeout = setTimeout(() => {
                this.velocity = { x: 0, y: 0 };
                renderQueue.splice(this.renderIndex, 1);

                this.currentlyShooting = false;

                console.log('Attack missed')

            }, this.duration);

            //if there's an api - fetch image
            if (this.api) {
                fetch(this.api)
                    .then((response) => response.json())
                    .then((data) => {

                        this.image.src = data.url;

                        this.playAnimation({
                            source: data.url,
                            offset: { x: 0, y: 0 },
                            scale: .1,
                            frames: 1
                        });

                    });
            }


        } else { //normal / non-shooting attacks

            if (isColliding(this, this.player.enemy)) {
                console.log('Attack succesfull!')
                this.player.enemy.takeDamage(this.damage)
                //DAMAGE ENEMY CODE
            } else {
                console.log('Attack missed')
            }
        }



    }

    update() {
        super.update();


        //if shot lands
        if (this.currentlyShooting && isColliding(this, this.player.enemy)) {
            this.currentlyShooting = false;
            this.velocity = { x: 0, y: 0 };
            renderQueue.splice(this.renderIndex, 1);


            clearTimeout(this.shootingTimeout);
            this.player.enemy.takeDamage(this.damage)

            //DAMAGE ENEMY CODE
            console.log('Attack succesfull!')

        }
    }

    draw() {
        // if (this.image.src) debugger;
        super.draw(); //calling draw function of parent class (Sprite)
        if (env.displayAttackBoxes) {
            c.fillStyle = this.color;
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
}



export function isColliding(rect1, rect2) {


    rect1.sides = getSides(rect1);
    rect2.sides = getSides(rect2);

    // console.table({ attackBoxSides: rect1.sides, enemySides: rect2.sides });


    function getSides(rect) {

        const sides = {
            left: rect.position.x,
            top: rect.position.y,
            right: rect.position.x + rect.width,
            bottom: rect.position.y + rect.height
        };

        return sides;
    }

    if (
        rect1.sides.left < rect2.sides.right &&
        rect1.sides.right > rect2.sides.left &&
        rect1.sides.top < rect2.sides.bottom &&
        rect1.sides.bottom > rect2.sides.top
    ) {
        return true;
    }
    return false;
}

// export function isColliding(rect1, rect2) {


//     rect1.sides = getSides(rect1);
//     rect2.sides = getSides(rect2);

//     console.table({ attackBoxSides: rect1.sides, enemySides: rect2.sides });

//     function getSides(rect) {

//         const sides = {
//             left: rect.position.x,
//             top: rect.position.y,
//             right: rect.position.x + rect.width,
//             bottom: rect.position.y + rect.height
//         };

//         return sides;
//     }

//     if (
//         (rect1.sides.left < rect2.sides.right &&
//             rect1.sides.right > rect2.sides.left &&
//             rect1.sides.top < rect2.sides.bottom &&
//             rect1.sides.bottom > rect2.sides.top)
//         || (rect1.sides.left > rect2.sides.left &&
//             rect1.sides.left > rect2.sides.right &&
//             rect1.sides.top < rect2.sides.bottom &&
//             rect1.sides.bottom > rect2.sides.top)
//     ) {
//         return true;
//     }
//     return false;
// }
