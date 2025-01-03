import {GUN_TYPE} from './type';
import {getRandom} from '../util';

import gun1_in_bag from '../../img/gun1_in_bag.png';
import gun1_in_hand from '../../img/gun1_in_hand.webp';
import gun1_fire_effect from '../../img/gun1_fire_effect.webp';

import gun1_bullet_fly from '../../img/gun1_bullet_fly.jpeg'
import gun1_bullet_destroyed from '../../img/gun1_bullet_fly.jpeg'
import gun1_bullet_avaliable from '../../img/gun1_bullet_fly.jpeg'

import gun2_in_bag from '../../img/gun2_in_bag.png';
import gun2_in_hand from '../../img/gun2_in_hand.webp';

import gun3_in_bag from '../../img/gun3_in_bag.png';
import gun3_in_hand from '../../img/gun3_in_hand.webp';

//pistol
export const weapon_gun1 = {
    imageId: 'gunIconId1',
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
    imageId: 'gunIconId2',
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

const weapon = {
    img: {
        gun: {
            in_bag: gun1_in_bag,
            in_hand: gun1_in_hand,
            fire_effect: gun1_fire_effect
        },
        bullet: {
            fly: gun1_bullet_fly,
            destroyed: gun1_bullet_destroyed,
            avaliable: gun1_bullet_avaliable,
        }
    },
    damage: 8,
    speed: 2,
    sound: {
        gun: {
            shoot: '',
            reload: '',
            empty_shoot: '',
        }
    }
}

export const weapons = [
    // pistol
    {
        img: {
            gun: {
                in_bag: gun1_in_bag,
                in_hand: gun1_in_hand,
                fire_effect: gun1_fire_effect
            },
            bullet: {
                fly: gun1_bullet_fly,
                destroyed: gun1_bullet_destroyed,
                avaliable: gun1_bullet_avaliable,
            }
        },
        damage: 8,
        speed: 2,
        sound: {
            gun: {
                shoot: '',
                reload: '',
                empty_shoot: '',
            }
        }
    },
    // ak 47
    {
        img: {
            gun: {
                in_bag: gun2_in_bag,
                in_hand: gun2_in_hand,
                fire_effect: gun1_fire_effect
            },
            bullet: {
                fly: gun1_bullet_fly,
                destroyed: gun1_bullet_destroyed,
                avaliable: gun1_bullet_avaliable,
            }
        },
        damage: 8,
        speed: 2,
        sound: {
            gun: {
                shoot: '',
                reload: '',
                empty_shoot: '',
            }
        }
    },
    // winchester
    {
        img: {
            gun: {
                in_bag: gun3_in_bag,
                in_hand: gun3_in_hand,
                fire_effect: gun1_fire_effect
            },
            bullet: {
                fly: gun1_bullet_fly,
                destroyed: gun1_bullet_destroyed,
                avaliable: gun1_bullet_avaliable,
            }
        },
        damage: 8,
        speed: 2,
        sound: {
            gun: {
                shoot: '',
                reload: '',
                empty_shoot: '',
            }
        }
    }
]
