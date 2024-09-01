import {
    isUnutVisiable,
    clearCanvas,
    renderRectangles,
    showGameOver,
} from "./util";
import {getUser} from "../entity/unit";
import {getScreen} from '../util/screen';

import {getLocalStorage, LOCAL_STORAGE_KEY} from './localstorage';

const headerHeight = 50

const distanceFromBorder = 40;


class Game {
    init(updateBulletsAmountUI) {

        ////// BORD RELATED \\\\\\\

        // As units may move out of board or be partially hidden
        // I made design to move from border on the same distance.
        this.boardWidthFrom = distanceFromBorder;
        this.boardWidthTo = window.innerWidth  - distanceFromBorder;
        this.boardHeightFrom = distanceFromBorder;
        this.boardHeightTo = window.innerHeight  - distanceFromBorder;

        this.boardWidth = window.innerWidth;
        this.boardHeigh = window.innerHeight;

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

        this.unitSpeedStep = 1;
        this.isMute = false;
        this.inPlay = false;
        this.levelId = 0;
        this.flyBullets = [];
        this.user = null; 
        this.enemies = null;
        this.rectangles = null;
        this.finishCoordinates = null;

        this.canvas_board.addEventListener("mousemove", e => {
            this.mousePositionX = e.clientX;
            this.mousePositionY = e.clientY - 50
        });

        window.addEventListener("keypress", (event) => {
            game.user.enableMove(event.key)   // user movement
            if (event.key === ' ') {
                game.user.reloadGun();        // reload weapon
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

    getWidthLength() {
        return this.boardWidthTo - this.boardWidthFrom;
    }

    getHeightLength() {
        return this.boardHeightTo - this.boardHeightFrom;
    }

    start(levelIndex) {
        /**
         * We need this one to build block per level.
         * We cut bord on 16 horizontally, 8 vertically.
         * Our goal is make the same map on different screens.
         * That's why we need this function.
         * @type {{screenStepY: number, screenStepX: number, getHorizontalSide(), getVerticalSide()}}
         */
        this.screenMainCanvas = getScreen(this.getWidthLength(), this.getHeightLength() - headerHeight);

        const levels = getLocalStorage(LOCAL_STORAGE_KEY.LEVELS);
        this.levelId = levelIndex;
        this.inPlay = true;
        this.user = getUser();
        this.user.reloadGun()
        this.flyBullets = [];
        this.rectangles = this.screenMainCanvas.getBoxes(levels[levelIndex].blockIds);
        this.enemies = this.screenMainCanvas.getEnemies(levels[levelIndex].enemies);
        
        this.renderStaticBoard()

        console.log('start(', {levelIndex, rec: this.rectangles})

    }

    renderStaticBoard() {
        this.moveStartDrawPoint(this.static_ctx)
        renderRectangles(this.static_ctx, this.rectangles)
    }

    moveStartDrawPoint(ctx) {
        ctx.translate(this.boardWidthFrom, this.boardHeightFrom) // move start point
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

        this.moveStartDrawPoint(this.ctx)
        
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


