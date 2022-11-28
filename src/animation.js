
//Paths NEED to be relative to the src folder

export const spriteSets = {}

spriteSets.background = {
    background: {
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
        source: '../assets/characters/Eskil/EskilIdle.png',
        frames: 4,
        framesHold: 17, //how many actual frames (FPS) between each frame of the sprite
    },
    idleLeft: {
        source: '../assets/characters/Eskil/EskilIdle.png',
        frames: 4,
        framesHold: 17, //how many actual frames (FPS) between each frame of the sprite
    },
    runRight: {
        source: '../assets/characters/Eskil/EskilRun.png',
        frames: 8,
        framesHold: 12
    },
    runLeft: {
        source: '../assets/characters/Eskil/EskilRun.png',
        frames: 8,
        framesHold: 12
    },
    jumpRight: {
        source: '../assets/characters/Eskil/EskilJump.png',
        frames: 2,
        framesHold: 10
    },
    jumpLeft: {
        source: '../assets/characters/Eskil/EskilJump.png',
        frames: 2,
        framesHold: 10
    },
    fallLeft: {
        source: '../assets/characters/Eskil/EskilFall.png',
        frames: 2,
        framesHold: 10
    },
    fallRight: {
        source: '../assets/characters/Eskil/EskilFall.png',
        frames: 2,
        framesHold: 10
    },
    attackRight: {
        source: '../assets/characters/Eskil/EskilAttack1.png',
        frames: 4,
        framesHold: 10,
    },
    attackLeft: {
        source: '../assets/characters/Eskil/EskilAttack1.png',
        frames: 4,
        framesHold: 10,
    },
    hit: {
        source: '../assets/characters/Eskil/EskilTakeHit.png',
        frames: 7,
        framesHold: 10
    },
    options: {
        scale: 4,
        offset: { x: -170, y: -127 }
    }

}


spriteSets.jonathan = {
    idleRight: {
        source: '../assets/characters/Jonathan/SpriteSheet/jonathanIdle.png',
        frames: 4,
        framesHold: 17, //how many actual frames (FPS) between each frame of the sprite
    },
    idleLeft: {
        source: '../assets/characters/Jonathan/SpriteSheetFlipped/jonathanIdleF.png',
        frames: 4,
        framesHold: 17, //how many actual frames (FPS) between each frame of the sprite
    },
    runRight: {
        source: '../assets/characters/Jonathan/SpriteSheet/jonathanRun.png',
        frames: 8,
        framesHold: 12
    },
    runLeft: {
        source: '../assets/characters/Jonathan/SpriteSheetFlipped/jonathanRunF.png',
        frames: 8,
        framesHold: 12
    },
    jumpRight: {
        source: '../assets/characters/Jonathan/SpriteSheet/jonathanJump.png',
        frames: 2,
        framesHold: 10
    },
    jumpLeft: {
        source: '../assets/characters/Jonathan/SpriteSheetFlipped/jonathanJumpF.png',
        frames: 2,
        framesHold: 10
    },
    fallLeft: {
        source: '../assets/characters/Jonathan/SpriteSheetFlipped/jonathanFallF.png',
        frames: 2,
        framesHold: 10
    },
    fallRight: {
        source: '../assets/characters/Jonathan/SpriteSheet/jonathanFall.png',
        frames: 2,
        framesHold: 10
    },
    attackRight: {
        source: '../assets/characters/Jonathan/SpriteSheet/jonathanAttack1.png',
        frames: 4,
        framesHold: 10,
    },
    attackLeft: {
        source: '../assets/characters/Jonathan/SpriteSheetFlipped/jonathanAttack1F.png',
        frames: 4,
        framesHold: 10,
    },
    hitRight: {
        source: '../assets/characters/Jonathan/SpriteSheet/jonathanTakeHit.png',
        frames: 4,
        framesHold: 5
    },
    hitLeft: {
        source: '../assets/characters/Jonathan/SpriteSheetFlipped/jonathanTakeHitF.png',
        frames: 4,
        framesHold: 5
    },
    options: {
        scale: 4,
        offset: { x: -160, y: -127 }
    }

}