import {Wrapper} from './gun-list.style'

import gun1Img from '../../images/gun1.png';
import gun2Img from '../../images/gun2.png';
import gun3Img from '../../images/gun3.png';

import {game} from '../../util/game';
import {hideNoBulletNotification} from "../../util/util";
import {weapon_gun1, weapon_gun2, weapon_gun3} from "../../entity/gun/gun";

export default function GunList({setUserBulletAmount}) {
    const setUserGun = gun => {
        game.user.weapon = gun;
        game.user.bulletAmount = gun.bulletAmount;
        setUserBulletAmount(gun.bulletAmount)
    }

    return (
        <Wrapper>
            <img src={gun1Img} onClick={() => setUserGun(weapon_gun1)} alt="pistol image"/>
            <img src={gun2Img} onClick={() => setUserGun(weapon_gun2)} alt="ak47 image"/>
            <img src={gun3Img} onClick={() => setUserGun(weapon_gun3)} alt="gun image"/>
            {/*<div id="available_guns" class="themes">*/}
            {/*    <img onclick="updateWeapon('weapon_gun1')" src="public/img/list_gun1.png" alt=""/>*/}
            {/*    <img onclick="updateWeapon('weapon_gun2')" src="public/img/list_gun2.png" alt=""/>*/}
            {/*    <img onclick="updateWeapon('weapon_gun3')" src="public/img/list_gun3.png" alt=""/>*/}
            {/*</div>*/}
        </Wrapper>
    )
}