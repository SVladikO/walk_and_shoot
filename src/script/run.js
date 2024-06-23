import {isUnutVisiable} from '../util/util';

export const run = (game) => {
    loop();

    function loop() {
        if (game.user?.isDead()) {
            game.inPlay = false;
        }

        game.drawAll();
        window.requestAnimationFrame(loop);
    }

    window.addEventListener("keypress", (event) => {
        game.user.enableMove(event.key)
        event.key === ' ' && game.user.reloadGun()
        game.drawAll();
    });

// user_health_id.addEventListener("change", (event) => user.step = +event.target.value);

    window.addEventListener("keyup", (event) => game.inPlay && game.user.disableMove(event.key));

    game.canvas_board.addEventListener("mousemove", e => {
        game.mousePositionX = e.clientX;
        game.mousePositionY = e.clientY - 50
    });

    game.canvas_board.addEventListener("mousedown", () => {
        game.user.shoot()
    });

    setInterval(() => {
        if (!game.inPlay) {
            return
        }

        game.units
            // .filter(unit => game.user.isVisibleForMe(unit.x, unit.y))
            .filter(unit => isUnutVisiable(unit, game))
            .forEach(unit => unit.shoot())

        game.units.forEach(unit => unit.isShootEnabled = true);

        setTimeout(() => {
            game.units.forEach(unit => unit.isShootEnabled = false);
        }, 1000);

    }, 2000)

}
