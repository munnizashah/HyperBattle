import { env, c } from '../game.js'

export class Sprite {
    constructor({
        position = { x: 0, y: 0 }, /* when you set a parameter to a value this means it's the default value (if you give another value it changes)*/
        velocity = { x: 0, y: 0 }
    }) {

        this.position = position
        this.velocity = velocity
        this.height = 150

    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= env.height) {

            this.velocity.y = 0

        } else {

            this.velocity.y += env.gravity
        }

    }

}