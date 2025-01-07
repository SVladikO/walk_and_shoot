import {isUnutVisiable, renderRectangle, showGameOver,} from "./utils";
import {getUser} from "./constructors";
import {getScreen} from './screen';
import {style} from "./settings";

const distanceFromBorder = 70;

function getUserCoordinatesFromPosition({colIndex, rowIndex}, {screenStepX, screenStepY}) {
    // +1 because 0 is the first index in array
    return {
        x: (colIndex + 1) * screenStepX + screenStepX / 2,
        y: (rowIndex + 1) * screenStepY + screenStepY / 2,
    }
}

class Game {
    init({
             onSetIsUserDead,
             isUserSoundEnabled,
             gameSpeed,
             isEnemySoundEnabled,
             isBulletFlyLimited,
             isUserControlBulletDirection,
             isBigBulletsImageEnabled,
             isVisibleAllEnemy
         }) {
        this.onSetIsUserDead = onSetIsUserDead;
        this.isUserControlBulletDirection = isUserControlBulletDirection;
        this.isBigBulletsImageEnabled = isBigBulletsImageEnabled;
        this.isVisibleAllEnemy = isVisibleAllEnemy;

        ////// BORD RELATED \\\\\\\

        // As units may move out of board or be partially hidden
        // I made design to move from border on the same distance.
        this.boardWidthFrom = distanceFromBorder;
        this.boardWidthTo = window.innerWidth - distanceFromBorder;
        this.boardHeightFrom = distanceFromBorder;
        this.boardHeightTo = window.innerHeight - distanceFromBorder;

        this.boardWidth = window.innerWidth;
        this.boardHeigh = window.innerHeight;

        this.static_canvas_board = document.getElementById('static_canvas_game_board');
        this.static_ctx = this.static_canvas_board.getContext("2d");
        this.static_ctx.canvas.width = this.boardWidth;
        this.static_ctx.canvas.height = this.boardHeigh;

        this.canvas_board = document.getElementById('canvas_game_board');
        this.ctx = this.canvas_board.getContext("2d");
        this.ctx.canvas.width = this.boardWidth;
        this.ctx.canvas.height = this.boardHeigh;
        this.moveDrawPoint(this.ctx)

        this.mousePositionX = 0;
        this.mousePositionY = 0;

        this.gameSpeed = gameSpeed;
        this.isUserSoundEnabled = isUserSoundEnabled;
        this.isEnemySoundEnabled = isEnemySoundEnabled;
        game.isBulletFlyLimited = isBulletFlyLimited;
        this.inPlay = false;
        this.levelId = 0;
        this.flyBullets = [];
        this.user = null;
        this.enemies = null;
        this.rectangles = null;
        this.finishCoordinates = null;
        this.myReqId = 0;
    }

    stopAnimation() {
        window.cancelAnimationFrame(this.myReqId)
    }

    start(level) {
        /**
         * We need this one to build block per level.
         * We cut bord on 16 horizontally, 8 vertically.
         * Our goal is make the same map on different screens.
         * That's why we need this function.
         * @type {{screenStepY: number, screenStepX: number, getHorizontalSide(), getVerticalSide()}}
         */
        this.screenMainCanvas = getScreen(this.getWidthLength(), this.getHeightLength());
        this.inPlay = true;
        const userStartCoordinates = getUserCoordinatesFromPosition(level.userStartPosition, this.screenMainCanvas);
        this.user = getUser(userStartCoordinates.x, userStartCoordinates.y);
        this.user.reloadGun();
        this.flyBullets = [];
        this.rectangles = this.screenMainCanvas.getBoxes(level.blockIds);
        this.rectanglesForStaticBoard = this.rectangles;
        this.rectanglesForActiveBoard = this.rectangles.map(([x, y, xTo, yTo]) => (
            [
                x + this.boardWidthFrom,
                y + this.boardHeightFrom,
                xTo,
                yTo
            ]));

        this.enemies = this.screenMainCanvas.getEnemies(level.enemies);

        this.prepareStaticBoard()
        this._addListeners();

        const self = this;
        loop();

        function loop() {
            console.log('loop', 1)

            if (self?.user?.isDead()) {
                self.stop();
            }

            if (self.inPlay) {
                self.drawAll();
            }

            self.myReqId = window.requestAnimationFrame(loop);
        }

        this.onSetIsUserDead(false)
    }

