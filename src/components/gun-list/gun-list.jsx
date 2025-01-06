import {Wrapper} from './gun-list.style'

import gun1Img from '../../img/gun1_in_bag.webp';
import gun2Img from '../../img/gun2_in_bag.webp';
import gun3Img from '../../img/gun3_in_bag.webp';

import {game} from '../../utils/game';
import {weapon_gun1, weapon_gun2, weapon_gun3} from "../../utils/gun";

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