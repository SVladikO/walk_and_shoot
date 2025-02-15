import {GUN_TYPE} from './types';

//pistol
export const weapon_gun1 = {
    imageId: 'gun1_in_hand_id',
    imageFireId: 'gun1_fire_effect_id',
    imageFlyBulletId: 'gun1_bullet_fly_id',
    imgFirePositionY: -23,
    imgFirePositionX: 20,
    type: GUN_TYPE.PISTOL,
    bulletAmount: 8,
    reloadBulletAmount: 8,
    maxDistance: 1000,
    damage: 2,
    sound: {
        reload: './sound/gun1_recharge.mp3',
        shoot: './sound/gun1_shoot.mp3',
    },
    bulletDeadRadius: 15,
    distanceStep: 2,
    rechargeTime: 2,
    shoot: (angle, getBullet) => ([getBullet(angle)]),
}

//ak
export const weapon_gun2 = {
    imageId: 'gun2_in_hand_id',
    imageFireId: 'gun2_fire_effect_id',
    imageFlyBulletId: 'gun2_bullet_fly_id',
    imgFirePositionY: -20,
    imgFirePositionX: 60,
    type: GUN_TYPE.AK47,
    bulletAmount: 30,
    reloadBulletAmount: 30,
    maxDistance: 1000,
    damage: 3,
    sound: {
        reload: './sound/gun1_recharge.mp3',
        shoot: './sound/gun2_shoot.mp3',
    },
    bulletDeadRadius: 15,
    distanceStep: 2,
    rechargeTime: 2,
    shoot: (angle, getBullet) => ([getBullet(angle)]),
    // shoot: (angle, getBullet) => {
    //     let bullets = [];
    //
    //     const isBulletRebound = getRandom(1, 5) % 2 > 0;
    //     const isBulletFlyUp = getRandom(1, 5) % 2 > 0;
    //
    //     if (isBulletRebound) {
    //         isBulletFlyUp
    //             ? bullets.push(getBullet(angle + getRandom(1, 5) / 10))
    //             : bullets.push(getBullet(angle - getRandom(1, 5) / 10))
    //     } else {
    //         bullets.push(getBullet(angle));
    //     }
    //
    //     return bullets;
    // },
}
//gun
export const weapon_gun3 = {
    imageId: 'gun3_in_hand_id',
    imageFireId: 'gun3_fire_effect_id',
    imageFlyBulletId: 'gun3_bullet_fly_id',
    imgFirePositionY: -23,
    imgFirePositionX: 40,
    type: GUN_TYPE.GUN,
    bulletAmount: 2,
    reloadBulletAmount: 2,
    maxDistance: 450,
    damage: 2.5,
    sound: {
        reload: './sound/gun3_recharge.mp3',
        shoot: './sound/gun3_shoot.mp3',
    },
    bulletDeadRadius: 15,
    distanceStep: 2,
    rechargeTime: 2,
    shoot: (angle, getBullet) => ([
        getBullet(angle - 0.2),
        getBullet(angle - 0.1),
        getBullet(angle),
        getBullet(angle + 0.1),
        getBullet(angle + 0.2),
    ]),
}

// const weapon = {
//     img: {
//         gun: {
//             in_bag: gun1_in_bag,
//             in_hand: gun1_in_hand,
//             fire_effect: gun1_fire_effect
//         },
//         bullet: {
//             fly: gun1_bullet_fly,
//             destroyed: gun1_bullet_destroyed,
//             avaliable: gun1_bullet_avaliable,
//         }
//     },
//     damage: 8,
//     speed: 2,
//     sound: {
//         gun: {
//             shoot: '',
//             reload: '',
//             empty_shoot: '',
//         }
//     }
// }