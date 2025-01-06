import {weapon_gun1, weapon_gun2, weapon_gun3} from "./gun";
import {UNIT_TYPE} from "./types";
import {Unit} from "./unit";


export const getUser = (startX, startY, weapon = weapon_gun1) =>
    new Unit(startX, startY, 20, UNIT_TYPE.USER, weapon, 'userIconId1')

export const getUnit = (startX, startY, health, weapon, unitImageId, isRandomWalkEnable) =>
    new Unit(startX, startY, health, UNIT_TYPE.UNIT, weapon, unitImageId, isRandomWalkEnable);

export const getPistolUnit = (startX, startY, isRandomWalkEnable, health = 20) =>
    getUnit(startX, startY, health, weapon_gun1, 'userIconId2', isRandomWalkEnable);

export const getAkUnit = (startX, startY, isRandomWalkEnable, health = 20) =>
    getUnit(startX, startY, health, weapon_gun2, 'userIconId2', isRandomWalkEnable);

export const getGunUnit = (startX, startY, isRandomWalkEnable, health = 20) =>
    getUnit(startX, startY, health, weapon_gun3, 'userIconId2', isRandomWalkEnable);
