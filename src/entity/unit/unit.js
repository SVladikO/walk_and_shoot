import {UNIT_TYPE} from "./type";
import {GUN_TYPE} from '../gun/type';
import {weapon_gun3} from "../gun/gun";
import Bullet from '../bullet/bullet';
import {style} from '../../util/settings';
import {ctx, game} from '../../util/glob';
import {
    getRadianAngle,
    getRandom,
    isInCanvas,
    isOnBlock,
    isInRange,
    playSound,
    // hideNoBulletNotification,
    // showNoBulletNotification
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
        this.maxHealth = health;
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

            if (isInCanvas(modifiedY, window.innerHeight - 50) && !isOnBlock(this.x, modifiedY, style.user.dorRadius)) {
                this.y = modifiedY;
            }
        }
        if (this.moveDirection.s) {
            const modifiedY = this.y + this.step;
            this.disableOppositeMove(this.moveDirectionOpposite['s'])

            if (isInCanvas(modifiedY, window.innerHeight - 50) && !isOnBlock(this.x, modifiedY, style.user.dorRadius)) {
                this.y = modifiedY;
            }
        }
        if (this.moveDirection.a) {
            const modifiedX = this.x - this.step;
            this.disableOppositeMove(this.moveDirectionOpposite['a'])

            if (isInCanvas(modifiedX, window.innerWidth) && !isOnBlock(modifiedX, this.y, style.user.dorRadius)) {
                this.x = modifiedX;
            }
        }
        if (this.moveDirection.d) {
            const modifiedX = this.x + this.step;
            this.disableOppositeMove(this.moveDirectionOpposite['d'])

            if (isInCanvas(modifiedX, window.innerWidth) && !isOnBlock(modifiedX, this.y, style.user.dorRadius)) {
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
        this.bulletAmount = this.weapon.reloadBulletAmount;
        !game.isMute && this.unitType === UNIT_TYPE.USER && playSound(this.weapon.sound.reload, 0.4);
    }

    shoot() {
        if (this.isDead()) {
            return;
        }

        // if (!this.shootSpeedIndicator) {
        this.shootSpeedIndicator = this.weapon.shootSpeedStep;

        if (this.bulletAmount <= 0 && this.unitType === UNIT_TYPE.USER) {
            !game.isMute && this.unitType === UNIT_TYPE.USER && playSound('./sound/gun-empty.mp3', 0.4)
            // showNoBulletNotification()
            return;
        }

        this.bulletAmount -= 1;
        !game.isMute && this.unitType === UNIT_TYPE.USER && playSound(this.weapon.sound.shoot, .1);
        const bullets = this.getBullets()
        this.showFireFromGunImage = 3;
        game.flyBullets = [...game.flyBullets, ...bullets];
        // }

        // this.shootSpeedIndicator--;

        if (this.bulletAmount <= 0) {
            // showNoBulletNotification()
        }
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

        ctx.beginPath();
        ctx.arc(this.x, this.y, style.user.dorRadius, 0, 300);

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

        ctx.translate(this.x, this.y)      // 1. Set x,y where we will rotate.
        ctx.rotate(this.angle)             // 2. Rotate
        ctx.translate(-this.x, -this.y)    // 3. Move back coordinates to (HZ)

        if (!this.isDead()) {
            // 4. Draw gun
            const weaponImg = document.getElementById(this.weapon.imageId);
            ctx.drawImage(weaponImg, this.x, this.y - 5, 75, 40);

            // 4. Draw fire
            if (this.showFireFromGunImage) {
                const weaponImgg = document.getElementById('gunFireIconId1');
                ctx.drawImage(weaponImgg, this.x + 20, this.y - 23, 75, 40);
                this.showFireFromGunImage -= 1;
            }
        }


        const userIconId1 = document.getElementById(this.isDead() ? 'unitDeadIconId' : this.userIconId);

        ctx.drawImage(userIconId1, this.x - 30, this.y - 25, 50, 50);

        ctx.rotate(-this.angle)             // 5. Rotate back
        ctx.setTransform(1, 0, 0, 1, 0, 0); // 6. Reset center back.

        // ctx.beginPath();
        // ctx.arc(this.x, this.y, 10, 0, 300);
        // ctx.fillStyle = 'black';
        // ctx.fill();
        // ctx.fillStyle = 'white';
        // ctx.textAlign = "center";
        // ctx.font = "14px Arial";
        // ctx.fillText(this.health, this.x, this.y + 5);

        // const unitImage = document.getElementById(this.userIconId);
        // ctx.drawImage(unitImage, this.x - 25, this.y - 25, 50, 50);

    }

    updateAngle(toX, toY) {
        this.angle = getRadianAngle(this.x, toX, this.y, toY)
    }

    updateAngleForMobile(fromX, fromY) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
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

        ctx.moveTo(circlX, circlY);
        ctx.arc(this.x, this.y, this.visibilityRadius, this.angle - step, this.angle + step, false);
        ctx.lineTo(circlX, circlY);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;

        ctx.stroke();
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
        const radius = style.user.dorRadius;
        const isInRangeX = isInRange(x, this.x - radius, this.x + radius)
        const isInRangeY = isInRange(y, this.y - radius, this.y + radius)

        return isInRangeX && isInRangeY;
    }

}
