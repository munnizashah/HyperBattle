import { env, c } from '../game.js'

export class Sprite {
    constructor({
        position = { x: 0, y: 0 }, /* when you set a parameter to a value this means it's the default value (if you give another value it changes)*/
        velocity = { x: 0, y: 0 },
        width = 50,
        height = 150,
        color = 'red',
        hasGravity = false,
        spriteSet,
        imageSrc,
        scale = 1,
        frames = 1,
        framesHold = 17,
        offset = { x: 0, y: 0 },
        lastDirection

    }) {

        this.position = position;
        this.velocity = velocity;
        this.hasGravity = hasGravity;

        this.color = color;
        this.width = width;
        this.height = height;
        this.lastDirection = lastDirection;


        if (spriteSet) {
            this.spriteSet = spriteSet;

            this.isImage = true;

            this.image = new Image();

            this.playAnimation(Object.keys(spriteSet)[0]);

            c.imageSmoothingEnabled = false; //otherwise it smooths the images when scaling

        }

    }

    get isLastFrame() {
        if (this.currentFrame < this.activeSprite.frames - 1) {
            return false;
        } else {
            return true;
        }
    }

    get isOnTheGround (){
            if (this.position.y + this.height + this.velocity.y >= env.height) {

                return true

            } else {

                return false
            }
    }

    playAnimation(spriteName, playOnce = false, callback = () => { }) {
        // if ((this.image === this.spriteSet.attackLeft.image 
        // && 
        // this.isLastFrame === false) || 
        // (this.image === this.spriteSet.attackLeft.image 
        // && 
        // this.isLastFrame === false)) return;




        if (this.activeSprite) {
            if (this.activeSprite.constructor.name === spriteName) return;
            this.activeSprite.callback(); //call previous animation callback

        }


        this.activeSprite = this.spriteSet[spriteName];
        this.image.src = this.activeSprite.source;
        this.activeSprite.playOnce = playOnce;
        this.activeSprite.callback = callback;

        /*
            if this sprite has offset or scale - set offset to it,
            otherwise set offset to that of the spriteSet
        */
        this.offset = this.activeSprite.offset || this.spriteSet.options.offset;
        this.scale = this.activeSprite.scale || this.spriteSet.options.scale;

        this.currentFrame = 0;
        this.framesElapsed = 0;

    }

    draw() {

        if (this.isImage) {
            c.drawImage(
                this.image, //the image we want to draw

                //Here we decide what part of the source image we want
                (this.image.width / this.activeSprite.frames * this.currentFrame),  //source X coord
                0,                                                                               //source Y coord
                this.image.width / this.activeSprite.frames,                                     //source width - we want this devided by amount of frames
                this.image.height,                                                               //source height

                //here we decide how to print it in the canvas        
                this.position.x + this.offset.x,                                                 //image X coord
                this.position.y + this.offset.y,                                                 //image X coord
                (this.image.width / this.activeSprite.frames) * this.scale,                      //desired width
                this.image.height * this.scale                                                   //desired height
            );

        } else {
            c.fillStyle = this.color;
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    update() {
        this.draw();
        this.framesElapsed++;
        if (this.isImage) {
            if (this.framesElapsed % this.activeSprite.framesHold === 0) {

                if (this.isLastFrame) {
                    this.currentFrame = 0;
                    if (this.activeSprite.playOnce) {
                        this.playAnimation('idle')
                    }
                } else {
                    this.currentFrame++;
                }
            }
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.hasGravity) {
            if (this.position.y + this.height + this.velocity.y >= env.height) {

                this.velocity.y = 0;

            } else {

                this.velocity.y += env.gravity;
            }
        }


    }

}
