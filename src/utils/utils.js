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

export function isInCanvas(modifiedPosition, min, max) {
    return !isOutOfRange(modifiedPosition, min , max)
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
 * @param objX User x coordinate
 * @param objY User y coordinate
 * @param objRadius User radius
 * @returns {boolean}
 */
export function isOnBlock(objX, objY, objRadius) {
    const rect = game.rectanglesForActiveBoard.find(rec => {
        const [x, y, width, height] = rec;
        const minX = x - objRadius;
        const maxX = minX + width + objRadius * 2;
        const minY = y - objRadius;
        const maxY = minY + height + objRadius * 2;

        return isInRange(objX, minX, maxX) && isInRange(objY, minY, maxY)
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
    user_healt_progress.value  = game.user.health * 100 / game.user.maxHealth
}

export function renderRectangle(ctx, block, options = {}) {
    const {
        backgroundColor = style.box.bgColor,
        borderColor=style.box.borderColor,
        isBgEnabled=true,
    } = options;

    ctx.beginPath();
    const [x, y, width, height] = block;
    ctx.rect(x, y, width, height);
    if (isBgEnabled) {
        ctx.fillStyle = backgroundColor;
        ctx.fill()
    }
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = style.box.borderLineWidth;
    ctx.stroke();
    ctx.strokeStyle = style.box.borderColor;
    ctx.lineWidth = 1;
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
