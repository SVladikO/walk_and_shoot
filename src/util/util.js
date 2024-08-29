import {style} from './settings'
import {game} from './game';

export function getRadianAngle(fromX, toX, fromY, toY) {
    var dx = toX - fromX;
    var dy = toY - fromY;

    return Math.atan2(dy, dx);
}

export function getDistance(fromX, toX, fromY, toY) {
    const X = toX - fromX;
    const Y = toY - fromY;
    return Math.sqrt(X * X + Y * Y);
}

export function isInCanvas(modifiedPosition, max) {
    return !isOutOfRange(modifiedPosition, 0 + style.user.dorRadius, max - style.user.dorRadius)
}

export function isOutOfRange(num, min, max) {
    return num <= min || num >= max;
}

export function isInRange(num, min, max) {
    return num >= min && num <= max;
}

/**
 * Check is new user coordinates move on block
 *iK
 * @param x
 * @param y
 * @returns {boolean}
 */
export function isOnBlock(objX, objY, objRadius) {
    const rect = game.rectangles.find(rec => {
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

export function createArrayFromLength(length) {
    const array = [];

    for (let i = 0; i < length; i++) {
        array.push(i);
    }

    return array;
}

export function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function prepareCanvas(ctx, canvas_game_board) {
    ctx.fillStyle = style.board.bgColor;
    ctx.fillRect(0, 0, canvas_game_board.width, canvas_game_board.height)
}

export function showGameOver(game) {
    if (game.user.isDead()) {
        game.flyBullets = [];
    }
}

export function playSound(src, volume = 0.2) {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play()
}

export function changeUserHealth() {
    const user_healt_progress = document.getElementById('user_healt_progress')
    const healthProgres = game.user.health * 100 / game.user.maxHealth
    user_healt_progress.value = healthProgres;
}

export function renderRectangles(ctx, rectangles) {
    rectangles.forEach(block => {
            ctx.beginPath();
            const [x, y, width, height] = block;
            ctx.rect(x, y, width, height);
            ctx.fillStyle = style.box.bgColor;
            ctx.fill()
            ctx.strokeStyle = style.box.borderColor;
            ctx.lineWidth = style.box.borderLineWidth;
            ctx.stroke();
            ctx.strokeStyle = style.box.borderColor;
            ctx.lineWidth = 1;
        }
    )
}

export function isUnutVisiable(unit, game) {
    const dots = getDotsOnUserUnitLine(unit);
    const isBlockBetween = dots.some(dot => isOnBlock(dot[0], dot[1], 1))
    return !isBlockBetween;

    /**
     * User can't see unit if block between them.
     * On a line between user and unit we create array of dot's and check if any of dots is in block.
     * If yes we don't show unit.
     * @param unit
     */
    function getDotsOnUserUnitLine(unit) {
        const radianFromUserToUnit = getRadianAngle(game.user.x, unit.x, game.user.y, unit.y);
        const distanceBetweenUserAndUnit = getDistance(game.user.x, unit.x, game.user.y, unit.y);

        const dots = [];

        const DOT_DISTANCE_STEP = 2;
        let dotDistanceAccumulator = 0;
        let lastX = game.user.x;
        let lastY = game.user.y;

        while (dotDistanceAccumulator < distanceBetweenUserAndUnit) {
            lastX = lastX + Math.cos(radianFromUserToUnit) * DOT_DISTANCE_STEP;
            lastY = lastY + Math.sin(radianFromUserToUnit) * DOT_DISTANCE_STEP;

            dots.push([lastX, lastY])

            dotDistanceAccumulator += DOT_DISTANCE_STEP;
        }

        return dots;
    }
}
