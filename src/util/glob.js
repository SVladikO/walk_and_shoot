import {getScreen} from "./util";
import {getUser} from "../entity/unit";
import {levels, rectangles, units, user} from "./global-variables";

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
    constructor() {
        this.inPlay = false;
        this.levelId = 0;
        this.user = null; //getUser();
        this.units = null;// levels[this.levelId].getUnits(screenMainCanvas);
        this.rectangles = null;// levels[this.levelId].getRectangles(screenMainCanvas);
        this.finishCoordinates = null;//levels[this.levelId].getFinishCoordinates(screenMainCanvas);
    }

    changeLevel(levelIndex) {
        this.levelId = levelIndex;
        this.user = getUser();
        this.rectangles = levels[levelIndex].getRectangles(screenMainCanvas);
        this.units = levels[levelIndex].getUnits(screenMainCanvas);
        this.finishCoordinates = levels[levelIndex].getFinishCoordinates(screenMainCanvas);
    }
}

export const game = new Game();
