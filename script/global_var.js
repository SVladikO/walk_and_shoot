let style = {
    board: {
        bgColor: '#c8c8c8',
    },
    box: {
        bgColor: '#000',
        borderColor: "#000",
        borderLineWidth: 6,
    },
    user: {
        bgColor: '#000',
        dorRadius: 15,
    },
    bullet: {
        bgColor: '#cd0000',
        bgColorCrashed: '#fa2727',
        radius: 5,
    }
}


const GUN_TYPE = {
    PISTOL: 'PISTOL',
    AK: 'AK',
    GUN: 'GUN',
}

//pistol
const weapon_gun1 = {
    imageId: 'gunIconId1',
    type: GUN_TYPE.PISTOL,
    bulletAmount: 8,
    shootSpeedStep: 30,
    reloadBulletAmount: 8,
    maxDistance: 500,
    damage: 2,
    sound: {
        reload: './public/sound/gun1_recharge.mp3',
        shoot: './public/sound/gun1_shoot.mp3',
    },
    bulletDeadRadius: 15,
    distanceStep: 2,
    rechargeTime: 2,
    shoot: (angle, getBullet) => ([getBullet(angle)]),
}

//ak
const weapon_gun2 = {
    imageId: 'gunIconId2',
    type: GUN_TYPE.AK,
    bulletAmount: 30,
    shootSpeedStep: 15,
    reloadBulletAmount: 30,
    maxDistance: 500,
    damage: 2,
    sound: {
        reload: './public/sound/gun1_recharge.mp3',
        shoot: './public/sound/gun2_shoot.mp3',
    },
    bulletDeadRadius: 15,
    distanceStep: 2,
    rechargeTime: 2,
    shoot: (angle, getBullet) => {
        let bullets = [
            getBullet(angle),
        ];

        const isFlyUp2 = getRandom(1, 5) % 2 > 0;
        const isBulletFlyUp2 = getRandom(1, 5) % 2 > 0;

        // if(isFlyUp1) {
        //     isBulletFlyUp1
        //         ? bullets.push(getBullet(angle + .1 ))
        //         : bullets.push(getBullet(angle - .1 ))
        // }
        if (isFlyUp2) {
            isBulletFlyUp2
                ? bullets.push(getBullet(angle + getRandom(1, 5) / 10))
                : bullets.push(getBullet(angle - getRandom(1, 5) / 10))
        }

        return bullets;
    },
}

//gun
const weapon_gun3 = {
    imageId: 'gunIconId3',
    type: GUN_TYPE.GUN,
    bulletAmount: 2,
    shootSpeedStep: 40,
    reloadBulletAmount: 2,
    maxDistance: 350,
    damage: 4,
    sound: {
        reload: './public/sound/gun3_recharge.mp3',
        shoot: './public/sound/gun3_shoot.mp3',
    },
    bulletDeadRadius: 15,
    distanceStep: 2,
    rechargeTime: 2,
    shoot: (angle, getBullet) => ([getBullet(angle - 0.3), getBullet(angle), getBullet(angle + 0.3)]),
}

const UNIT_TYPE = {
    'USER': 'USER',
    'UNIT': 'UNIT'
}

