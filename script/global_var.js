let style = {
    board: {
        bgColor: '#c8c8c8',
    },
    box: {
        bgColor: '#000',
        borderColor: "#00",
        borderLineWidth: 4,
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

/**
 * We need this one to build block per level.
 * We cut bord on 20 horizontally, 10 vertically.
 * Our goal is make the same map on different screens.
 * That's why we need this function.
 * @type {{screenStepY: number, screenStepX: number, getHorizontalSide(), getVerticalSide()}}
 */
const screen = {
    screenStepX: window.innerWidth / 20,
    screenStepY: window.innerHeight / 10,


    getHorizontalSide(pice) {
        return this.screenStepX * pice;
    },
    getVerticalSide(pice) {
        return this.screenStepY * pice;
    }
}

const isUnitRandomWalkDisabled = false;

const levels = [
    // level 1
    {
        finish: {
            x: screen.getHorizontalSide(18),
            y: screen.getVerticalSide(6)
        },
        recs: [
            [0, screen.getVerticalSide(3), screen.getHorizontalSide(15), screen.getVerticalSide(10)],
            [screen.getHorizontalSide(3), 0, screen.getHorizontalSide(1), screen.getVerticalSide(3)/2],
            [screen.getHorizontalSide(10), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
        ],
        getUnits: () => ([
            getPistolUnit(screen.getHorizontalSide(5), screen.getVerticalSide(1)),
            // getPistolUnit(screen.getHorizontalSide(13), screen.getVerticalSide(1)),
            getPistolUnit(screen.getHorizontalSide(16), screen.getVerticalSide(4)),
        ]),
    },
    // level 2
    {
        finish: {
            x: screen.getHorizontalSide(18),
            y: screen.getVerticalSide(5)
        },
        recs: [
            [screen.getHorizontalSide(2), 0, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
            [0, screen.getVerticalSide(2), screen.getHorizontalSide(8), screen.getVerticalSide(10)],
            [0, screen.getVerticalSide(2), screen.getHorizontalSide(8), screen.getVerticalSide(10)],
            [screen.getHorizontalSide(6), screen.getVerticalSide(1), screen.getHorizontalSide(2), screen.getVerticalSide(1)],
            [screen.getHorizontalSide(10), screen.getVerticalSide(1) / 2, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
            [screen.getHorizontalSide(11), screen.getVerticalSide(3), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
            [screen.getHorizontalSide(10), screen.getVerticalSide(10) / 2, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
            [screen.getHorizontalSide(13), screen.getVerticalSide(11) / 2, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
            [screen.getHorizontalSide(14), 0, screen.getHorizontalSide(6), screen.getVerticalSide(4)],
        ],
        getUnits: () => ([
            getPistolUnit(screen.getHorizontalSide(5), screen.getVerticalSide(1)/2),
            getPistolUnit(screen.getHorizontalSide(9), screen.getVerticalSide(2)),
            getGunUnit(screen.getHorizontalSide(11), screen.getVerticalSide(2)),
            getPistolUnit(screen.getHorizontalSide(15), screen.getVerticalSide(5)),
            // getPistolUnit(190, 20),
            // getPistolUnit(330, 190),
            // getGunUnit(450, 164),
            // getPistolUnit(620, 325),
        ])
    },
    // levels 3
    {
        finish: {
            x: screen.getHorizontalSide(1),
            y: screen.getVerticalSide(8)
        },
        recs: [
            [0, screen.getVerticalSide(3) / 2, screen.getHorizontalSide(1), screen.getVerticalSide(1)],
            [screen.getHorizontalSide(3), 0, screen.getHorizontalSide(2), screen.getVerticalSide(3) / 2],
            [0, screen.getHorizontalSide(4), screen.getHorizontalSide(11), screen.getVerticalSide(4)],
            [screen.getHorizontalSide(6), screen.getHorizontalSide(2), screen.getHorizontalSide(1), screen.getVerticalSide(1)],
            [screen.getHorizontalSide(11), screen.getHorizontalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(2)],
            [screen.getHorizontalSide(11), screen.getHorizontalSide(6), screen.getHorizontalSide(4), screen.getVerticalSide(3) / 2],
            [screen.getHorizontalSide(13), screen.getHorizontalSide(7), screen.getHorizontalSide(2), screen.getVerticalSide(3) / 2],
            [screen.getHorizontalSide(13), 0, screen.getHorizontalSide(3), screen.getVerticalSide(9) / 2],
            [screen.getHorizontalSide(16), screen.getVerticalSide(5)/2, screen.getHorizontalSide(2), screen.getVerticalSide(2)],
            [screen.getHorizontalSide(18), screen.getVerticalSide(1), screen.getHorizontalSide(1), screen.getVerticalSide(7)/2],
        ],
        getUnits: () => ([
            getPistolUnit(screen.getHorizontalSide(1)/2, screen.getVerticalSide(3)),
            getPistolUnit(screen.getHorizontalSide(6), screen.getVerticalSide(3)/2),
            getPistolUnit(screen.getHorizontalSide(12), screen.getVerticalSide(1)/2),
            getPistolUnit(screen.getHorizontalSide(10), screen.getVerticalSide(1)/2, isUnitRandomWalkDisabled),
            getAkUnit(screen.getHorizontalSide(14), screen.getVerticalSide(5)),
            getAkUnit(screen.getHorizontalSide(18), screen.getVerticalSide(1)/2),
            getAkUnit(screen.getHorizontalSide(18), screen.getVerticalSide(1)/2, isUnitRandomWalkDisabled),
            getGunUnit(screen.getHorizontalSide(17), screen.getVerticalSide(2), isUnitRandomWalkDisabled),
            getPistolUnit(screen.getHorizontalSide(12), screen.getVerticalSide(8)),
            // getPistolUnit(10, 168),
            // getPistolUnit(310, 96),
            // getGunUnit(510, 30),
            // getAkUnit(590, 40),
            // getAkUnit(920, 340),
            // getAkUnit(920, 340),
            // getAkUnit(970, 50),
            // getAkUnit(910, 50),
            // getGunUnit(834, 50),
            // getGunUnit(690, 570),
            // getPistolUnit(690, 570),
            // getGunUnit(600, 510),
        ]),
    },
    // level 4
    {
        finish: {
            x: 510,
            y: 340
        },
        recs: [
            [65, 90, 10, 10],
            [120, 0, 70, 200],
            [50, 200, 70, 100],
            [95, 300, 25, 100],
            [50, 360, 70, 50],
            [0, 490, 500, 110],
            [225, 360, 275, 145],
            [320, 240, 180, 145],
            [200, 250, 50, 50],
            [400, 90, 300, 200],
            [700, 220, 180, 50],
            [610, 290, 90, 200],
            [780, 70, 90, 70],
            [960, 150, 90, 70],
            [940, 280, 90, 70],
            [800, 400, 80, 70],
            [915, 515, 40, 40],
        ],
        getUnits: () => ([
            getPistolUnit(88, 165),
            getGunUnit(72, 330),
            getPistolUnit(198, 458),
            getAkUnit(216, 171),
            getPistolUnit(532, 20),
            getPistolUnit(936, 36),
            getPistolUnit(950, 102),
            getGunUnit(986, 87),
            getGunUnit(836, 340),
            getGunUnit(763, 429),
            getGunUnit(980, 536),
            getGunUnit(937, 583),
        ]),
    },
    // level 5
    {
        finish: {
            x: 0,
            y: 550
        },
        recs: [
            [0, 140, 80, 300],
            [150, 0, 80, 300],
            [80, 440, 600, 100],
            [400, 100, 150, 350],
            [680, 240, 200, 80],
            [780, 300, 100, 240],
            [680, 0, 200, 80],
            [960, 280, 50, 80],
        ],
        getUnits: () => ([
            getPistolUnit(96, 205),
            getAkUnit(126, 380),
            getPistolUnit(220, 325),
            getPistolUnit(420, 30),
            getPistolUnit(580, 140),
            getPistolUnit(570, 315),
            getAkUnit(610, 315),
            getAkUnit(750, 355),
            getGunUnit(700, 460),
            getPistolUnit(915, 35),
            getPistolUnit(915, 427),
            getAkUnit(360, 400),
            getAkUnit(650, 320),
            getAkUnit(520, 570),
        ]),
    },
    // level 6
    {
        finish: {
            x: 630,
            y: 420
        },
        recs: [
            [60, 160, 150, 80],
            [140, 60, 70, 110],
            [210, 180, 450, 150],
            [580, 100, 80, 100],
            [900, 255, 100, 50],
            [650, 500, 150, 100],
            [0, 350, 100, 100],
        ],
        getUnits: () => ([
            getAkUnit(940, 540),
            getAkUnit(420, 520),
            getPistolUnit(860, 270),
            getPistolUnit(730, 40),
            getPistolUnit(140, 330),
            getPistolUnit(190, 30),
            getAkUnit(30, 200),
            getAkUnit(950, 100),
            getAkUnit(180, 270),
            getAkUnit(180, 340),
            getGunUnit(240, 130),
            getGunUnit(130, 280),
        ]),
    },
    // level 7
    {
        finish: {
            x: 825,
            y: 450
        },
        recs: [
            [60, 160, 100, 80],
            [170, 40, 70, 70],
            [340, 40, 70, 70],
            [500, 40, 70, 70],
            [680, 40, 100, 300],
            [580, 260, 100, 200],
            [350, 450, 100, 100],
        ],
        getUnits: () => ([
            getPistolUnit(30, 150),
            getAkUnit(30, 270),
            getPistolUnit(200, 130),
            getGunUnit(290, 140),
            getAkUnit(255, 235),
            getAkUnit(410, 240),
            getGunUnit(460, 130),
            getGunUnit(540, 200),
            getPistolUnit(630, 200),
            getGunUnit(630, 100),
            getPistolUnit(880, 100),
            getPistolUnit(900, 490),
        ]),
    },
// level 8
    {
        finish: {
            x: 825,
            y: 450
        },
        recs: [
            [250, 70, 100, 100],
            [580, 190, 100, 100],
        ],
        getUnits: () => ([
            getAkUnit(60, 280),
            getAkUnit(90, 280),
            getGunUnit(80, 250),
            getPistolUnit(80, 280),
            getPistolUnit(120, 280),
            getAkUnit(360, 280),
            getAkUnit(300, 210),
            getAkUnit(480, 333),
            getPistolUnit(630, 350),
            getPistolUnit(900, 490),
        ]),
    },

// level 9
    {
        finish: {
            x: 850,
            y: 235
        },
        recs: [
            [150, 180, 100, 100],
            [460, 60, 100, 100],
            [520, 410, 100, 100],
        ],
        getUnits: () => ([
            getAkUnit(610, 120),
            getAkUnit(725, 40),
            getPistolUnit(875, 160),
            getAkUnit(675, 430),
            getAkUnit(750, 520),
            getPistolUnit(830, 350),
            getPistolUnit(550, 260),
            getGunUnit(425, 205),
            getGunUnit(425, 250),
            getGunUnit(380, 230),
            getPistolUnit(360, 375),
            getAkUnit(325, 80),
            getPistolUnit(195, 80),

            // getGunUnit(80, 250),
            // getAkUnit(360, 280),
            // getAkUnit(300, 210),
            // getAkUnit(480, 333),
            // getPistolUnit(630, 350),
            //
            // getPistolUnit(900, 490),
        ]),
    },
    // level 10
    {
        finish: {
            x: 400,
            y: 100
        },
        recs: [
            [0, 140, 100, 100],
            [0, 350, 100, 100],
            [215, 145, 100, 100],
            [225, 350, 100, 100],
            [500, 300, 100, 200],
            [600, 300, 100, 100],
        ],
        getUnits: () => ([
            getAkUnit(840, 80),
            getPistolUnit(750, 80),
            getAkUnit(755, 200),
            getAkUnit(265, 45),
            getAkUnit(370, 300),
            getPistolUnit(635, 90),
            getPistolUnit(390, 410),
            getPistolUnit(635, 150),
            getAkUnit(50, 530),
            getAkUnit(50, 300),
            getAkUnit(551, 40),
            getAkUnit(500, 110),
            getAkUnit(450, 120),
            getAkUnit(440, 60),
            getPistolUnit(270, 300),
            getPistolUnit(30, 20),
            getPistolUnit(160, 20),
            getGunUnit(340, 163),
        ]),
    }
]
//
// getPistolUnit
// getAkUnit
// getGunUnit

let levelId = 2;
let units = levels[levelId].getUnits();
let rectangles = levels[levelId].recs;
let finishCoordinates = levels[levelId].finish;
let user = getUser();

function changeLevel(levelIndex) {
    user = getUser(user.weapon);
    rectangles = levels[levelIndex].recs;
    units = levels[levelIndex].getUnits();
    finishCoordinates = levels[levelIndex].finish;
    levelId = levelIndex;
}

// [horizontalStep * 2, 0],
// [horizontalStep * 3, 0],
// [horizontalStep * 4, 0],
// [horizontalStep * 5, 0],
// [horizontalStep * 6, 0],
// [horizontalStep * 7, 0],
// [horizontalStep * 8, 0],
// [horizontalStep * 9, 0],
//
// [horizontalStep, verticalStep],
// [horizontalStep * 2, verticalStep],
// [horizontalStep * 3, verticalStep],
// [horizontalStep * 4, verticalStep],
// [horizontalStep * 5, verticalStep],
// [horizontalStep * 6, verticalStep],
// [horizontalStep * 7, verticalStep],
// [horizontalStep * 8, verticalStep],
// [horizontalStep * 9, verticalStep],
//
// [horizontalStep, verticalStep * 2],
// [horizontalStep * 2, verticalStep * 2],
// [horizontalStep * 3, verticalStep * 2],
// [horizontalStep * 4, verticalStep * 2],
// [horizontalStep * 5, verticalStep * 2],
// [horizontalStep * 6, verticalStep * 2],
// [horizontalStep * 7, verticalStep * 2],
// [horizontalStep * 8, verticalStep * 2],
// [horizontalStep * 9, verticalStep * 2],
//
// [horizontalStep, verticalStep * 3],
// [horizontalStep * 2, verticalStep * 3],
// [horizontalStep * 3, verticalStep * 3],
// [horizontalStep * 4, verticalStep * 3],
// [horizontalStep * 5, verticalStep * 3],
// [horizontalStep * 6, verticalStep * 3],
// [horizontalStep * 7, verticalStep * 3],
// [horizontalStep * 8, verticalStep * 3],
// [horizontalStep * 9, verticalStep * 3],
//
// [horizontalStep, verticalStep * 4],
// [horizontalStep * 2, verticalStep * 4],
// [horizontalStep * 3, verticalStep * 4],
// [horizontalStep * 4, verticalStep * 4],
// [horizontalStep * 5, verticalStep * 4],
// [horizontalStep * 6, verticalStep * 4],
// [horizontalStep * 7, verticalStep * 4],
// [horizontalStep * 8, verticalStep * 4],
// [horizontalStep * 9, verticalStep * 4],
//
// [horizontalStep, verticalStep * 5],
// [horizontalStep * 2, verticalStep * 5],
// [horizontalStep * 3, verticalStep * 5],
// [horizontalStep * 4, verticalStep * 5],
// [horizontalStep * 5, verticalStep * 5],
// [horizontalStep * 6, verticalStep * 5],
// [horizontalStep * 7, verticalStep * 5],
// [horizontalStep * 8, verticalStep * 5],
// [horizontalStep * 9, verticalStep * 5],
//
// [horizontalStep, verticalStep * 6],
// [horizontalStep * 2, verticalStep * 6],
// [horizontalStep * 3, verticalStep * 6],
// [horizontalStep * 4, verticalStep * 6],
// [horizontalStep * 5, verticalStep * 6],
// [horizontalStep * 6, verticalStep * 6],
// [horizontalStep * 7, verticalStep * 6],
// [horizontalStep * 8, verticalStep * 6],
// [horizontalStep * 9, verticalStep * 6],
//
// [horizontalStep, verticalStep * 7],
// [horizontalStep * 2, verticalStep * 7],
// [horizontalStep * 3, verticalStep * 7],
// [horizontalStep * 4, verticalStep * 7],
// [horizontalStep * 5, verticalStep * 7],
// [horizontalStep * 6, verticalStep * 7],
// [horizontalStep * 7, verticalStep * 7],
// [horizontalStep * 8, verticalStep * 7],
// [horizontalStep * 9, verticalStep * 7],
// const rectangles = [
//     [getRandom(20, 100), getRandom(100, 200)],
//     [getRandom(20, 100), getRandom(100, 200)],
//     [getRandom(20, 100), getRandom(100, 200)],
//     [getRandom(100, 300), getRandom(20, 200)],
//
//     [getRandom(20, 200), getRandom(400, 600)],
//     [getRandom(20, 200), getRandom(400, 600)],
//
//     [getRandom(400, 1000), getRandom(20, 100)],
//     [getRandom(400, 1000), getRandom(20, 100)],
//     [getRandom(400, 1000), getRandom(100, 200)],
//
//     [getRandom(400, 1000), getRandom(400, 500)],
//     [getRandom(400, 1000), getRandom(400, 500)],
//     [getRandom(400, 1000), getRandom(500, 600)],
//     [getRandom(400, 1000), getRandom(500, 600)],
// ]

