import {getScreen} from '../util/util';



window.ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let flyBullets = [];
let mousePositionX = 0;
let mousePositionY = 0;

let isMute = false;

showAvaliableLevels();

const moveTabletDirectionCenter = {
    x: 120,
    y: 120,
}

loop();


function loop() {
    user.move();
    drawAll();
    window.requestAnimationFrame(loop);
}

function drawAll() {
    clearCanvas(ctx, canvas);
    prepareCanvas(ctx);
    renderRectangles()

    // health.textContent = 'Health: ' + user.health + ' / Bullets amount: ' + user.bulletAmount

    flyBullets.forEach(bullet => bullet.move());
    flyBullets.forEach(bullet => bullet.render());
    flyBullets = flyBullets.filter(bullet => !bullet.isDead);

    user.isShootEnabled && user.shoot();
    user.render(mousePositionX, mousePositionY);

    units
        // .filter(unit => user.isVisibleForMe(unit.x, unit.y))
        .filter(isUnutVisiable)
        .forEach(unit => (user.isShootEnabled || unit.isShootEnabled) && unit.shoot())
    units.forEach(unit => unit.unitRandomDirection())
    units.forEach(unit => unit.move())
    units
        // .filter(unit => user.isVisibleForMe(unit.x, unit.y))
        .filter(unit => isUnutVisiable(unit) || unit.isDead())
        .forEach(unit => unit.render(user.x, user.y))

    // units = units.filter(unit => !unit.isDead())

    showGameOver();

    renderEnd(finishCoordinates)
    // renderMoveDirectionCenter()
}

function isUnutVisiable(unit) {
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
        const radianFromUserToUnit = getRadianAngle(user.x, unit.x, user.y, unit.y);
        const distanceBetweenUserAndUnit = getDistance(user.x, unit.x, user.y, unit.y);

        const dots = [];

        const DOT_DISTANCE_STEP = 2;
        let dotDistanceAccumulator = 0;
        let lastX = user.x;
        let lastY = user.y;

        while (dotDistanceAccumulator < distanceBetweenUserAndUnit) {
            lastX = lastX + Math.cos(radianFromUserToUnit) * DOT_DISTANCE_STEP;
            lastY = lastY + Math.sin(radianFromUserToUnit) * DOT_DISTANCE_STEP;

            dots.push([lastX, lastY])

            dotDistanceAccumulator += DOT_DISTANCE_STEP;
        }

        return dots;
    }
}


function renderEnd(c) {
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillText('FINISH', c.x, c.y);
}

// enableMobileNavigation();

window.canvas.addEventListener("mousedown", () => user.isShootEnabled = true);
window.canvas.addEventListener("mouseup", () => user.isShootEnabled = false);

window.addEventListener("keypress", (event) => {
    user.enableMove(event.key)
    event.key === ' ' && user.reloadGun()

    drawAll();
});

// user_health_id.addEventListener("change", (event) => user.step = +event.target.value);

window.addEventListener("keyup", (event) => user.disableMove(event.key));
window.canvas.addEventListener("mousemove", e => {
    mousePositionX = e.clientX;
    mousePositionY = e.clientY - 80
});

// game_level_wrapper.addEventListener("click", e => {
//   if (e.target.localName !== 'div' || e.target.id === 'game_level_wrapper') {
//     return;
//   }
//
//   const currentLevel = e.target.innerHTML;
//   const index = currentLevel - 1;
//   selectedLevel.innerHTML = `Level: ${currentLevel}/10`;
//
//   restartGame();
//   changeLevel(index);
// });


setInterval(() => {
    units.forEach(unit => unit.isShootEnabled = true);

    setTimeout(() => {
        units.forEach(unit => unit.isShootEnabled = false);
    }, 1000);

}, 2000)
