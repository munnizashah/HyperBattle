import { env, c } from '../game.js'

export class Sprite {
    constructor({
        position = { x: 0, y: 0 },
        velocity = { x: 0, y: 0 },
        width = 70,
        height = 150,
        color = 'rgba(255, 255, 255, 0.5)',
        hasGravity = false,
        spriteSet,
        randomSprite = false
    }) {

        this.position = position;
        this.velocity = velocity;
        this.hasGravity = hasGravity;

        this.color = color;
        this.width = width;
        this.height = height;


        //CREATE IMAGE SPRITE
        if (spriteSet) {
            this.spriteSet = spriteSet;
            this.image = new Image();

            //RANDOM SPRITE (BACKGROUND)
            if (randomSprite) {

                const spriteList = Object.values(this.spriteSet)

                const randomIndex = Math.floor(Math.random() * (spriteList.length - 1));

                const sprite = spriteList[randomIndex]

                this.playAnimation(sprite);

            }

            c.imageSmoothingEnabled = false; //otherwise it smooths the images when scaling

            this.currentFrame = 0;
            this.framesElapsed = 0;

        }

    }

    get isLastFrame() {
        if (this.currentFrame < this.activeSprite.frames - 1) {
            return false;
        } else {
            return true;
        }
    }

    get isOnTheGround() {
        if (this.position.y + this.height + this.velocity.y >= env.height) {
            if (this.hasUsedDoubleJump) this.hasUsedDoubleJump = false
            return true

        } else {

            return false
        }
    }

    playAnimation(sprite, playOnce = false, callback = () => { }) {

        //CALLBACK
        if (this.activeSprite) {

            if (this.activeSprite.source === sprite.source) return;
            this.activeSprite.callback();

        }

        //SWITCH SPRITE
        this.activeSprite = sprite;
        this.image.src = this.activeSprite.source;
        this.activeSprite.playOnce = playOnce;
        this.activeSprite.callback = callback;

        /*
            if this sprite has offset or scale - set offset to it,
            otherwise set offset to that of the spriteSet (spriteSet.options)
        */
        this.offset = this.activeSprite.offset || this.spriteSet.options.offset;
        this.scale = this.activeSprite.scale || this.spriteSet.options.scale;

        this.currentFrame = 0;
        this.framesElapsed = 0;

    }

    draw() {
        //DRAW IMAGE
        if (this.activeSprite) {
            try {
                c.drawImage(
                    this.image,                                                         //the image we want to draw

                    //CROP SOURCE IMAGE
                    (this.image.width / this.activeSprite.frames * this.currentFrame),  //source X coord
                    0,                                                                  //source Y coord
                    this.image.width / this.activeSprite.frames,                        //source width - we want this devided by amount of frames
                    this.image.height,                                                  //source height

                    //DRAW IN CANVAS        
                    this.position.x + this.offset.x,                                    //image X coord
                    this.position.y + this.offset.y,                                    //image Y coord
                    (this.image.width / this.activeSprite.frames) * this.scale,         //desired width
                    this.image.height * this.scale                                      //desired height
                );
            } catch {
                debugger;
            }

        }

        //DRAW BOXES
        if (env.displayAttackBoxes) {
            c.fillStyle = this.color;
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    update() {
        this.draw();
        this.framesElapsed++;

        //CHANGE SPRITE FRAME
        if (this.activeSprite) {
            if (this.framesElapsed % this.activeSprite.framesHold === 0) {

                if (this.isLastFrame) {

                    if (this.activeSprite.playOnce) {
                        this.playAnimation(this.spriteSet['idle' + this.lastDirection])
                    }
                    this.currentFrame = 0;

                } else {
                    this.currentFrame++;
                }
            }
        }

        //UPDATE POSITION
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        //APPLY GRAVITY
        if (this.hasGravity) {
            if (this.position.y + this.height + this.velocity.y >= env.height) {

                this.velocity.y = 0;

            } else {

                this.velocity.y += env.gravity;
            }
        }
    }
}
