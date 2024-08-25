import {isUnutVisiable} from '../util/util';

export const run = (game) => {
    window.addEventListener("keypress", (event) => {
        game.user.enableMove(event.key)
        event.key === ' ' && game.user.reloadGun()
        game.drawAll();
    });

// user_health_id.addEventListener("change", (event) => user.step = +event.target.value);

    window.addEventListener("keyup", (event) => game.inPlay && game.user.disableMove(event.key));

    setInterval(() => {
        if (!game.inPlay) {
            return
        }

        game.enemies
            // .filter(unit => game.user.isVisibleForMe(unit.x, unit.y))
            .filter(enemy => isUnutVisiable(enemy, game))
            .forEach(enemy => enemy.shoot())

        game.enemies.forEach(enemy => enemy.isShootEnabled = true);

        setTimeout(() => {
            game.enemies.forEach(enemy => enemy.isShootEnabled = false);
        }, 1000);

    }, 2000)

}
