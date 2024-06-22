import {UNIT_TYPE} from "./type";
import {GUN_TYPE} from '../gun/type';
import {weapon_gun3} from "../gun/gun";
import Bullet from '../bullet/bullet';

import {
    getRadianAngle,
    getRandom,
    isInCanvas,
    isOnBlock,
    isInRange,
    playSound,
    hideNoBulletNotification,
    showNoBulletNotification
} from '../../util/util'

export class Unit {
    constructor(
        x = 10,
        y = 10,
        health = 100,
        unitType,
        weapon = weapon_gun3,
        userIconId,
        isRandomMoveEnable,
        step = 1,
        dorRadius = 15,
        visibilityRadius = 200,
        radius = 300
    ) {
        this.x = x;
        this.y = y;
        this.unitType = unitType;

        this.isRandomMoveEnable = isRandomMoveEnable;
        this.isShootEnabled = false;
        this.shootSpeedIndicator = weapon.shootSpeedStep;
        this.showFireFromGunImage = 0;
        this.weapon = weapon;
        this.bulletAmount = weapon.bulletAmount;
        this.userIconId = userIconId;
        this.step = step;
        this.randomMoveDedline = 10;
        this.health = health;
        this.radius = radius;
        this.visibilityRadius = 300;
        this.angle = 0;

        this.moveDirection = {
            'w': false, //up
            's': false, //down
            'a': false, //left
            'd': false, //right
        }

        this.moveDirectionOpposite = {
            'w': 's', //up
            's': 'w', //down
            'a': 'd', //left
            'd': 'a', //right
        }
    }

    disableOppositeMove(key) {
        this.moveDirection[key] = false;
    }

    /**
     * Let unit(gangster) move randomly.
     */
    unitRandomDirection() {
        if (!this.isRandomMoveEnable) {
            return
        }

        if (!this.randomMoveDedline) {
            const randomIndex = getRandom(0, 4);
            const buttons = Object.keys(this.moveDirection)
            buttons.forEach(key => this.moveDirection[key] = false)

            this.moveDirection[buttons[randomIndex]] = true;
            this.randomMoveDedline = getRandom(3, 30);
        }

        this.randomMoveDedline--;
    }

    move() {
        if (this.isDead()) {
            return;
        }

        if (this.moveDirection.w) {
            const modifiedY = this.y - this.step;
            this.disableOppositeMove(this.moveDirectionOpposite['w'])

            if (isInCanvas(modifiedY, window.canvas.height) && !isOnBlock(this.x, modifiedY, window.style.user.dorRadius)) {
                this.y = modifiedY;
            }
        }
        if (this.moveDirection.s) {
            const modifiedY = this.y + this.step;
            this.disableOppositeMove(this.moveDirectionOpposite['s'])

            if (isInCanvas(modifiedY, window.canvas.height) && !isOnBlock(this.x, modifiedY, window.style.user.dorRadius)) {
                this.y = modifiedY;
            }
        }
        if (this.moveDirection.a) {
            const modifiedX = this.x - this.step;
            this.disableOppositeMove(this.moveDirectionOpposite['a'])

            if (isInCanvas(modifiedX, window.canvas.width) && !isOnBlock(modifiedX, this.y, window.style.user.dorRadius)) {
                this.x = modifiedX;
            }
        }
        if (this.moveDirection.d) {
            const modifiedX = this.x + this.step;
            this.disableOppositeMove(this.moveDirectionOpposite['d'])

            if (isInCanvas(modifiedX, window.canvas.width) && !isOnBlock(modifiedX, this.y, window.style.user.dorRadius)) {
                this.x = modifiedX;
            }
        }
    }

    /**
     * Unit will check is user in visible distance. Is it possible to shoot ?
     *
     * @returns {*}
     */
    isVisibleForMe(userX, userY) {
        const radius = this.visibilityRadius;

        const isInRangeX = isInRange(userX, this.x - radius, this.x + radius)
        const isInRangeY = isInRange(userY, this.y - radius, this.y + radius)

        return isInRangeX && isInRangeY;
    }

    reloadGun() {
        if (this.bulletAmount) {
            return
        }
        this.bulletAmount = this.weapon.reloadBulletAmount;
        !window.isMute && this.unitType === UNIT_TYPE.USER && playSound(this.weapon.sound.reload, 0.4);
        hideNoBulletNotification()
    }

    shoot() {
        if (this.isDead()) {
            return;
        }

        if (!this.shootSpeedIndicator) {
            this.shootSpeedIndicator = this.weapon.shootSpeedStep;

            if (this.bulletAmount <= 0 && this.unitType === UNIT_TYPE.USER) {
                !window.isMute && this.unitType === UNIT_TYPE.USER && playSound('./sound/gun-empty.mp3', 0.4)
                showNoBulletNotification()
                // setTimeout(() => {
                //     this.reloadGun()
                // }, 1000);
                return;
            }

            this.bulletAmount -= 1;
            !window.isMute && this.unitType === UNIT_TYPE.USER && playSound(this.weapon.sound.shoot, .1);
            const bullets = this.getBullets()
            this.showFireFromGunImage = 3;
            window.flyBullets = [...window.flyBullets, ...bullets];
        }

        this.shootSpeedIndicator--;

    }

