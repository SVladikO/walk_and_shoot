import {getLocalStorage, LOCAL_STORAGE_KEY, setLocalStorage} from './localstorage';

export const levels = [
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
        blockIds: [17, 19, 21, 23, 25, 27, 29, 31, 49, 51, 53, 55, 57, 59, 61, 63, 81, 83, 85, 87, 89, 91, 93, 95, 113, 115, 117, 119, 121, 123, 125, 127],
        enemies:[{"type":"AK47","index":73,"isWalk":false},{"type":"AK47","index":77,"isWalk":false},{"type":"AK47","index":43,"isWalk":false},{"type":"AK47","index":30,"isWalk":false},{"type":"PISTOL","index":20,"isWalk":true},{"type":"AK47","index":120,"isWalk":false},{"type":"PISTOL","index":99,"isWalk":true},{"type":"GUN","index":52,"isWalk":false},{"type":"GUN","index":24,"isWalk":true},{"type":"GUN","index":126,"isWalk":true}],
    },
    // level 4
    {
        blockIds: [2, 6, 8, 12, 18, 22],
        enemies: [],
    },
]


const wasLevelsInitialized = getLocalStorage(LOCAL_STORAGE_KEY.LEVELS)

if (!wasLevelsInitialized) {
    setLocalStorage(LOCAL_STORAGE_KEY.LEVELS, levels.map((level, index) => ({...level, id: index + 1})))
}

