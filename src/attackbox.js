import { c, env, renderQueue, listenColliders } from '../game.js'
import { Sprite } from './sprite.js'

export class AttackBox extends Sprite {
    constructor(player, {
        position = player.position,
        velocity = { x: 3, y: 0 },
        isShooting,
        duration = 3000, //duration only applies for shooting attacks
        cooldown = 0,
        width = 130,
        height = 60,
        color = 'green',
        damage,
        spriteSrc

    }) {
        //Note that velocity IS NOT PASSED and is only applied when shooting
        super({ position, color }); //calling constructor function of parent class (Sprite)

        this.player = player; //Which player does the attack belong to?

        this.attackVelocity = velocity;

        this.width = width;
        this.height = height;

        this.damage = damage;
        this.spriteSrc = spriteSrc;
        this.isShooting = isShooting;
        this.cooldown = cooldown;
        this.duration = duration;



        if (env.displayAttackBoxes) {
            renderQueue.push(this);
        }
    }


    attack() {

        if (this.isOnCooldown) return;

        this.isOnCooldown = true;

        setTimeout(() => {
            this.isOnCooldown = false;
        }, this.cooldown);


        this.position = { ...this.player.position }; //Copy object without syncing them


        if (this.isShooting) {
            this.velocity = this.attackVelocity;
            let renderIndex = renderQueue.push(this); //returns index of pushed item

            let listenIndex = listenColliders.push({
                rect1: this,
                rect2: this.player.enemy,
                callback: () => {
                    this.velocity = { x: 0, y: 0 };
                    renderQueue.splice(renderIndex, 1);
                    listenColliders.splice(listenIndex, 1);

                    //DAMAGE ENEMY CODE
                }
            })

            setTimeout(() => {
                this.velocity = { x: 0, y: 0 };
                renderQueue.splice(renderIndex, 1);
                listenColliders.splice(listenIndex, 1);
            }, this.duration);


        } else { //normal / non-shooting attacks

            if (isColliding(this, this.player.enemy)) {
                console.log('Attack succesfull!')

                //DAMAGE ENEMY CODE
            } else {
                console.log('Attack missed')
            }
        }



    }

    draw() {
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