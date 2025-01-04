import {UnitWrapper, Wrapper} from './units.style'

import {ENEMY_TYPE} from "../../util/unit/type";
import gun1Img from '../../img/gun1_in_bag.webp';
import gun2Img from '../../img/gun2_in_bag.webp';
import gun3Img from '../../img/gun3_in_bag.webp';


export default function Units({selectEnemyType, setSelectEnemyType, isEnemyWalk, setIsEnemyWalk}) {
    return (
        <Wrapper>
            <div>Select enemy gun type:</div>
            <UnitItem onClickHandler={() => setSelectEnemyType(ENEMY_TYPE.PISTOL)} imgSrc={gun1Img} isSelected={selectEnemyType === ENEMY_TYPE.PISTOL} />
            <UnitItem onClickHandler={() => setSelectEnemyType(ENEMY_TYPE.AK47)} imgSrc={gun2Img} isSelected={selectEnemyType === ENEMY_TYPE.AK47}/>
            <UnitItem onClickHandler={() => setSelectEnemyType(ENEMY_TYPE.GUN)} imgSrc={gun3Img} isSelected={selectEnemyType === ENEMY_TYPE.GUN}/>
            <div>Should user walk ? <input type="checkbox" value={isEnemyWalk} onChange={() => setIsEnemyWalk(!isEnemyWalk)}/></div>
        </Wrapper>
    )
}

function UnitItem({onClickHandler, imgSrc, isSelected}) {
    return (
        <UnitWrapper onClick={onClickHandler} isSelected={isSelected}>
            <img src={imgSrc} alt=""/>
        </UnitWrapper>
    )
}