function getBoxes(screen, ids) {
    const boxes = [
        //row 1
        [0, 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(1), 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(2), 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(3), 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(4), 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(5), 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(6), 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(7), 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        // row 2
        [0, screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(1), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(2), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(3), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(4), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(5), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(6), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(7), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        // row 3
        [0, screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(1), screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(2), screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(3), screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(4), screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(5), screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(6), screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        [screen.getHorizontalSide(7), screen.getVerticalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
    ];

    return ids.map(id => boxes[id])
}

const isUnitRandomWalkDisabled = false;

const levels = [
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
            getPistolUnit(screen.getHorizontalSide(5), screen.getVerticalSide(1)),
            // getPistolUnit(screen.getHorizontalSide(13), screen.getVerticalSide(1)),
            getPistolUnit(screen.getHorizontalSide(16), screen.getVerticalSide(4)),
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
            getPistolUnit(screen.getHorizontalSide(5), screen.getVerticalSide(1) / 2),
            getPistolUnit(screen.getHorizontalSide(9), screen.getVerticalSide(2)),
            getGunUnit(screen.getHorizontalSide(11), screen.getVerticalSide(2)),
            getPistolUnit(screen.getHorizontalSide(15), screen.getVerticalSide(5)),

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
            getPistolUnit(screen.getHorizontalSide(1) / 2, screen.getVerticalSide(3)),
            getPistolUnit(screen.getHorizontalSide(6), screen.getVerticalSide(3) / 2),
            getPistolUnit(screen.getHorizontalSide(12), screen.getVerticalSide(1) / 2),
            getPistolUnit(screen.getHorizontalSide(10), screen.getVerticalSide(1) / 2, isUnitRandomWalkDisabled),
            getAkUnit(screen.getHorizontalSide(14), screen.getVerticalSide(5)),
            getAkUnit(screen.getHorizontalSide(18), screen.getVerticalSide(1) / 2),
            getAkUnit(screen.getHorizontalSide(18), screen.getVerticalSide(1) / 2, isUnitRandomWalkDisabled),
            getGunUnit(screen.getHorizontalSide(17), screen.getVerticalSide(2), isUnitRandomWalkDisabled),
            getPistolUnit(screen.getHorizontalSide(12), screen.getVerticalSide(8)),
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
            // getPistolUnit(88, 165),
            // getGunUnit(72, 330),
            // getPistolUnit(198, 458),
            // getAkUnit(216, 171),
            // getPistolUnit(532, 20),
            // getPistolUnit(936, 36),
            // getPistolUnit(950, 102),
            // getGunUnit(986, 87),
            // getGunUnit(836, 340),
            // getGunUnit(763, 429),
            // getGunUnit(980, 536),
            // getGunUnit(937, 583),
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
            // getPistolUnit(88, 165),
            // getGunUnit(72, 330),
            // getPistolUnit(198, 458),
            // getAkUnit(216, 171),
            // getPistolUnit(532, 20),
            // getPistolUnit(936, 36),
            // getPistolUnit(950, 102),
            // getGunUnit(986, 87),
            // getGunUnit(836, 340),
            // getGunUnit(763, 429),
            // getGunUnit(980, 536),
            // getGunUnit(937, 583),
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
            // getPistolUnit(88, 165),
            // getGunUnit(72, 330),
            // getPistolUnit(198, 458),
            // getAkUnit(216, 171),
            // getPistolUnit(532, 20),
            // getPistolUnit(936, 36),
            // getPistolUnit(950, 102),
            // getGunUnit(986, 87),
            // getGunUnit(836, 340),
            // getGunUnit(763, 429),
            // getGunUnit(980, 536),
            // getGunUnit(937, 583),
        ]),
    },
    // level 7
    {
        getFinishCoordinates(screen) {
            return {
                x: screen.getHorizontalSide(1),
                y: screen.getVerticalSide(8)
            }
        },
        getRectangles(screen) {
            return getBoxes(screen, [2, 6, 8, 10, 12, 14, 16, 20])
        },
        getUnits: (screen) => ([
            // getPistolUnit(88, 165),
            // getGunUnit(72, 330),
            // getPistolUnit(198, 458),
            // getAkUnit(216, 171),
            // getPistolUnit(532, 20),
            // getPistolUnit(936, 36),
            // getPistolUnit(950, 102),
            // getGunUnit(986, 87),
            // getGunUnit(836, 340),
            // getGunUnit(763, 429),
            // getGunUnit(980, 536),
            // getGunUnit(937, 583),
        ]),
    },
    // level 7
    {
        getFinishCoordinates(screen) {
            return {
                x: screen.getHorizontalSide(1),
                y: screen.getVerticalSide(8)
            }
        },
        getRectangles(screen) {
            return getBoxes(screen, [3, 9, 11, 13, 21])
        },
        getUnits: (screen) => ([
            // getPistolUnit(88, 165),
            // getGunUnit(72, 330),
            // getPistolUnit(198, 458),
            // getAkUnit(216, 171),
            // getPistolUnit(532, 20),
            // getPistolUnit(936, 36),
            // getPistolUnit(950, 102),
            // getGunUnit(986, 87),
            // getGunUnit(836, 340),
            // getGunUnit(763, 429),
            // getGunUnit(980, 536),
            // getGunUnit(937, 583),
        ]),
    },
]
//
// getPistolUnit
// getAkUnit
// getGunUnit


/**
 * We need this one to build block per level.
 * We cut bord on 20 horizontally, 10 vertically.
 * Our goal is make the same map on different screens.
 * That's why we need this function.
 * @type {{screenStepY: number, screenStepX: number, getHorizontalSide(), getVerticalSide()}}
 */
const screenMainCanvas = getScreen(window.innerWidth, window.innerHeight);

let levelId = 3;
let units = levels[levelId].getUnits(screenMainCanvas);
let rectangles = levels[levelId].getRectangles(screenMainCanvas);
let finishCoordinates = levels[levelId].getFinishCoordinates(screenMainCanvas);
let user = getUser();

function changeLevel(levelIndex) {
    user = getUser(user.weapon);
    rectangles = levels[levelIndex].getRectangles(screenMainCanvas);
    units = levels[levelIndex].getUnits(screenMainCanvas);
    finishCoordinates = levels[levelIndex].getFinishCoordinates(screenMainCanvas);
    levelId = levelIndex;
}
