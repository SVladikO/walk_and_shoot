import {weapon_gun1, weapon_gun2, weapon_gun3} from "../gun/gun";
import {UNIT_TYPE} from "./type";
import {screenMainCanvas} from '../../util/glob';
import {Unit} from "./unit";

console.log(weapon_gun1)

export const getUser = (weapon = weapon_gun1) =>
    new Unit(screenMainCanvas.getHorizontalSide(1) / 2, screenMainCanvas.getVerticalSide(1) / 2, 20, UNIT_TYPE.USER, weapon, 'userIconId1')

export const getUnit = (x, y, health, weapon, unitImageId, isRandomWalkEnable) =>
    new Unit(x, y, health, UNIT_TYPE.UNIT, weapon, unitImageId, isRandomWalkEnable);

export const getPistolUnit = (x, y, isRandomWalkEnable, health = 3) =>
    getUnit(x, y, health, weapon_gun1, 'userIconId2', isRandomWalkEnable);

export const getAkUnit = (x, y, isRandomWalkEnable, health = 4) =>
    getUnit(x, y, health, weapon_gun2, 'userIconId2', isRandomWalkEnable);

export const getGunUnit = (x, y, isRandomWalkEnable, health = 4) =>
    getUnit(x, y, health, weapon_gun3, 'userIconId2', isRandomWalkEnable);
