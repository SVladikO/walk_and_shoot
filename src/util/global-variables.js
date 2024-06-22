import {getBoxes} from "./util";
import {getPistolUnit, getGunUnit, getAkUnit} from '../entity/unit/index';
const isUnitRandomWalkEnable = true;
window.isMute = false;

export const levels = [
    // level 1
    {
        getFinishCoordinates(screen) {
            return {
                x: screen.getHorizontalSide(18),
                y: screen.getVerticalSide(6)
            }
        },
        getRectangles(screen) {
            return getBoxes(screen, [2, 13, 16, 17, 18, 19, 20, 21, 22, 23])
        },
        getUnits: (screen) => ([
            getPistolUnit(screen.getHorizontalSide(4), screen.getVerticalSide(1)/2),
            getPistolUnit(screen.getHorizontalSide(7), screen.getVerticalSide(3)/2),
        ]),
    },
    // level 2
    {
        getFinishCoordinates(screen) {
            return {
                x: screen.getHorizontalSide(18),
                y: screen.getVerticalSide(5)
            }
        },
        getRectangles(screen) {
            return getBoxes(screen, [2, 6, 12, 16, 17, 18, 19, 20, 21, 22, 23])
        },
        getUnits: (screen) => ([
            getPistolUnit(screen.getHorizontalSide(7)/2, screen.getVerticalSide(1) / 4),
            getGunUnit(screen.getHorizontalSide(11)/2, screen.getVerticalSide(1) / 2),
            getPistolUnit(screen.getHorizontalSide(15)/2, screen.getVerticalSide(1)/2, isUnitRandomWalkEnable),
        ])
    },
    // levels 3
    {
        getFinishCoordinates(screen) {
            return {
                x: screen.getHorizontalSide(1),
                y: screen.getVerticalSide(8)
            }
        },
        getRectangles(screen) {
            return getBoxes(screen, [1, 6, 11, 12, 17, 22])
        },
        getUnits: (screen) => ([
            getPistolUnit(screen.getHorizontalSide(7)/2, screen.getVerticalSide(1) / 4, isUnitRandomWalkEnable),
            getGunUnit(screen.getHorizontalSide(11)/2, screen.getVerticalSide(1) / 2),
            getAkUnit(screen.getHorizontalSide(15)/2, screen.getVerticalSide(1)/2, isUnitRandomWalkEnable),
            getAkUnit(screen.getHorizontalSide(15)/2, screen.getVerticalSide(5)/2, isUnitRandomWalkEnable),
            getPistolUnit(screen.getHorizontalSide(7)/2, screen.getVerticalSide(5) /2, isUnitRandomWalkEnable),
            getGunUnit(screen.getHorizontalSide(11)/2, screen.getVerticalSide(5) / 2),
        ]),
    },
    // level 4
    {
        getFinishCoordinates(screen) {
            return {
                x: screen.getHorizontalSide(1),
                y: screen.getVerticalSide(8)
            }
        },
        getRectangles(screen) {
            return getBoxes(screen, [2, 6, 8, 12, 18, 22])
        },
        getUnits: (screen) => ([
            getPistolUnit(screen.getHorizontalSide(7)/2, screen.getVerticalSide(1) / 4, isUnitRandomWalkEnable),
            getGunUnit(screen.getHorizontalSide(11)/2, screen.getVerticalSide(1) / 2),
            getAkUnit(screen.getHorizontalSide(15)/2, screen.getVerticalSide(1)/2, isUnitRandomWalkEnable),
            getAkUnit(screen.getHorizontalSide(15)/2, screen.getVerticalSide(5)/2, isUnitRandomWalkEnable),
            // getPistolUnit(screen.getHorizontalSide(7)/2, screen.getVerticalSide(5) /2, isUnitRandomWalkEnable),
            getGunUnit(screen.getHorizontalSide(11)/2, screen.getVerticalSide(5) / 2),
            getPistolUnit(screen.getHorizontalSide(1)/2, screen.getVerticalSide(5) /2, isUnitRandomWalkEnable),
            getPistolUnit(screen.getHorizontalSide(1)/2, screen.getVerticalSide(5) /2, isUnitRandomWalkEnable),
        ]),
    },
    // level 5
    {
        getFinishCoordinates(screen) {
            return {
                x: screen.getHorizontalSide(1),
                y: screen.getVerticalSide(8)
            }
        },
        getRectangles(screen) {
            return getBoxes(screen, [2, 3, 6, 7, 16, 17, 20, 21])
        },
        getUnits: (screen) => ([
            getPistolUnit(screen.getHorizontalSide(9)/2, screen.getVerticalSide(1) / 4, isUnitRandomWalkEnable),
            getGunUnit(screen.getHorizontalSide(11)/2, screen.getVerticalSide(1) / 2),
            getAkUnit(screen.getHorizontalSide(9)/2, screen.getVerticalSide(1) / 4, isUnitRandomWalkEnable),
            getGunUnit(screen.getHorizontalSide(9)/2, screen.getVerticalSide(1) / 4, isUnitRandomWalkEnable),
            getGunUnit(screen.getHorizontalSide(7), screen.getVerticalSide(2), isUnitRandomWalkEnable),
            getAkUnit(screen.getHorizontalSide(7), screen.getVerticalSide(2), isUnitRandomWalkEnable),
        ]),
    },
    // level 6
    {
        getFinishCoordinates(screen) {
            return {
                x: screen.getHorizontalSide(1),
                y: screen.getVerticalSide(8)
            }
        },
        getRectangles(screen) {
            return getBoxes(screen, [4, 5, 8, 9, 12, 13, 16, 17])
        },
        getUnits: (screen) => ([
            getPistolUnit(screen.getHorizontalSide(3), screen.getVerticalSide(2), isUnitRandomWalkEnable),
            getGunUnit(screen.getHorizontalSide(3), screen.getVerticalSide(2), isUnitRandomWalkEnable),
            getAkUnit(screen.getHorizontalSide(5), screen.getVerticalSide(5)/2, isUnitRandomWalkEnable),
            getPistolUnit(screen.getHorizontalSide(6), screen.getVerticalSide(5)/2, isUnitRandomWalkEnable),
            getAkUnit(screen.getHorizontalSide(7), screen.getVerticalSide(5)/2, isUnitRandomWalkEnable),
            getPistolUnit(screen.getHorizontalSide(7), screen.getVerticalSide(5)/2, isUnitRandomWalkEnable),
            getAkUnit(screen.getHorizontalSide(7), screen.getVerticalSide(1), isUnitRandomWalkEnable),
            getPistolUnit(screen.getHorizontalSide(7), screen.getVerticalSide(1), isUnitRandomWalkEnable),
        ]),
    },
    // // level 7
    // {
    //     getFinishCoordinates(screen) {
    //         return {
    //             x: screen.getHorizontalSide(1),
    //             y: screen.getVerticalSide(8)
    //         }
    //     },
    //     getRectangles(screen) {
    //         return getBoxes(screen, [2, 6, 8, 10, 12, 14, 16, 20])
    //     },
    //     getUnits: (screen) => ([
    //
    //     ]),
    // },
    // // level 7
    // {
    //     getFinishCoordinates(screen) {
    //         return {
    //             x: screen.getHorizontalSide(1),
    //             y: screen.getVerticalSide(8)
    //         }
    //     },
    //     getRectangles(screen) {
    //         return getBoxes(screen, [3, 9, 11, 13, 21])
    //     },
    //     getUnits: (screen) => ([
    //
    //     ]),
    // },
]


