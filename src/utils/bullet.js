import {getDistance, isOnBlock, isOutOfRange} from './utils'
import {UNIT_TYPE} from "./types";
import {game} from './game';
import {style} from './settings';

export default class Bullet {
    constructor(fromX, fromY, angle, weapon, ownerType) {
        this.startX = fromX; // we need to calculate max distance
        this.startY = fromY; // we need to calculate max distance
        this.lastX = fromX;
        this.lastY = fromY;
        this.angle = angle;
        this.weapon = weapon; //
        this.damage = 2; //
        this.radius = 5; //
        this.flyStep = 8 + game.gameSpeed;
        this.currentDistance = 0; //
        this.isDead = false;
        this.isKickedBox = false;
        this.ownerType = ownerType
    }

    isMaxDistance() {
        const distance = getDistance(this.startX, this.lastX, this.startY, this.lastY)
        return distance > this.weapon.maxDistance;
    }

    move() {
        const angle = game.isUserControlBulletDirection && this.ownerType === UNIT_TYPE.USER ? game.user.angle : this.angle;
        this.lastX = this.lastX + Math.cos(angle) * this.flyStep;
        this.lastY = this.lastY + Math.sin(angle) * this.flyStep;

        if (this.isMaxDistance() && game.isBulletFlyLimited) {
            this.isDead = true;
            return;
        }

        const _isOnBlock = isOnBlock(this.lastX, this.lastY, style.bullet.radius);
        const _isOutOfX = isOutOfRange(this.lastX, 0, game.canvas_board.width)
        const _isOutY = isOutOfRange(this.lastY, 0, game.canvas_board.height)

        this.isKickedBox = _isOnBlock;
        this.isDead = _isOnBlock || _isOutOfX || _isOutY;

        //For UNIT bullet check does it kick USER
        if (this.ownerType === UNIT_TYPE.UNIT && game.user.isBulletOn(this.lastX, this.lastY)) {
            game.user.health -= this.weapon.damage;
            this.isDead = true;
            //changeUserHealth();
        }

        //For unit bullet check does it kick UNIT
        if (this.ownerType === UNIT_TYPE.USER) {
            game.enemies.forEach(unit => {
                if (unit.isDead()) {
                    return;
                }
                if (unit.isBulletOn(this.lastX, this.lastY)) {
                    unit.health -= this.weapon.damage;
                    this.isDead = true;
                }
            })
        }
    }

    render() {
        game.ctx.beginPath();
        const angle = game.isUserControlBulletDirection && this.ownerType === UNIT_TYPE.USER ? game.user.angle : this.angle;
        const imageFlyBullet = document.getElementById(this.weapon.imageFlyBulletId);
        game.ctx.translate(this.lastX, this.lastY);      // 1. Set x,y where we will rotate.
        game.ctx.rotate(angle);                          // 2. Rotate
        game.ctx.translate(-this.lastX, -this.lastY);    // 3. Move back coordinates to (HZ)

        const imgWidth = game.isBigBulletsImageEnabled ? 60 : 20;
        const imgheight = game.isBigBulletsImageEnabled ? 30 : 10;

        game.ctx.drawImage(imageFlyBullet, this.lastX - 10, this.lastY - 10, imgWidth, imgheight);

        game.ctx.rotate(game.user.angle);                // 5. Rotate back
        game.ctx.setTransform(1, 0, 0, 1, 0, 0);         // 6. Reset center back.


        if (this.isKickedBox) {
            // !isUserSoundEnabled && playSound('./sound/missed.mp3', 0.01);
        }

        game.ctx.fill()
    }
}