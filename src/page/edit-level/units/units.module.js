import {BulletImg, GunImg, InnerWrapperUnit, Wrapper, WrapperUnit} from "./units.module.style";

import gun1_in_bag_src from "../../../img/gun1_in_bag.webp";
import gun1_bullet_fly from "../../../img/gun1_bullet_fly.webp";
import {ENEMY_TYPE} from "../../../util/unit/type";
import gun2_in_bag_src from "../../../img/gun2_in_bag.webp";
import gun2_bullet_fly from "../../../img/gun2_bullet_fly.webp";
import gun3_in_bag_src from "../../../img/gun3_in_bag.webp";
import gun3_bullet_fly from "../../../img/gun3_bullet_fly.webp";

import {INTERACTION_TYPE} from '../util'

function Units({mapInteraction, setMapInteraction}) {
    const onChangeSelectedEnemyType = type => {
        setMapInteraction({...mapInteraction, selectedEnemyType: type, interactionTyp: INTERACTION_TYPE.ADD_ENEMY})
    }

    const isSelectedEnemy = type => mapInteraction.selectedEnemyType === type && mapInteraction.interactionTyp === INTERACTION_TYPE.ADD_ENEMY;

    return (
        <Wrapper>
            <UnitItem
                label="Change user start position"
                isSelected={mapInteraction.interactionTyp === INTERACTION_TYPE.ADD_USER_POSITION}
                onClickHandler={() => setMapInteraction({
                    ...mapInteraction,
                    selectedEnemyType: undefined,
                    interactionTyp: INTERACTION_TYPE.ADD_USER_POSITION
                })}
            />
            <UnitItem
                label="Add block"
                onClickHandler={() =>
                    setMapInteraction({
                        selectedEnemyType: undefined,
                        interactionTyp: INTERACTION_TYPE.ADD_BLOCK,
                    })
                }
                isSelected={mapInteraction.interactionTyp === INTERACTION_TYPE.ADD_BLOCK}
            />
            <UnitItem
                gunImgSrc={gun1_in_bag_src}
                bulletImgSrc={gun1_bullet_fly}
                onClickHandler={() => onChangeSelectedEnemyType(ENEMY_TYPE.PISTOL)}
                isSelected={isSelectedEnemy(ENEMY_TYPE.PISTOL)}
            />
            <UnitItem
                gunImgSrc={gun2_in_bag_src}
                bulletImgSrc={gun2_bullet_fly}
                onClickHandler={() => onChangeSelectedEnemyType(ENEMY_TYPE.AK47)}
                isSelected={isSelectedEnemy(ENEMY_TYPE.AK47)}
            />
            <UnitItem
                gunImgSrc={gun3_in_bag_src}
                bulletImgSrc={gun3_bullet_fly}
                onClickHandler={() => onChangeSelectedEnemyType(ENEMY_TYPE.GUN)}
                isSelected={isSelectedEnemy(ENEMY_TYPE.GUN)}
            />
            <div>
                <input
                    type="checkbox"
                    value={mapInteraction.isEnemyWalk}
                    onChange={() => setMapInteraction({...mapInteraction, isEnemyWalk: !mapInteraction.isEnemyWalk})}
                />
                User walk
            </div>
        </Wrapper>
    )
}

function UnitItem({label = 'Add unit', onClickHandler, gunImgSrc, bulletImgSrc, isSelected}) {
    return (
        <WrapperUnit onClick={onClickHandler} isselected={isSelected}>
            <div>{label}</div>
            <InnerWrapperUnit>
                <GunImg src={gunImgSrc} alt=""/>
                <BulletImg src={bulletImgSrc} alt=""/>
            </InnerWrapperUnit>
        </WrapperUnit>
    )
}

export default Units;