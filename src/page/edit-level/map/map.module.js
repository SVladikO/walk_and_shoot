import {Block, MapWrapper, Row} from "./map.module.style";

import {ENEMY_TYPE} from "../../../util/types";
import gun3_in_bag_src from "../../../img/gun3_in_bag.webp";
import gun2_in_bag_src from "../../../img/gun2_in_bag.webp";
import gun1_in_bag_src from "../../../img/gun1_in_bag.webp";
import {ReactComponent as WalkIcon} from '../../../img/icons/walk.svg';

import {INTERACTION_TYPE} from '../../../util/types'

const trLength = 8;
const tdLength = 16;

const Map = ({
                 mapInteraction,
                 enemies,
                 blockIds,
                 userStartPosition,
                 setBlockIds,
                 setEnemies,
                 setUserStartPosition,
             }) => {

    let indexAccamulator = 0;

    const addBlock = blockId => setBlockIds([...blockIds, blockId]);
    const deleteBlock = index => setBlockIds([...blockIds.filter(i => i !== index)])

    const addUnit = index => {
        setEnemies([...enemies,
            {
                index,
                isWalk: mapInteraction.isEnemyWalk,
                type: mapInteraction.selectedEnemyType,
            }]
        );
    }

    const deleteUnit = index => {
        setEnemies([...enemies.filter(el => el.index !== index)]);
    }

    const onBlockClick = (blockId, rowIndex, colIndex) => () => {
        if (mapInteraction.interactionTyp === INTERACTION_TYPE.ADD_ENEMY) {
            const isIncludeUnit = enemies.map(el => el.index).includes(blockId);

            if (isIncludeUnit) {
                deleteUnit(blockId)
            } else {
                addUnit(blockId)
                deleteBlock(blockId)
            }
        }

        if (mapInteraction.interactionTyp === INTERACTION_TYPE.ADD_BLOCK) {
            const isIncludeBlock = blockIds.includes(blockId);
            if (isIncludeBlock) {
                deleteBlock(blockId)
            } else {
                addBlock(blockId)
                deleteUnit(blockId)
            }
        }

        if (mapInteraction.interactionTyp === INTERACTION_TYPE.ADD_USER_POSITION) {
            setUserStartPosition({rowIndex, colIndex, blockId})
            deleteBlock(blockId)
            deleteUnit(blockId)
        }
    }

    const rows = Array(trLength).fill(1);
    const columns = Array(tdLength).fill(1);

    return (
        <MapWrapper>
            {
                rows.map((_, rowIndex) => (
                        <Row key={`row:${rowIndex}`}>
                            {
                                columns.map((__, colIndex) => {
                                    const index = indexAccamulator++
                                    const unit = enemies.find(el => el.index === index)

                                    let gunSrc;

                                    if (unit) {
                                        switch (unit.type) {
                                            case ENEMY_TYPE.PISTOL:
                                                gunSrc = gun1_in_bag_src;
                                                break;
                                            case ENEMY_TYPE.AK47:
                                                gunSrc = gun2_in_bag_src;
                                                break;
                                            case ENEMY_TYPE.GUN:
                                                gunSrc = gun3_in_bag_src;
                                                break;
                                        }
                                    }

                                    return (
                                        <div key={`row:${rowIndex}_col:${colIndex}`}>
                                            <Block
                                                isIncludeUnit={!!unit}
                                                isIncludeBlock={blockIds.includes(index)}
                                                isUserPosition={index === userStartPosition.blockId}
                                                onClick={onBlockClick(index, rowIndex, colIndex)}
                                            >
                                                {index}
                                                {gunSrc && <img src={gunSrc} alt="gun image"/>}
                                                {unit && unit.isWalk && <WalkIcon/>}
                                            </Block>
                                        </div>

                                    )
                                })
                            }
                        </Row>
                    )
                )
            }
        </MapWrapper>
    )
}

export default Map;
