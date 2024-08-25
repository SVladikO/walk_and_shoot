import {getPistolUnit, getGunUnit, getAkUnit} from '../entity/unit/index';

const isUnitRandomWalkEnable = true;

export const levels = [
    // level 1
    {
        getFinishCoordinates(screen) {
            return {
                x: screen.getHorizontalSide(18),
                y: screen.getVerticalSide(6)
            }
        },
        blockIds: [2, 18, 19, 21, 22, 23, 26, 28, 29, 30, 34, 38, 41, 42, 45, 58, 65, 69, 72, 76, 80, 81, 82, 84, 85, 87, 88, 89, 91, 92, 95, 101, 108, 110, 111],
        getRectangles(screen) {
            return screen.getBoxes(this.blockIds)
        },
        unitIds: [{"type":"PISTOL","index":35,"isWalk":false},{"type":"PISTOL","index":68,"isWalk":false},{"type":"PISTOL","index":112,"isWalk":false},{"type":"PISTOL","index":102,"isWalk":false},{"type":"PISTOL","index":73,"isWalk":false},{"type":"PISTOL","index":6,"isWalk":false},{"type":"PISTOL","index":59,"isWalk":false},{"type":"GUN","index":94,"isWalk":false}],
        getUnits(screen) {
            return screen.getUnits(this.unitIds);
        },
    },
    // level 2
    {
        getFinishCoordinates(screen) {
            return {
                x: screen.getHorizontalSide(18),
                y: screen.getVerticalSide(5)
            }
        },
        blockIds: [19, 20, 21, 28, 29, 30, 35, 41, 46, 56, 71, 73, 83, 94, 99, 100, 101, 108, 109, 110],
        getRectangles(screen) {
            return screen.getBoxes(this.blockIds)
        },
        unitIds: [{"type":"PISTOL","index":36,"isWalk":false},{"type":"PISTOL","index":72,"isWalk":false},{"type":"GUN","index":116,"isWalk":false},{"type":"AK47","index":6,"isWalk":true},{"type":"AK47","index":104,"isWalk":true},{"type":"AK47","index":59,"isWalk":true},{"type":"GUN","index":15,"isWalk":true},{"type":"GUN","index":127,"isWalk":true}],
        getUnits(screen) {
            return screen.getUnits(this.unitIds);
        }
    },
    // levels 3
    {
        getFinishCoordinates(screen) {
            return {
                x: screen.getHorizontalSide(1),
                y: screen.getVerticalSide(8)
            }
        },
        blockIds: [1, 6, 11, 12, 17, 22],
        getRectangles(screen) {
            return screen.getBoxes(this.blockIds)
        },
        unitIds: [],
        getUnits: (screen) => ([
            getPistolUnit(screen.getHorizontalSide(7) / 2, screen.getVerticalSide(1) / 4, isUnitRandomWalkEnable),
            getGunUnit(screen.getHorizontalSide(11) / 2, screen.getVerticalSide(1) / 2),
            getAkUnit(screen.getHorizontalSide(15) / 2, screen.getVerticalSide(1) / 2, isUnitRandomWalkEnable),
            getAkUnit(screen.getHorizontalSide(15) / 2, screen.getVerticalSide(5) / 2, isUnitRandomWalkEnable),
            getPistolUnit(screen.getHorizontalSide(7) / 2, screen.getVerticalSide(5) / 2, isUnitRandomWalkEnable),
            getGunUnit(screen.getHorizontalSide(11) / 2, screen.getVerticalSide(5) / 2),
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
        blockIds: [2, 6, 8, 12, 18, 22],
        getRectangles(screen) {
            return screen.getBoxes([2, 6, 8, 12, 18, 22])
        },
        unitIds: [],
        getUnits: (screen) => ([
            getPistolUnit(screen.getHorizontalSide(7) / 2, screen.getVerticalSide(1) / 4, isUnitRandomWalkEnable),
            getGunUnit(screen.getHorizontalSide(11) / 2, screen.getVerticalSide(1) / 2),
            getAkUnit(screen.getHorizontalSide(15) / 2, screen.getVerticalSide(1) / 2, isUnitRandomWalkEnable),
            getAkUnit(screen.getHorizontalSide(15) / 2, screen.getVerticalSide(5) / 2, isUnitRandomWalkEnable),
            // getPistolUnit(screen.getHorizontalSide(7)/2, screen.getVerticalSide(5) /2, isUnitRandomWalkEnable),
            getGunUnit(screen.getHorizontalSide(11) / 2, screen.getVerticalSide(5) / 2),
            getPistolUnit(screen.getHorizontalSide(1) / 2, screen.getVerticalSide(5) / 2, isUnitRandomWalkEnable),
            getPistolUnit(screen.getHorizontalSide(1) / 2, screen.getVerticalSide(5) / 2, isUnitRandomWalkEnable),
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
        blockIds: [2, 3, 6, 7, 16, 17, 20, 21],
        getRectangles(screen) {
            return screen.getBoxes(this.blockIds)
        },
        unitIds: [],
        getUnits: (screen) => ([
            getPistolUnit(screen.getHorizontalSide(9) / 2, screen.getVerticalSide(1) / 4, isUnitRandomWalkEnable),
            getGunUnit(screen.getHorizontalSide(11) / 2, screen.getVerticalSide(1) / 2),
            getAkUnit(screen.getHorizontalSide(9) / 2, screen.getVerticalSide(1) / 4, isUnitRandomWalkEnable),
            getGunUnit(screen.getHorizontalSide(9) / 2, screen.getVerticalSide(1) / 4, isUnitRandomWalkEnable),
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
        blockIds: [4, 5, 8, 9, 12, 13, 16, 17],
        getRectangles(screen) {
            return screen.getBoxes(this.blockIds)
        },
        unitIds: [],
        getUnits: (screen) => ([
            getPistolUnit(screen.getHorizontalSide(3), screen.getVerticalSide(2), isUnitRandomWalkEnable),
            getGunUnit(screen.getHorizontalSide(3), screen.getVerticalSide(2), isUnitRandomWalkEnable),
            getAkUnit(screen.getHorizontalSide(5), screen.getVerticalSide(5) / 2, isUnitRandomWalkEnable),
            getPistolUnit(screen.getHorizontalSide(6), screen.getVerticalSide(5) / 2, isUnitRandomWalkEnable),
            getAkUnit(screen.getHorizontalSide(7), screen.getVerticalSide(5) / 2, isUnitRandomWalkEnable),
            getPistolUnit(screen.getHorizontalSide(7), screen.getVerticalSide(5) / 2, isUnitRandomWalkEnable),
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
    //         return screen.getBoxes( [2, 6, 8, 10, 12, 14, 16, 20])
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
    //         return screen.getBoxes( [3, 9, 11, 13, 21])
    //     },
    //     getUnits: (screen) => ([
    //
    //     ]),
    // },
]


