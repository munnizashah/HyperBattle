
//Paths NEED to be relative to the src folder

export const spriteSets = {}

spriteSets.background = {
    boxingRing: {
        source: '../assets/backgrounds/usable/boxing-ring.png',
        frames: 1,
        framesHold: 100,
    },
    forest: {
        source: '../assets/backgrounds/usable/forest-road.png',
        frames: 1,
        framesHold: 100,
    },

    options: {
        scale: 1,
        offset: { x: 0, y: 0 }
    }
}

spriteSets.ronin = {
    idleRight: {
        source: '../assets/test-assets/Ronin/spr_RoninIdle_strip.png',
        frames: 8,
        framesHold: 17, //how many actual frames (FPS) between each frame of the sprite
    },
    idleLeft: {
        source: '../assets/test-assets/Ronin/spr_RoninIdleLeft_strip.png',
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
        frames: 10,
        framesHold: 12
    },
    jumpRight: {
        source: '../assets/test-assets/Ronin/spr_RoninJump_strip.png',
        frames: 15,
        framesHold: 10
    },
    jumpLeft: {
        source: '../assets/test-assets/Ronin/spr_RoninJumpLeft_strip.png',
        frames: 15,
        framesHold: 10
    },
    attackRight: {
        source: '../assets/test-assets/Ronin/spr_RoninAttack_strip.png',
        frames: 25,
        framesHold: 10,
        offset: { x: -180, y: -100 }
    },
    attackLeft: {
        source: '../assets/test-assets/Ronin/spr_RoninAttackLeft_strip.png',
        frames: 25,
        framesHold: 10,
        offset: { x: -180, y: -100 }
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



spriteSets.eskil = {
    idleRight: {
        source: '../assets/characters/Eskil/EskilIdleRight.png',
        frames: 4,
        framesHold: 17, //how many actual frames (FPS) between each frame of the sprite
    },
    idleLeft: {
        source: '../assets/characters/Eskil/EskilIdleLeft.png',
        frames: 4,
        framesHold: 17, //how many actual frames (FPS) between each frame of the sprite
    },
    runRight: {
        source: '../assets/characters/Eskil/EskilRunRight.png',
        frames: 8,
        framesHold: 12
    },
    runLeft: {
        source: '../assets/characters/Eskil/EskilRunLeft.png',
        frames: 8,
        framesHold: 12
    },
    jumpRight: {
        source: '../assets/characters/Eskil/EskilJumpRight.png',
        frames: 2,
        framesHold: 10
    },
    jumpLeft: {
        source: '../assets/characters/Eskil/EskilJumpLeft.png',
        frames: 2,
        framesHold: 10
    },
    fallRight: {
        source: '../assets/characters/Eskil/EskilFallRight.png',
        frames: 2,
        framesHold: 10
    },
    fallLeft: {
        source: '../assets/characters/Eskil/EskilFallLeft.png',
        frames: 2,
        framesHold: 10
    },
    attackRight: {
        source: '../assets/characters/Eskil/EskilAttack1Right.png',
        frames: 4,
        framesHold: 10,
    },
    attackLeft: {
        source: '../assets/characters/Eskil/EskilAttack1Left.png',
        frames: 4,
        framesHold: 10,
    },
    shotAttackRight: {
        source: '../assets/characters/Eskil/EskilAttack2Right.png',
        frames: 4,
        framesHold: 10,
    },
    shotAttackLeft: {
        source: '../assets/characters/Eskil/EskilAttack2Left.png',
        frames: 4,
        framesHold: 10,
    },
    hitRight: {
        source: '../assets/characters/Eskil/EskilTakeHitRight.png',
        frames: 4,
        framesHold: 10
    },
    hitLeft: {
        source: '../assets/characters/Eskil/EskilTakeHitLeft.png',
        frames: 4,
        framesHold: 10
    },
    deathRight: {
        source: '../assets/characters/Eskil/EskilDeathRight.png',
        frames: 4,
        framesHold: 10
    },
    deathLeft: {
        source: '../assets/characters/Eskil/EskilDeathLeft.png',
        frames: 4,
        framesHold: 10
    },
    options: {
        scale: 4,
        offset: { x: -170, y: -127 }
    }

}



spriteSets.jonathan = {
    idleRight: {
        source: '../assets/characters/jonathan/jonathanIdleRight.png',
        frames: 4,
        framesHold: 17, //how many actual frames (FPS) between each frame of the sprite
    },
    idleLeft: {
        source: '../assets/characters/jonathan/jonathanIdleLeft.png',
        frames: 4,
        framesHold: 17, //how many actual frames (FPS) between each frame of the sprite
    },
    runRight: {
        source: '../assets/characters/jonathan/jonathanRunRight.png',
        frames: 8,
        framesHold: 12
    },
    runLeft: {
        source: '../assets/characters/jonathan/jonathanRunLeft.png',
        frames: 8,
        framesHold: 12
    },
    jumpRight: {
        source: '../assets/characters/jonathan/jonathanJumpRight.png',
        frames: 2,
        framesHold: 10
    },
    jumpLeft: {
        source: '../assets/characters/jonathan/jonathanJumpLeft.png',
        frames: 2,
        framesHold: 10
    },
    fallRight: {
        source: '../assets/characters/jonathan/jonathanFallRight.png',
        frames: 2,
        framesHold: 10
    },
    fallLeft: {
        source: '../assets/characters/jonathan/jonathanFallLeft.png',
        frames: 2,
        framesHold: 10
    },
    shotAttackRight: {
        source: '../assets/characters/jonathan/jonathanAttack1Right.png',
        frames: 4,
        framesHold: 10,
    },
    shotAttackLeft: {
        source: '../assets/characters/jonathan/jonathanAttack1Left.png',
        frames: 4,
        framesHold: 10,
    },
    attackRight: {
        source: '../assets/characters/jonathan/jonathanAttack2Right.png',
        frames: 4,
        framesHold: 10,
    },
    attackLeft: {
        source: '../assets/characters/jonathan/jonathanAttack2Left.png',
        frames: 4,
        framesHold: 10,
    },
    hitRight: {
        source: '../assets/characters/jonathan/jonathanTakeHitRight.png',
        frames: 4,
        framesHold: 10
    },
    hitLeft: {
        source: '../assets/characters/jonathan/jonathanTakeHitLeft.png',
        frames: 4,
        framesHold: 10
    },
    deathRight: {
        source: '../assets/characters/jonathan/jonathanDeathRight.png',
        frames: 4,
        framesHold: 10
    },
    deathLeft: {
        source: '../assets/characters/jonathan/jonathanDeathLeft.png',
        frames: 4,
        framesHold: 10
    },
    options: {
        scale: 4,
        offset: { x: -160, y: -127 }
    }

}