import {ENEMY_TYPE} from "./unit/type";
import {getAkUnit, getGunUnit, getPistolUnit} from "./unit";
import {game} from './game';

export function getScreen(width, height) {
    const maxHorizontalBlocks = 16;
    const maxVerticalBlocks = 8;

    return {
        screenStepX: width / maxHorizontalBlocks,
        screenStepY: height / maxVerticalBlocks,

        getHorizontalSide(pice) {
            return this.screenStepX * pice;
        },
        getVerticalSide(pice) {
            return this.screenStepY * pice;
        },
        /**
         * Generate array of index elements. Start from 0.
         *
         * @param length
         * @returns {*}
         */
        getArrayByLength(length) {
            return Array(length).fill(1).map((_, i) => i)
        },
        getBoxes(ids) {
            const xArray = this.getArrayByLength(maxHorizontalBlocks) //[0 - 7]
            const yArray = this.getArrayByLength(maxVerticalBlocks) //[0 - 15]
            let boxes = [];

            yArray.forEach(y => {
                xArray.forEach(x => {
                    boxes.push([
                        !x ? x : this.getHorizontalSide(x),
                        !y ? y : this.getVerticalSide(y),
                        this.getHorizontalSide(1),
                        this.getVerticalSide(1)
                    ])
                })
            })

            // console.log({boxes})

            return ids.map(id => boxes[id])
        },

        /**
         * Get enemies coordinates with guns on map
         * @param [{"type":"PISTOL","index":35,"isWalk":false}] enemies
         * @returns {*}
         */
        getEnemies(levelEnemies) {
            const ids = levelEnemies.map(e => e.index)
            const enemyCoordinatesBeta = this.getBoxes(ids);

            const xIncrement = this.getHorizontalSide(1)/2;
            const yIncrement = this.getVerticalSide(1)/2;

            const enemyCoordinates = enemyCoordinatesBeta.map(e => [e[0] + xIncrement, e[1] + yIncrement]);

            return enemyCoordinates.map((enemyCoordinate, index) => {
                const levelEnemy = levelEnemies[index]
                const [x,y] = enemyCoordinate;

                let getEnemyFunc;

                switch (levelEnemy.type) {
                    case ENEMY_TYPE.PISTOL:
                        getEnemyFunc = getPistolUnit;
                        break;
                    case ENEMY_TYPE.AK47:
                        getEnemyFunc = getAkUnit;
                        break;
                    case ENEMY_TYPE.GUN:
                        getEnemyFunc = getGunUnit;
                        break;
                }

                return getEnemyFunc(x + game.boardWidthFrom, y  + game.boardHeightFrom, levelEnemy.isWalk);
            })
        }
    }
}