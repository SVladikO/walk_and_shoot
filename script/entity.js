function playSound(src, volume = 0.2) {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play()
}

class Unit {
    constructor(
        x = 10,
        y = 10,
        health = 100,
        unitType,
        weapon = weapon_gun3,
        userIconId,
        isRandomMoveDisabled = true,
        step = 1,
        dorRadius = 15,
        visibilityRadius = 200,
        radius = 300
    ) {
        this.x = x;
        this.y = y;
        this.unitType = unitType;

        this.isRandomMoveDisabled = isRandomMoveDisabled;
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
        this.visibilityRadius = weapon.maxDistance;
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
        if (this.isRandomMoveDisabled) {
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
        if (this.moveDirection.w) {
            const modifiedY = this.y - this.step;
            this.disableOppositeMove(this.moveDirectionOpposite['w'])

            if (isInCanvas(modifiedY, canvas.height) && !isOnBlock(this.x, modifiedY, style.user.dorRadius)) {
                this.y = modifiedY;
            }
        }
        if (this.moveDirection.s) {
            const modifiedY = this.y + this.step;
            this.disableOppositeMove(this.moveDirectionOpposite['s'])

            if (isInCanvas(modifiedY, canvas.height) && !isOnBlock(this.x, modifiedY, style.user.dorRadius)) {
                this.y = modifiedY;
            }
        }
        if (this.moveDirection.a) {
            const modifiedX = this.x - this.step;
            this.disableOppositeMove(this.moveDirectionOpposite['a'])

            if (isInCanvas(modifiedX, canvas.width) && !isOnBlock(modifiedX, this.y, style.user.dorRadius)) {
                this.x = modifiedX;
            }
        }
        if (this.moveDirection.d) {
            const modifiedX = this.x + this.step;
            this.disableOppositeMove(this.moveDirectionOpposite['d'])

            if (isInCanvas(modifiedX, canvas.width) && !isOnBlock(modifiedX, this.y, style.user.dorRadius)) {
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
        !isMute && this.unitType === UNIT_TYPE.USER && playSound(this.weapon.sound.reload, 0.4);
        hideNoBulletNotification()
    }

    shoot() {
        if (!this.shootSpeedIndicator) {
            this.shootSpeedIndicator = this.weapon.shootSpeedStep;

            if (this.bulletAmount <= 0 && this.unitType === UNIT_TYPE.USER) {
                !isMute && this.unitType === UNIT_TYPE.USER && playSound('./public/sound/gun-empty.mp3', 0.4)
                showNoBulletNotification()
                // setTimeout(() => {
                //     this.reloadGun()
                // }, 1000);
                return;
            }

            this.bulletAmount -= 1;
            !isMute && this.unitType === UNIT_TYPE.USER && playSound(this.weapon.sound.shoot, .1);
            const bullets = this.getBullets()
            this.showFireFromGunImage = 3;
            flyBullets = [...flyBullets, ...bullets];
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
//         ctx.arc(0, 0, 5, 0, 2 * Math.PI);
//         ctx.fillStyle = "blue";
//         ctx.fill();

        ctx.translate(this.x, this.y)      // 1. Set x,y where we will rotate.
        ctx.rotate(this.angle)             // 2. Rotate
        ctx.translate(-this.x, -this.y)    // 3. Move back coordinates to (HZ)

        // 4. Draw gun
        const weaponImg = document.getElementById(this.weapon.imageId);
        ctx.drawImage(weaponImg, this.x, this.y - 5, 75, 40);

        // 4. Draw fire
        if (this.showFireFromGunImage) {
            const weaponImgg = document.getElementById('gunFireIconId1');
            ctx.drawImage(weaponImgg, this.x + 20, this.y - 23, 75, 40);
            this.showFireFromGunImage -= 1;
        }

        const userIconId1 = document.getElementById(this.userIconId);
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
        var dx = toX - this.x;
        var dy = toY - this.y;

        this.angle = Math.atan2(dy, dx);
    }

    updateAngleForMobile(fromX, fromY) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const toX = width - moveTabletDirectionCenter.x;
        const toY = height - moveTabletDirectionCenter.y;

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

class Bullet {
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
        const distance = calcDistance(this.startX, this.startY, this.lastX, this.lastY)

        return distance > this.weapon.maxDistance;

        function calcDistance(x1, y1, x2, y2) {
            const X = x2 - x1;
            const Y = y2 - y1;
            return Math.sqrt(X * X + Y * Y);
        }
    }

    move() {
        this.lastX = this.lastX + Math.cos(this.angle) * this.flyStep;
        this.lastY = this.lastY + Math.sin(this.angle) * this.flyStep;

        if (this.isMaxDistance()) {
            this.isDead = true;
            return;
        }

        const _isOnBlock = isOnBlock(this.lastX, this.lastY, style.bullet.radius);
        const _isOutOfX = isOutOfRange(this.lastX, 0, canvas.width)
        const _isOutY = isOutOfRange(this.lastY, 0, canvas.height)

        this.isKickedBox = _isOnBlock;
        this.isDead = _isOnBlock || _isOutOfX || _isOutY;

        //For UNIT bullet check does it kick USER
        if (this.ownerType === UNIT_TYPE.UNIT && user.isBulletOn(this.lastX, this.lastY)) {
            user.health -= this.weapon.damage;
            this.isDead = true;
        }

        //For unit bullet check does it kick UNIT
        if (this.ownerType === UNIT_TYPE.USER) {
            units.forEach(unit => {
                if (unit.isBulletOn(this.lastX, this.lastY)) {
                    unit.health -= this.weapon.damage;
                    this.isDead = true;
                }
            })
        }
    }

    render() {
        ctx.beginPath();
        ctx.arc(this.lastX, this.lastY, this.isDead ? this.bulletDeadRadius : style.bullet.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.isDead ? style.bullet.bgColorCrashed : style.bullet.bgColor;

        if (this.isKickedBox) {
            // !isMute && playSound('./public/sound/missed.mp3', 0.01);
        }

        ctx.fill()
    }
}