import { Sprite } from './src/sprite.js';
import { AttackBox, isColliding } from './src/attackbox.js';
import { spriteSets } from './src/animation.js';


const canvas = document.querySelector('canvas');

export const c = canvas.getContext('2d');

export const env = {
    width: 1024,
    height: 576,
    gravity: .6,
    displayAttackBoxes: false
}

export const renderQueue = [];

canvas.width = env.width;
canvas.height = env.height;

c.fillRect(0, 0, canvas.width, canvas.height)


const playerOne = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    hasGravity: true,
    spriteSet: spriteSets.ronin
})


playerOne.attacks = {
    first: new AttackBox(playerOne, { isShooting: true })
}

const playerTwo = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    hasGravity: true

})


playerOne.enemy = playerTwo;
playerTwo.enemy = playerOne;

const background = new Sprite({ spriteSet: spriteSets.background });


renderQueue.push(background, playerOne, playerTwo);


function animate() {
    window.requestAnimationFrame(animate); // this creates an infinite loop. 
    // c.fillStyle = 'black';
    // c.fillRect(0, 0, canvas.width, canvas.height);

    renderQueue.forEach(element => {
        element.update();
    });


}

animate();


window.addEventListener('keydown', (e) => {
    if (e.key === 'p') {
        playerOne.attacks.first.attack();
    }
    if (e.key === 'd') {
        playerOne.velocity.x = 3;
    }
    if (e.key === 'a') {
        playerOne.velocity.x = -3;
    }
})

window.addEventListener('keyup', (e) => {
    if (e.key === 'd') {
        playerOne.velocity.x = 0;
    }
    if (e.key === 'a') {
        playerOne.velocity.x = 0;
    }
})