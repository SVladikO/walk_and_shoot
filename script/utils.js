function getRadianAngle(fromX, toX, fromY, toY) {
    var dx = toX - fromX;
    var dy = toY - fromY;

    return Math.atan2(dy, dx);
}

function isInCanvas(modifiedPosition, max) {
    return !isOutOfRange(modifiedPosition, 0 + style.user.dorRadius, max - style.user.dorRadius)
}

function isOutOfRange(num, min, max) {
    return num <= min || num >= max;
}

function isInRange(num, min, max) {
    return num >= min && num <= max;
}

/**
 * Check is new user coordinates move on block
 *iK
 * @param x
 * @param y
 * @returns {boolean}
 */
function isOnBlock(objX, objY, objRadius) {
    const rect = rectangles.find(rec => {
        const [x, y, width, height] = rec;
        const minX = x - objRadius;
        const maxX = minX + width + objRadius * 2;
        const minY = y - objRadius;
        const maxY = minY + height + objRadius * 2;

        const is = isInRange(objX, minX, maxX) && isInRange(objY, minY, maxY)
        // console.log(1234, is, `x ${minX} < ${userX} < ${maxX} ::: y ${minY} < ${userY} < ${maxY}`)

        return is;
    })

    return !!rect;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function clearCanvas() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function prepareCanvas(ctx) {
    ctx.fillStyle = style.board.bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function showNoBulletNotification() {
    window.no_bullets_notification.textContent = 'Press "SPACE" to reload. No bullets. ';
    window.no_bullets_notification.style.display = 'flex';
}

function hideNoBulletNotification() {
    window.no_bullets_notification.textContent = 'Press "SPACE" to reload. No bullets. ';
    window.no_bullets_notification.style.display = 'none';

}

function mute() {
    isMute = true;
}

function unmute() {
    isMute = false;
}

function updateWeapon(n) {
    const weapons = {
        weapon_gun1,
        weapon_gun2,
        weapon_gun3,
    }

    user.weapon = weapons[n]
    user.bulletAmount = weapons[n].bulletAmount;
    hideNoBulletNotification();
}

function showAvaliableLevels() {
    const parentId = 'game_levels_to_choose';
    levels.forEach((level, index) => {
        addCanvasLevel(index, parentId)
        styleBoard(index, parentId)

    });

    levels.map(renderRecatangle)

    function renderRecatangle(level, index) {
        const canvasId = getGameLevelId(index);
        const canvas = document.getElementById(canvasId)
        const ctx = canvas.getContext("2d");
        const canvasScreen = getScreen(canvas.width, canvas.height);
        const rectangles = level.getRectangles(canvasScreen);

        rectangles.forEach(rec => {
            const [x, y, width, height] = rec;
            ctx.rect(x, y, width, height);
            ctx.fillStyle = style.box.bgColor;
            ctx.fill()
            ctx.strokeStyle = style.box.borderColor;
            ctx.lineWidth = style.box.borderLineWidth;
            ctx.stroke();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
        })
    }

    function getGameLevelId(levelIndex) {
        return `game_level_${levelIndex}`
    }

    function addCanvasLevel(levelIndex, parentId) {
        var newCanvas = document.createElement('canvas');
        newCanvas.id = getGameLevelId(levelIndex);
        newCanvas.width = 200;
        newCanvas.height = 100;
        newCanvas.style.zIndex = 8;
        // newCanvas.style.position = "absolute";
        // newCanvas.style.border = "1px solid";

        var title = document.createElement('h2');
        title.innerHTML = `Level ${levelIndex + 1}`;
        var wrapper = document.createElement('div');
        wrapper.classList.add("level_wrapper");
        wrapper.append(newCanvas)
        wrapper.append(title)
        wrapper.onclick = function () {
            game_over_notification.style.display  = 'none';
            game_levels_board.style.display  = 'none';
            restartGame();
            changeLevel(levelIndex);
        }

        const parent = document.getElementById(parentId);
        parent.append(wrapper);
    }

    function styleBoard(levelIndex) {
        const boardId = getGameLevelId(levelIndex);
        const newCanvas = document.getElementById(boardId)
        const ctx = newCanvas.getContext("2d");
        prepareCanvas(ctx);
    }
}

function getScreen(width, height) {
    return {
        screenStepX: width / 20,
        screenStepY: height / 10,


        getHorizontalSide(pice) {
            return this.screenStepX * pice;
        },
        getVerticalSide(pice) {
            return this.screenStepY * pice;
        }
    }
}

function showGameOver() {
    if (user.isDead()) {
        game_over_notification.style.display = 'flex';
        game_over_level.textContent = `Level ${levelId + 1}`
    }
}

function restartGame() {
    flyBullets=[];
    if (user.isDead()) {
        no_bullets_notification.textContent = '';
        no_bullets_notification.style.display = 'none';

    }
}

function tryAgain() {
    changeLevel(levelId)
    game_over_notification.style.display = 'none';
}

function showAllLevels() {
    game_over_notification.style.display = 'none';
    game_levels_board.style.display = 'flex';
}

function renderMoveDirectionCenter() {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const x = width - moveTabletDirectionCenter.x;
    const y = height - moveTabletDirectionCenter.y;

    ctx.moveTo(x, y);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 300);
    ctx.fillStyle = "red";
    ctx.fill();
}

function getUser(weapon = weapon_gun1) {
    return new Unit(screenMainCanvas.getHorizontalSide(1), screenMainCanvas.getVerticalSide(1), 20, UNIT_TYPE.USER, weapon, 'userIconId1')
}

function getUnit(x, y, health, weapon, unitImageId, isRandomWalkDisabled) {
    return new Unit(x, y, health, UNIT_TYPE.UNIT, weapon, unitImageId, isRandomWalkDisabled);
}

function getPistolUnit(x, y, isRandomWalkDisabled, health = 3) {
    return getUnit(x, y, health, weapon_gun1, 'userIconId2', isRandomWalkDisabled);
}

function getAkUnit(x, y, isRandomWalkDisabled, health = 4) {
    return getUnit(x, y, health, weapon_gun2, 'userIconId2', isRandomWalkDisabled);
}

function getGunUnit(x, y, isRandomWalkDisabled, health = 4) {
    return getUnit(x, y, health, weapon_gun3, 'userIconId2', isRandomWalkDisabled);
}