    /**
     * Enable user move.
     *
     * @param key - Pressed keyboard key.
     */
    enableMove(key) {
        this.moveDirection[key.toLowerCase()] = true;
        //disable opposite move
        this.moveDirection[key.toLowerCase()] = true;

    }

    /**
     * Disable user move.
     *
     * @param key - Pressed keyboard key.
     */
    disableMove(key) {
        this.moveDirection[key.toLowerCase()] = false;
    }

    getBullets() {
        const startBulletX = this.x + Math.cos(this.angle) * 45;
        const startBulletY = this.y + Math.sin(this.angle) * 45;
        return this.weapon.shoot(this.angle, angle => new Bullet(startBulletX, startBulletY, angle, this.weapon, this.unitType));
    }

    render(directionX, directionY) {
        this.updateAngle(directionX, directionY)

        window.ctx.beginPath();
        window.ctx.arc(this.x, this.y, window.style.user.dorRadius, 0, 300);

        let bg;

        switch (this.weapon.type) {
            case GUN_TYPE.PISTOL:
                bg = 'red';
                break;
            case GUN_TYPE.AK:
                bg = 'blue';
                break;
            case GUN_TYPE.GUN:
                bg = 'green';
                break;
            default:
                bg = 'orange';
        }
// Point of transform origin
//         window.ctx.arc(0, 0, 5, 0, 2 * Math.PI);
//         window.ctx.fillStyle = "blue";
//         window.ctx.fill();

        window.ctx.translate(this.x, this.y)      // 1. Set x,y where we will rotate.
        window.ctx.rotate(this.angle)             // 2. Rotate
        window.ctx.translate(-this.x, -this.y)    // 3. Move back coordinates to (HZ)

        if (!this.isDead()) {
            // 4. Draw gun
            const weaponImg = document.getElementById(this.weapon.imageId);
            window.ctx.drawImage(weaponImg, this.x, this.y - 5, 75, 40);

            // 4. Draw fire
            if (this.showFireFromGunImage) {
                const weaponImgg = document.getElementById('gunFireIconId1');
                window.ctx.drawImage(weaponImgg, this.x + 20, this.y - 23, 75, 40);
                this.showFireFromGunImage -= 1;
            }
        }


        const userIconId1 = document.getElementById(this.isDead() ? 'unitDeadIconId' : this.userIconId);

        window.ctx.drawImage(userIconId1, this.x - 30, this.y - 25, 50, 50);

        window.ctx.rotate(-this.angle)             // 5. Rotate back
        window.ctx.setTransform(1, 0, 0, 1, 0, 0); // 6. Reset center back.

        // window.ctx.beginPath();
        // window.ctx.arc(this.x, this.y, 10, 0, 300);
        // window.ctx.fillStyle = 'black';
        // window.ctx.fill();
        // window.ctx.fillStyle = 'white';
        // window.ctx.textAlign = "center";
        // window.ctx.font = "14px Arial";
        // window.ctx.fillText(this.health, this.x, this.y + 5);

        // const unitImage = document.getElementById(this.userIconId);
        // window.ctx.drawImage(unitImage, this.x - 25, this.y - 25, 50, 50);

    }

    updateAngle(toX, toY) {
        this.angle = getRadianAngle(this.x, toX, this.y, toY)
    }

    updateAngleForMobile(fromX, fromY) {
        const width = window.ctx.canvas.width;
        const height = window.ctx.canvas.height;
        const toX = 0; //width - moveTabletDirectionCenter.x;
        const toY = 0; //height - moveTabletDirectionCenter.y;

        var dx = fromX - toX;
        var dy = fromY - toY;
        this.angle = Math.atan2(dy, dx);
    }

    renderDirection() {
        const step = 1;

        const circlX = this.x + Math.cos(this.angle) * this.visibilityRadius;
        const circlY = this.y + Math.sin(this.angle) * this.visibilityRadius;

        window.ctx.moveTo(circlX, circlY);
        window.ctx.arc(this.x, this.y, this.visibilityRadius, this.angle - step, this.angle + step, false);
        window.ctx.lineTo(circlX, circlY);
        window.ctx.strokeStyle = 'black';
        window.ctx.lineWidth = 1;

        window.ctx.stroke();
    }

    isDead() {
        return this.health < 0;
    }

    /**
     * Check is bullet on unit to minus unit health.
     *
     * @param x - bullet x.
     * @param y - bullet y.
     */
    isBulletOn(x, y) {
        const radius = window.style.user.dorRadius;
        const isInRangeX = isInRange(x, this.x - radius, this.x + radius)
        const isInRangeY = isInRange(y, this.y - radius, this.y + radius)

        return isInRangeX && isInRangeY;
    }

}
