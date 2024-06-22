import {getDistance, isOnBlock, isOutOfRange} from '../../util/util'
import {UNIT_TYPE} from "../unit/type";

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
        this.flyStep = 8;
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
        this.lastX = this.lastX + Math.cos(this.angle) * this.flyStep;
        this.lastY = this.lastY + Math.sin(this.angle) * this.flyStep;

        if (this.isMaxDistance()) {
            this.isDead = true;
            return;
        }

        const _isOnBlock = isOnBlock(this.lastX, this.lastY, window.style.bullet.radius);
        const _isOutOfX = isOutOfRange(this.lastX, 0, window.canvas.width)
        const _isOutY = isOutOfRange(this.lastY, 0, window.canvas.height)

        this.isKickedBox = _isOnBlock;
        this.isDead = _isOnBlock || _isOutOfX || _isOutY;

        //For UNIT bullet check does it kick USER
        if (this.ownerType === UNIT_TYPE.UNIT && window.user.isBulletOn(this.lastX, this.lastY)) {
            window.user.health -= this.weapon.damage;
            this.isDead = true;
        }

        //For unit bullet check does it kick UNIT
        if (this.ownerType === UNIT_TYPE.USER) {
            window.units.forEach(unit => {
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
        window.ctx.beginPath();
        window.ctx.arc(this.lastX, this.lastY, this.isDead ? this.bulletDeadRadius : window.style.bullet.radius, 0, 2 * Math.PI);
        window.ctx.fillStyle = this.isDead ? window.style.bullet.bgColorCrashed : window.style.bullet.bgColor;

        if (this.isKickedBox) {
            // !isMute && playSound('./sound/missed.mp3', 0.01);
        }

        window.ctx.fill()
    }
}