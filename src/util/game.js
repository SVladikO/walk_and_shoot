import {
    isUnutVisiable,
    clearCanvas,
    getScreen,
    prepareCanvas,
    renderRectangles,
    showGameOver,
} from "./util";
import {getUser} from "../entity/unit";

import {getLocalStorage, LOCAL_STORAGE_KEY} from './localstorage';

const headerHeight = 50
/**
 * We need this one to build block per level.
 * We cut bord on 20 horizontally, 10 vertically.
 * Our goal is make the same map on different screens.
 * That's why we need this function.
 * @type {{screenStepY: number, screenStepX: number, getHorizontalSide(), getVerticalSide()}}
 */
export const screenMainCanvas = getScreen(window.innerWidth, window.innerHeight - headerHeight);

class Game {
    init() {
        this.canvas_board = document.getElementById('canvas_game_board');
        this.ctx = this.canvas_board.getContext("2d");

        this.boardWidth = window.innerWidth;
        this.boardHeigh = window.innerHeight;

        this.mousePositionX = 0;
        this.mousePositionY = 0;

        this.ctx.canvas.width = this.boardWidth;
        this.ctx.canvas.height = this.boardHeigh;

        this.unitSpeedStep = 1;
        this.isMute = true;
        this.inPlay = false;
        this.levelId = 0;
        this.flyBullets = [];
        this.user = null; //getUser();
        this.units = null;// levels[this.levelId].getUnits(screenMainCanvas);
        this.rectangles = null;// levels[this.levelId].getRectangles(screenMainCanvas);
        this.finishCoordinates = null;//levels[this.levelId].getFinishCoordinates(screenMainCanvas);

        this.canvas_board.addEventListener("mousemove", e => {
            this.mousePositionX = e.clientX;
            this.mousePositionY = e.clientY - 50
        });
    }

    start(levelIndex) {
        const levels = getLocalStorage(LOCAL_STORAGE_KEY.LEVELS);
        console.log('game.start', {levels})
        this.levelId = levelIndex;
        this.inPlay = true;
        this.user = getUser();
        this.user.reloadGun()
        this.flyBullets = [];
        this.rectangles = screenMainCanvas.getBoxes(levels[levelIndex].blockIds);
        this.units = screenMainCanvas.getUnits(levels[levelIndex].enemies);
        // this.finishCoordinates = levels[levelIndex].getFinishCoordinates(screenMainCanvas);
    }

    stop() {
        this.inPlay = false;
        this.units = [];
        this.rectangles = [];
    }

    drawAll() {
        if (!this.inPlay) {
            return
        }
        clearCanvas(this.ctx, this.canvas_board);
        prepareCanvas(this.ctx, {width: this.boardWidth, height: this.boardHeigh});
        renderRectangles(this.ctx, this.rectangles)

        this.flyBullets.forEach(bullet => bullet.move());
        this.flyBullets.forEach(bullet => bullet.render());
        this.flyBullets = this.flyBullets.filter(bullet => !bullet.isDead);
        this.user.render(game.mousePositionX, game.mousePositionY, this.ctx);

        this.units.forEach(unit => unit.unitRandomDirection())
        this.units.forEach(unit => unit.move())
        this.units
            // .filter(unit => this.user.isVisibleForMe(unit.x, unit.y))
            .filter(unit => isUnutVisiable(unit, this) || unit.isDead())
            .forEach(unit => unit.render(this.user.x, this.user.y, this.ctx))

        // this.units = this.units.filter(unit => !unit.isDead())

        showGameOver(this);

        this.renderEnd()
        this.user.move();
    }

    renderEnd() {
        this.ctx.beginPath();
        this.ctx.font = "30px Arial";
        // this.ctx.fillText('FINISH', this.finishCoordinates.x, this.finishCoordinates.y);
    }
}

export const game = new Game();


