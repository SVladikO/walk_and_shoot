import {isUnutVisiable} from '../util/util';

export const run = (game) => {
  

// user_health_id.addEventListener("change", (event) => user.step = +event.target.value);

    window.addEventListener("keyup", (event) => game.inPlay && game.user.disableMove(event.key));

    setInterval(() => {
        if (!game.inPlay) {
            return
        }

        game.enemies
            // .filter(unit => game.user.isVisibleForMe(unit.x, unit.y))
            .filter(enemy => isUnutVisiable(enemy, game))
            .forEach(enemy => enemy.shootSingle())

        game.enemies.forEach(enemy => enemy.isShootEnabled = true);

        setTimeout(() => {
            game.enemies.forEach(enemy => enemy.isShootEnabled = false);
        }, 1000);

    }, 2000)

}
