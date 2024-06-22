import {game} from '../util/glob';
import {
    isOnBlock,
    clearCanvas,
    getDistance,
    showGameOver,
    prepareCanvas,
    getRadianAngle,
    renderRectangles,
} from '../util/util';

export const run = () => {
    const canvas_game_board = document.getElementById('canvas_game_board');
    const ctx = canvas_game_board.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;

    // ctx.canvas.width = window.innerWidth;
    // ctx.canvas.height = window.innerHeight;

    let flyBullets = [];
    let mousePositionX = 0;
    let mousePositionY = 0;

    let isMute = false;

    const moveTabletDirectionCenter = {
        x: 120,
        y: 120,
    }

    loop();

    function loop() {
        if (!game.inPlay) {
            return
        }
        drawAll();
        game.user.move();
        window.requestAnimationFrame(loop);
    }

    function drawAll() {
        clearCanvas(ctx, canvas_game_board);
        prepareCanvas(ctx, {width,height});
        renderRectangles(ctx, game.rectangles)

        // health.textContent = 'Health: ' + user.health + ' / Bullets amount: ' + user.bulletAmount

        flyBullets.forEach(bullet => bullet.move());
        flyBullets.forEach(bullet => bullet.render());
        flyBullets = flyBullets.filter(bullet => !bullet.isDead);

        game.user.isShootEnabled && game.user.shoot();
        game.user.render(mousePositionX, mousePositionY);

        game.units
            // .filter(unit => game.user.isVisibleForMe(unit.x, unit.y))
            .filter(isUnutVisiable)
            .forEach(unit => (game.user.isShootEnabled || unit.isShootEnabled) && unit.shoot())
        game.units.forEach(unit => unit.unitRandomDirection())
        game.units.forEach(unit => unit.move())
        game.units
            // .filter(unit => game.user.isVisibleForMe(unit.x, unit.y))
            .filter(unit => isUnutVisiable(unit) || unit.isDead())
            .forEach(unit => unit.render(game.user.x, game.user.y))

        // game.units = game.units.filter(unit => !unit.isDead())

        showGameOver(game);

        renderEnd(game.finishCoordinates)
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


    function renderEnd(c) {
        ctx.beginPath();
        ctx.font = "30px Arial";
        ctx.fillText('FINISH', c.x, c.y);
    }

// enableMobileNavigation();

    canvas_game_board.addEventListener("mousedown", () => game.user.isShootEnabled = true);
    canvas_game_board.addEventListener("mouseup", () => game.user.isShootEnabled = false);

    window.addEventListener("keypress", (event) => {
        game.user.enableMove(event.key)
        event.key === ' ' && game.user.reloadGun()

        drawAll();
    });

// user_health_id.addEventListener("change", (event) => user.step = +event.target.value);

    window.addEventListener("keyup", (event) => game.inPlay && game.user.disableMove(event.key));
    canvas_game_board.addEventListener("mousemove", e => {
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
        if (!game.inPlay) {
            return
        }

        game.units.forEach(unit => unit.isShootEnabled = true);

        setTimeout(() => {
            game.units.forEach(unit => unit.isShootEnabled = false);
        }, 1000);

    }, 2000)

}
