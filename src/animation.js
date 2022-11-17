
//Paths NEED to be relative to the src folder

export const spriteSets = {}

spriteSets.background = {
    background: {
        source: '../assets/test-assets/background.png',
        frames: 1,
        framesHold: 100,
    },
    options: {
        scale: 1,
        offset: { x: 0, y: 0 }
    }
}

spriteSets.ronin = {
    idle: {
        source: '../assets/test-assets/Ronin/spr_RoninIdle_strip.png',
        frames: 8,
        framesHold: 17, //how many actual frames (FPS) between each frame of the sprite
    },
    runRight: {
        source: '../assets/test-assets/Ronin/spr_RoninRunRight_strip.png',
        frames: 10,
        framesHold: 12
    },
    runLeft: {
        source: '../assets/test-assets/Ronin/spr_RoninRunLeft_strip.png',
        frames: 10
    },
    jump: {
        source: '../assets/test-assets/Ronin/spr_RoninJump_strip.png',
        frames: 15,
        framesHold: 10
    },
    attack: {
        source: '../assets/test-assets/Ronin/spr_RoninAttack_strip.png',
        frames: 25,
        framesHold: 10
    },
    hit: {
        source: '../assets/test-assets/Ronin/spr_RoninGetHit_strip.png',
        frames: 7,
        framesHold: 10
    },
    options: {
        scale: 4,
        offset: { x: -100, y: -40 }
    }

}


