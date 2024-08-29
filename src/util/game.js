import {
    isUnutVisiable,
    clearCanvas,
    prepareCanvas,
    renderRectangles,
    showGameOver,
} from "./util";
import {getUser} from "../entity/unit";
import {getScreen} from '../util/screen';

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
    init(updateBulletsAmountUI) {
        this.boardWidth = window.innerWidth  - 10;
        this.boardHeigh = window.innerHeight  - 70;

        this.updateBulletsAmountUI = updateBulletsAmountUI;

        this.canvas_board = document.getElementById('canvas_game_board');
        this.ctx = this.canvas_board.getContext("2d");
        this.ctx.canvas.width = this.boardWidth;
        this.ctx.canvas.height = this.boardHeigh;

        this.static_canvas_board = document.getElementById('static_canvas_game_board');
        this.static_ctx = this.static_canvas_board.getContext("2d");
        this.static_ctx.canvas.width = this.boardWidth;
        this.static_ctx.canvas.height = this.boardHeigh;

        this.isShootModeAuto = false
        this.mousePositionX = 0;
        this.mousePositionY = 0;

        this.ctx.canvas.width = this.boardWidth;
        this.ctx.canvas.height = this.boardHeigh;

        this.unitSpeedStep = 1;
        this.isMute = false;
        this.inPlay = false;
        this.levelId = 0;
        this.flyBullets = [];
        this.user = null; //getUser();
        this.enemies = null;// levels[this.levelId].getEnemies(screenMainCanvas);
        this.rectangles = null;// levels[this.levelId].getRectangles(screenMainCanvas);
        this.finishCoordinates = null;//levels[this.levelId].getFinishCoordinates(screenMainCanvas);

        this.canvas_board.addEventListener("mousemove", e => {
            this.mousePositionX = e.clientX;
            this.mousePositionY = e.clientY - 50
        });

        window.addEventListener("keypress", (event) => {
            game.user.enableMove(event.key)             // user movement
            if (event.key === ' ') {
                game.user.reloadGun(); // reload weapon
                this.updateBulletsAmountUI()
            }
            game.drawAll();
            
        });

        this.canvas_board.addEventListener("mousedown", (game => () => {
                if (game.isShootModeAuto) {
                    game.user.isShootEnabled = true;
                } else {
                    game.user.shootSingle();
                }

                this.updateBulletsAmountUI()
            })(game)
        );

       this.canvas_board.addEventListener("mouseup", (game => () => game.user.isShootEnabled = false)(game));
    
        const self = this;
        loop();

        function loop() {
            if (self?.user?.isDead()) {
                self.inPlay = false;
            }

            if (self.inPlay) {
                self.drawAll();
            }

            window.requestAnimationFrame(loop);
        }
    }

    start(levelIndex) {
        const levels = getLocalStorage(LOCAL_STORAGE_KEY.LEVELS);
        this.levelId = levelIndex;
        this.inPlay = true;
        this.user = getUser();
        this.user.reloadGun()
        this.flyBullets = [];
        this.rectangles = screenMainCanvas.getBoxes(levels[levelIndex].blockIds);
        this.enemies = screenMainCanvas.getEnemies(levels[levelIndex].enemies);
        clearCanvas(this.static_ctx);
        renderRectangles(this.static_ctx, this.rectangles)
        console.log('start(', {levelIndex, rec: this.rectangles})

    }

    stop() {
        this.inPlay = false;
        this.enemies = [];
        this.rectangles = [];
    }

    drawAll() {
        if (!this.inPlay) {
            return
        }
        clearCanvas(this.ctx);
        // prepareCanvas(this.ctx, {width: this.boardWidth, height: this.boardHeigh});

        this.flyBullets.forEach(bullet => bullet.move());
        this.flyBullets.forEach(bullet => bullet.render());
        this.flyBullets = this.flyBullets.filter(bullet => !bullet.isDead);
        this.user.render(game.mousePositionX, game.mousePositionY, this.ctx);

        this.enemies.forEach(enemy => enemy.unitRandomDirection())
        this.enemies.forEach(enemy => enemy.move())
        this.enemies
            // .filter(unit => this.user.isVisibleForMe(unit.x, unit.y))
            .filter(enemy => isUnutVisiable(enemy, this) || enemy.isDead())
            .forEach(enemy => enemy.render(this.user.x, this.user.y, this.ctx))

        // this.enemies = this.enemies.filter(unit => !unit.isDead())

        showGameOver(this);

        this.renderEnd();

        if (this.isShootModeAuto) {
            this.enemies
                // .filter(unit => game.user.isVisibleForMe(unit.x, unit.y))
                .filter(enemy => isUnutVisiable(enemy, this))
                .forEach(enemy => enemy.shootAutomaticaly())

            this.user.shootAutomaticaly();
            this.isShootModeAuto && this.updateBulletsAmountUI()
        }

        this.user.move();
    }

    renderEnd() {
        this.ctx.beginPath();
        this.ctx.font = "30px Arial";
        // this.ctx.fillText('FINISH', this.finishCoordinates.x, this.finishCoordinates.y);
    }
}

export const game = new Game();


