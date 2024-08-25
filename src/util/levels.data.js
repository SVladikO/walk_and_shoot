import {getPistolUnit, getGunUnit, getAkUnit} from '../entity/unit/index';
import {setLocalStorage, LOCAL_STORAGE_KEY, getLocalStorage} from './localstorage';

const isUnitRandomWalkEnable = true;

const levels = [
    // level 1
    {
        blockIds: [2, 18, 19, 21, 22, 23, 26, 28, 29, 30, 34, 38, 41, 42, 45, 58, 65, 69, 72, 76, 80, 81, 82, 84, 85, 87, 88, 89, 91, 92, 95, 101, 108, 110, 111],
        enemies: [
            {"type": "PISTOL", "index": 35, "isWalk": false},
            {"type": "PISTOL", "index": 68, "isWalk": false},
            {"type": "PISTOL", "index": 112, "isWalk": false},
            {"type": "PISTOL", "index": 102, "isWalk": false},
            {"type": "PISTOL", "index": 73, "isWalk": false},
            {"type": "PISTOL", "index": 6, "isWalk": false},
            {"type": "PISTOL", "index": 59, "isWalk": false},
            {"type": "GUN", "index": 94, "isWalk": false},
            {"type": "AK47", "index": 64, "isWalk": true}],
    },
    // level 2
    {
        blockIds: [19, 20, 21, 28, 29, 30, 35, 41, 46, 56, 71, 73, 83, 94, 99, 100, 101, 108, 109, 110],
        enemies: [
            {"type": "PISTOL", "index": 36, "isWalk": false},
            {"type": "PISTOL", "index": 72, "isWalk": false},
            {"type": "GUN", "index": 116, "isWalk": false},
            {"type": "AK47", "index": 6, "isWalk": true},
            {"type": "AK47", "index": 104, "isWalk": true},
            {"type": "AK47", "index": 59, "isWalk": true},
            {"type": "GUN", "index": 15, "isWalk": true},
            {"type": "GUN", "index": 127, "isWalk": true}
        ],
    },
    // levels 3
    {
        blockIds: [1, 6, 11, 12, 17, 22],
        enemies: [],
    },
    // level 4
    {
        blockIds: [2, 6, 8, 12, 18, 22],
        enemies: [],
    },
]


const wasLevelsInitialized = getLocalStorage(LOCAL_STORAGE_KEY.LEVELS)

if (!wasLevelsInitialized) {
    setLocalStorage(LOCAL_STORAGE_KEY.LEVELS, levels)
}

