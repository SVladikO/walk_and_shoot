import {style} from './settings'
import {game} from './glob';
import {weapon_gun1, weapon_gun2, weapon_gun3} from '../entity/gun/gun'

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

export function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function clearCanvas(ctx, canvas_game_board) {
    ctx.fillRect(0, 0, canvas_game_board.width, canvas_game_board.height);
}

export function prepareCanvas(ctx, canvas_game_board) {
    ctx.fillStyle = style.board.bgColor;
    ctx.fillRect(0, 0, canvas_game_board.width, canvas_game_board.height)
}

export function showNoBulletNotification() {
    window.no_bullets_notification.textContent = 'Press "SPACE" to reload. No bullets. ';
    window.no_bullets_notification.style.display = 'flex';
}

export function hideNoBulletNotification() {
    window.no_bullets_notification.textContent = '';
    window.no_bullets_notification.style.display = 'none';

}

export function updateWeapon(n) {
    const weapons = {
        weapon_gun1,
        weapon_gun2,
        weapon_gun3,
    }

    window.user.weapon = weapons[n]
    window.user.bulletAmount = weapons[n].bulletAmount;
    hideNoBulletNotification();
}


export function getScreen(width, height) {
    return {
        screenStepX: width / 8,
        screenStepY: height / 3,

        getHorizontalSide(pice) {
            return this.screenStepX * pice;
        },
        getVerticalSide(pice) {
            return this.screenStepY * pice;
        }
    }
}

export function showGameOver(game) {
    if (game.user.isDead()) {
        hideNoBulletNotification();
        // game_over_notification.style.display = 'flex';
        // game_over_level.textContent = `Level ${levelId + 1}`
        game.flyBullets = [];
    }
}

export function restartGame() {
    hideNoBulletNotification()
}

export function tryAgain() {
    restartGame()
    game.changeLevel(window.levelId)
    // game_over_notification.style.display = 'none';
}

export function showAllLevels() {
    // game_over_notification.style.display = 'none';
    // game_levels_board.style.display = 'flex';
}

// export function renderMoveDirectionCenter() {
//     const width = window.ctx.canvas.width;
//     const height = window.ctx.canvas.height;
//     const x = width - moveTabletDirectionCenter.x;
//     const y = height - moveTabletDirectionCenter.y;
//
//     window.ctx.moveTo(x, y);
//     window.ctx.beginPath();
//     window.ctx.arc(x, y, 10, 0, 300);
//     window.ctx.fillStyle = "red";
//     window.ctx.fill();
// }

export function playSound(src, volume = 0.2) {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play()
}


export function getBoxes(screen, ids) {
    const boxes = [
        //row 1
        [0, 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(1), 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(2), 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(3), 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(4), 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(5), 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(6), 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(7), 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        // row 2
        [0, screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(1), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(2), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(3), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(4), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(5), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(6), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(7), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        // row 3
        [0, screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(1), screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(2), screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(3), screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(4), screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(5), screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(6), screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(7), screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
    ];

    return ids.map(id => boxes[id])
}

export function renderRectangles(ctx, rectangles) {
    rectangles.forEach(block => {
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