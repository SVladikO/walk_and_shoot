import {UNIT_TYPE} from "./type";
import {weapon_gun1} from "../gun/gun";
import {Unit} from "./unit";


export function getUser(weapon = weapon_gun1) {
    return new Unit(window.screenMainCanvas.getHorizontalSide(1) / 2, window.screenMainCanvas.getVerticalSide(1) / 2, 20, UNIT_TYPE.USER, weapon, 'userIconId1')
}

export function getUnit(x, y, health, weapon, unitImageId, isRandomWalkEnable) {
    return new Unit(x, y, health, UNIT_TYPE.UNIT, weapon, unitImageId, isRandomWalkEnable);
}
