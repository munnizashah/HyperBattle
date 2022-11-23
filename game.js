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


const playerOne = new Sprite({
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

    renderQueue.forEach(element => {
        element.update();
    });

}

animate();