    prepareStaticBoard() {
        this.clearCanvas(this.static_ctx);
        const img = document.getElementById("sandBgId");
        this.static_ctx.drawImage(img, 0, 0, this.boardWidth, this.boardHeigh)
        // renderRectangle(this.static_ctx, [0, 0, this.boardWidth, this.boardHeigh], '#f7ff00')
        // renderRectangle(this.static_ctx, [this.boardWidthFrom, this.boardHeightFrom, this.getWidthLength(), this.getHeightLength()], '#f2a739b3')
        // this.moveDrawPoint(this.static_ctx)
        this.rectanglesForActiveBoard.map(rec => renderRectangle(this.static_ctx, rec, style.box.bgColor))
    }

    stop() {
        this.inPlay = false;
        this.onSetIsUserDead(true)
        this.enemies = [];
        this.rectangles = [];
        this.stopAnimation();
        this.removeListeners();
    }

    drawAll() {
        if (!this.inPlay) {
            return
        }
        this.clearCanvas(this.ctx);
        // this.rectanglesForActiveBoard.map(rec => renderRectangle(this.static_ctx, rec, 'orange'))
        this.flyBullets.forEach(bullet => bullet.move());
        this.flyBullets.forEach(bullet => bullet.render());
        this.flyBullets = this.flyBullets.filter(bullet => !bullet.isDead);
        this.user.render(game.mousePositionX, game.mousePositionY, this.ctx);

        this.enemies.forEach(enemy => enemy.unitRandomDirection())
        this.enemies.forEach(enemy => enemy.move())
        // Render dead enemies to static board
        this.enemies.forEach(enemy => enemy.isDead() && enemy.render(this.user.x, this.user.y, this.static_ctx));
        // Delete dead enemies from array
        this.enemies = this.enemies.filter(enemy => !enemy.isDead());

        this.enemies
            // .filter(unit => this.user.isVisibleForMe(unit.x, unit.y))
            .filter(enemy => isUnutVisiable(enemy, this) || this.isVisibleAllEnemy)
            .forEach(enemy => enemy.render(this.user.x, this.user.y, this.ctx))


        // this.enemies = this.enemies.filter(unit => !unit.isDead())

        showGameOver(this);

        this.renderEnd();
        this.user.move();
    }

    renderEnd() {
        this.ctx.beginPath();
        this.ctx.font = "30px Arial";
        // this.ctx.fillText('FINISH', this.finishCoordinates.x, this.finishCoordinates.y);
    }

    getWidthLength() {
        return this.boardWidthTo - this.boardWidthFrom;
    }

    getHeightLength() {
        return this.boardHeightTo - this.boardHeightFrom;
    }

    moveDrawPoint(ctx) {
        ctx.translate(this.boardWidthFrom, this.boardHeightFrom) // move start point
    }

    moveBackDrawPoint(ctx) {
        ctx.translate(0, 0) // move start point
    }

    clearCanvas(ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    _addListeners() {
        const self = this;

        const onMouseOver = e => {
            this.mousePositionX = e.clientX;
            this.mousePositionY = e.clientY
        }

        const onKeyPressed = e => {
            self.user.enableMove(e.key)   // user movement
            if (e.key === ' ') {
                self.user.reloadGun();        // reload weapon
            }

            self.drawAll();
        }

        const onMouseDown = () => self.user.shootSingle();

        const onMouseUp = () => self.user.isShootEnabled = false;
        const disableOppositeMove = e => self.inPlay && self.user.disableMove(e.key)

        const board = window.canvas_board_wrapper;

        window.addEventListener("keypress", onKeyPressed);
        window.addEventListener('keyup', disableOppositeMove);
        window.addEventListener("mousemove", onMouseOver);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        const intervalId = setInterval(() => {
            this.enemies
                // .filter(unit => game.user.isVisibleForMe(unit.x, unit.y))
                .filter(enemy => isUnutVisiable(enemy, this))
                .forEach(enemy => game.inPlay && enemy.shootSingle())
        }, 1000)

        this.removeListeners = () => {
            console.log('removeListeners')
            window.removeEventListener("keypress", onKeyPressed);
            window.removeEventListener('keyup', disableOppositeMove);
            window.removeEventListener("mousemove", onMouseOver);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            clearInterval(intervalId)
        }
    }
}

export const game = new Game();


