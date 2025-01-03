import {UNIT_TYPE} from "./type";
import {weapon_gun3} from "../gun/gun";
import Bullet from '../bullet/bullet';
import {style} from '../../util/settings';
import {game} from '../../util/game';
import {
    getRadianAngle,
    getRandom,
    isInCanvas,
    isOnBlock,
    isInRange,
    playSound,
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
        this.shootSpeedAccamulator = weapon.shootSpeedStep;
        this.showFireFromGunImage = 0;
        this.weapon = weapon;
        this.bulletAmount = weapon.bulletAmount;
        this.userIconId = userIconId;
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

        const minY = game.boardHeightFrom;
        const maxY = game.boardHeightTo;

        const minX = game.boardWidthFrom;
        const maxX = game.boardWidthTo;

        if (this.moveDirection.w) {
            const modifiedY = this.y - game.unitSpeedStep;
            this.disableOppositeMove(this.moveDirectionOpposite['w'])

            // console.log('w', {modifiedY, minY, maxY});

            if (isInCanvas(modifiedY, minY, maxY) && !isOnBlock(this.x, modifiedY, style.user.dorRadius)) {
                this.y = modifiedY;
            }
        }

        if (this.moveDirection.s) {
            const modifiedY = this.y + game.unitSpeedStep;
            this.disableOppositeMove(this.moveDirectionOpposite['s'])

            // console.log('s', {modifiedY, minY, maxY});
            if (isInCanvas(modifiedY, minY, maxY) && !isOnBlock(this.x, modifiedY, style.user.dorRadius)) {
                this.y = modifiedY;
            }
        }

        if (this.moveDirection.a) {
            const modifiedX = this.x - game.unitSpeedStep;
            this.disableOppositeMove(this.moveDirectionOpposite['a'])
            // console.log('a', {modifiedX, minX, maxX});
            if (isInCanvas(modifiedX, minX, maxX) && !isOnBlock(modifiedX, this.y, style.user.dorRadius)) {
                this.x = modifiedX;
            }
        }
        if (this.moveDirection.d) {
            const modifiedX = this.x + game.unitSpeedStep;
            this.disableOppositeMove(this.moveDirectionOpposite['d'])
            // console.log('d', {modifiedX, minX, maxX}, game.boardWidthTo, game.boardWidth);
            if (isInCanvas(modifiedX, minX, maxX) && !isOnBlock(modifiedX, this.y, style.user.dorRadius)) {
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
        game.isSoundEnabled && this.unitType === UNIT_TYPE.USER && playSound(this.weapon.sound.reload, 0.4);
    }

    /**
     * One click one shoot.
     */
    shootSingle() {
        if (this.isDead()) {
            return;
        }

        //Empty gun sound for no bullets.
        if (this.bulletAmount <= 0 && this.unitType === UNIT_TYPE.USER) {
            game.isSoundEnabled && this.unitType === UNIT_TYPE.USER && playSound('./sound/gun-empty.mp3', 0.4)
            return;
        }

        this.bulletAmount -= 1;
        game.isSoundEnabled && this.unitType === UNIT_TYPE.USER && playSound(this.weapon.sound.shoot, .1);
        const bullets = this.getBullets()
        this.showFireFromGunImage = 3;
        game.flyBullets = [...game.flyBullets, ...bullets];
    }

    /**
     * Click and keep mouse to shoot automatically.
     */
    shootAutomaticaly() {
        const max = this.weapon.shootSpeedStep * this.bulletAmoun;

        for (let i = 0; i < max; i++) {
            if (!this.isShootEnabled || this.bulletAmount > 0) {
                return;
            }

            if (!this.shootSpeedAccamulator) {
                this.shootSpeedAccamulator = this.weapon.shootSpeedStep;
                this.shootSingle();
            }

            this.shootSpeedAccamulator--;
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

    renderBulletText(ctx) {
        if (this.isDead() || this.unitType !== UNIT_TYPE.USER) {
            return;
        }

        const x = this.x - 30;
        const y = this.y - 45;

        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.font = "12px Arial";
        ctx.fillText(`${this.bulletAmount}/${this.weapon.reloadBulletAmount} ${this.bulletAmount <= 0 ? ' - reload' : ''}`, x, y);
    }

    renderHealth(ctx) {
        if (this.isDead()) {
            return;
        }

        const x = this.x - 30;
        const y = this.y - 40;

        const progressHeight = 5;
        const progressWidth = 60;

        // Progress background.
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.fillStyle = "black";
        ctx.rect(x, y, progressWidth, progressHeight * 2 + 2);
        ctx.fill();

        /**
         * progressWidth - this.maxHealth
         * ???              - this.health
         */
        const healthLevel = progressWidth * this.health / this.maxHealth;
        const healthPercentage = 100 * this.health / this.maxHealth;
        // Health progress
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.fillStyle = getHealthColor(healthPercentage);
        ctx.rect(x, y, healthLevel, progressHeight);
        ctx.fill();

        const leftBulletAmount = progressWidth * this.bulletAmount / this.weapon.bulletAmount;

        // Bullets amount progress.
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.fillStyle = "blue";
        ctx.rect(x, y + progressHeight + 2, leftBulletAmount, progressHeight);
        ctx.fill();

        // Border
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "black";
        ctx.rect(x, y, progressWidth, progressHeight * 2 + 2);
        ctx.stroke();

        function getHealthColor(health) {
            if (health <= 30) {
                return '#fa2121';
            } else if (health <= 60) {
                return '#f09121';
            } else if (health <= 100) {
                return '#21f021';
            }
        }
    }

    render(directionX, directionY, ctx) {
        this.updateAngle(directionX, directionY)

        this.renderHealth(ctx);
        this.renderBulletText(ctx);

        ctx.beginPath();
        //  ctx.arc(this.x, this.y, style.user.dorRadius, 0, 300);
        //  ctx.stroke();


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

        // ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
    }

    updateAngle(toX, toY) {
        this.angle = getRadianAngle(this.x, toX, this.y, toY)
    }

    renderDirection(ctx) {
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
