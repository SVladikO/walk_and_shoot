import {GUN_TYPE} from './type';
import {getRandom} from '../../util/util';
//pistol
export const weapon_gun1 = {
    imageId: 'gunIconId1',
    type: GUN_TYPE.PISTOL,
    bulletAmount: 8,
    shootSpeedStep: 30,
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
    imageId: 'gunIconId2',
    type: GUN_TYPE.AK,
    bulletAmount: 30,
    shootSpeedStep: 15,
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
    shoot: (angle, getBullet) => {
        let bullets = [];

        const isBulletRebound = getRandom(1, 5) % 2 > 0;
        const isBulletFlyUp = getRandom(1, 5) % 2 > 0;

        if (isBulletRebound) {
            isBulletFlyUp
                ? bullets.push(getBullet(angle + getRandom(1, 5) / 10))
                : bullets.push(getBullet(angle - getRandom(1, 5) / 10))
        } else {
            bullets.push(getBullet(angle));
        }

        return bullets;
    },
}

//gun
export const weapon_gun3 = {
    imageId: 'gunIconId3',
    type: GUN_TYPE.GUN,
    bulletAmount: 2,
    shootSpeedStep: 40,
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
