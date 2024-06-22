import {weapon_gun1, weapon_gun2, weapon_gun3} from "./gun";
import {getUnit} from "../unit";

export function getPistolUnit(x, y, isRandomWalkEnable, health = 3) {
    return getUnit(x, y, health, weapon_gun1, 'userIconId2', isRandomWalkEnable);
}

export function getAkUnit(x, y, isRandomWalkEnable, health = 4) {
    return getUnit(x, y, health, weapon_gun2, 'userIconId2', isRandomWalkEnable);
}

export function getGunUnit(x, y, isRandomWalkEnable, health = 4) {
    return getUnit(x, y, health, weapon_gun3, 'userIconId2', isRandomWalkEnable);
}