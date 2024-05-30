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

function prepareCanvas() {
    ctx.fillStyle = style.board.bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}