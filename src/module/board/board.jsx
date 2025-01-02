import React, {useEffect} from "react";

import {CanvasBoard, CanvasBoardWrapper} from "./board.style";

import {game} from "../../util/game";
import {levels} from "../../util/levels.data";

const Board = () => {
    useEffect(() => {
        const updateBulletsAmountUI = () => {};
        // setUserBulletAmount(game.user.bulletAmount);

        game.init(updateBulletsAmountUI);
        game.start(levels[0]);
        return () => game.removeListeners();

    }, []);

    return (
        <CanvasBoardWrapper id="canvas_board_wrapper">
            <CanvasBoard id="static_canvas_game_board"/>
            <CanvasBoard id="canvas_game_board"/>
        </CanvasBoardWrapper>
    )
}

export default Board;

// import {isUnutVisiable} from "../../util/util";

// setInterval(() => {
//     if (!game.inPlay) {
//         return
//     }
//
//     game.enemies
//         // .filter(unit => game.user.isVisibleForMe(unit.x, unit.y))
//         .filter(enemy => isUnutVisiable(enemy, game))
//         .forEach(enemy => enemy.shootSingle())
//
//     game.enemies.forEach(enemy => enemy.isShootEnabled = true);
//     setTimeout(() => game.enemies.forEach(enemy => enemy.isShootEnabled = false), 1000);
//
// }, 2000)
