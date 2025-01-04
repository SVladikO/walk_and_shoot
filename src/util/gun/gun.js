import {GUN_TYPE} from './type';
import {getRandom} from '../util';

//pistol
export const weapon_gun1 = {
    imageId: 'gun1_in_hand_id',
    imageFireId: 'gun1_fire_effect_id',
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
    imgFirePositionY: -20,
    imgFirePositionX: 60,
    type: GUN_TYPE.AK,
    bulletAmount: 30,
    reloadBulletAmount: 30,
    maxDistance: 1000,
    damage: 2,
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
    imgFirePositionY: -23,
    imgFirePositionX: 40,
    type: GUN_TYPE.GUN,
    bulletAmount: 2,
    reloadBulletAmount: 2,
    maxDistance: 450,
    damage: 4,
    sound: {
        reload: './sound/gun3_recharge.mp3',
        shoot: './sound/gun3_shoot.mp3',
    },
    bulletDeadRadius: 15,
    distanceStep: 2,
    rechargeTime: 2,
    shoot: (angle, getBullet) => ([getBullet(angle - 0.3), getBullet(angle), getBullet(angle + 0.3)]),
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