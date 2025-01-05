import {useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import Button from '@mui/material/Button';

import {
    Block,
    ButtonWrapper,
    Row,
    Wrapper,
    MapWrapper,
    WrapperUnits,
    WrapperUnit,
    GunImg,
    BulletImg,
    InnerWrapperUnit
} from './edit-level.page.style'

import gun1_in_bag_src from '../../img/gun1_in_bag.webp';
import gun2_in_bag_src from '../../img/gun2_in_bag.webp';
import gun3_in_bag_src from '../../img/gun3_in_bag.webp';

import gun1_bullet_fly from '../../img/gun1_bullet_fly.webp';
import gun2_bullet_fly from '../../img/gun2_bullet_fly.webp';
import gun3_bullet_fly from '../../img/gun3_bullet_fly.webp';

import {ReactComponent as WalkIcon} from '../../img/icons/walk.svg';

import {levels} from "../../util/levels.data";
import {ENEMY_TYPE} from '../../util/unit/type';
import {getLocalStorage, LOCAL_STORAGE_KEY, setLocalStorage} from '../../util/localstorage';
import {URL} from "../../App";

const INTERACTION_TYPE = {
    ADD_BLOCK: 'ADD_BLOCK',
    ADD_ENEMY: 'ADD_ENEMY',
    ADD_USER_POSITION: 'ADD_USER_POSITION',
}

function EditLevelPage() {
    const {selectedLevel} = useSelector(state => state.app);
    const levelForEdit = levels[selectedLevel];

    const [mapInteraction, setMapInteraction] = useState({
        isEnemyWalk: false,
        selectedEnemyType: ENEMY_TYPE.PISTOL,
        interactionTyp: INTERACTION_TYPE.ADD_ENEMY,
    })

    const [selectedEnemies, setSelectedEnemies] = useState(levelForEdit.enemies || [])
    const [userPosition, setUserPosition] = useState(levelForEdit.userStartPosition)
    const [selectedBlocks, setSelectedBlocks] = useState(levelForEdit.blockIds || [])

    const clearBlocks = () => {
        setSelectedBlocks([])
        setSelectedEnemies([])
    }

    return (
        <div>
            <ControlButtons
                clearBlocks={clearBlocks}
                levelForEdit={levelForEdit}
                selectedBlocks={selectedBlocks}
                selectedEnemies={selectedEnemies}
                setSelectedEnemies={setSelectedEnemies}
                setSelectedBlocks={setSelectedBlocks}
            />
            <Wrapper>
                <Map
                    userPosition={userPosition}
                    setUserPosition={setUserPosition}
                    selectedEnemies={selectedEnemies}
                    setSelectedEnemies={setSelectedEnemies}
                    selectedBlocks={selectedBlocks}
                    setSelectedBlocks={setSelectedBlocks}
                    mapInteraction={mapInteraction}
                />
                <Units
                    mapInteraction={mapInteraction}
                    setMapInteraction={setMapInteraction}

                />
            </Wrapper>
            <div>
                Selected blocks:
                <input value={`[${selectedBlocks.sort((a, b) => a - b).join(', ')}]`}/>
            </div>
            <div>
                Selected units:
                <input value={`${JSON.stringify(selectedEnemies)}`}/>
            </div>
        </div>
    )
}

const ControlButtons = ({
                            levelForEdit,
                            selectedBlocks,
                            selectedEnemies,
                            clearBlocks,
                            setSelectedEnemies,
                            setSelectedBlocks
                        }) => {
    let navigate = useNavigate();

    const onSaveEditedLevel = () => {
        const levels = getLocalStorage(LOCAL_STORAGE_KEY.LEVELS);

        if (levelForEdit.id) {
            //Update level data
            const level = levels.find(level => level.id === levelForEdit.id)
            level.blockIds = selectedBlocks;
            level.enemies = selectedEnemies;
            setLocalStorage(LOCAL_STORAGE_KEY.LEVELS, levels);
        } else {
            //Add new level
            setLocalStorage(LOCAL_STORAGE_KEY.LEVELS, [...levels, {
                id: levels.length + 1,
                enemies: selectedEnemies,
                blockIds: selectedBlocks
            }])
        }
    }

    return (
        <ButtonWrapper>
            <Button size="small" variant="contained" onClick={() => navigate(URL.MENU)}>MENU</Button>
            <Button size="small" variant="contained" color="success" onClick={onSaveEditedLevel}>Save level</Button>
            <Button size="small" variant="contained" color="error" onClick={() => setSelectedBlocks([])}>Clear
                blocks</Button>
            <Button size="small" variant="contained" color="error" onClick={() => setSelectedEnemies([])}>Clear
                enemies</Button>
            <Button size="small" variant="contained" color="error" onClick={clearBlocks}>Clear board</Button>
        </ButtonWrapper>
    )
}

function Units({mapInteraction, setMapInteraction}) {
    const onChangeSelectedEnemyType = type => {
        setMapInteraction({...mapInteraction, selectedEnemyType: type, interactionTyp: INTERACTION_TYPE.ADD_ENEMY})
    }

    const isSelectedEnemy = type => mapInteraction.selectedEnemyType === type && mapInteraction.interactionTyp === INTERACTION_TYPE.ADD_ENEMY;

    return (
        <WrapperUnits>
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

        </WrapperUnits>
    )
}

function UnitItem({label = 'Add unit', onClickHandler, gunImgSrc, bulletImgSrc, isSelected}) {
    return (

        <WrapperUnit onClick={onClickHandler} isSelected={isSelected}>
            <div>{label}</div>
            <InnerWrapperUnit>
                <GunImg src={gunImgSrc} alt=""/>
                <BulletImg src={bulletImgSrc} alt=""/>
            </InnerWrapperUnit>
        </WrapperUnit>
    )
}

const Map = ({
                 userPosition,
                 setUserPosition,
                 selectedEnemies,
                 selectedBlocks,
                 setSelectedBlocks,
                 setSelectedEnemies,
                 mapInteraction
             }) => {
    const trLength = 8;
    const tdLength = 16;
    let indexAccamulator = 0;

    const addBlock = index => {
        setSelectedBlocks([...selectedBlocks, index])
    }

    const deleteBlock = index => {
        setSelectedBlocks([...selectedBlocks.filter(i => i !== index)])
    }

    const addUnit = index => {
        setSelectedEnemies([...selectedEnemies, {
            type: mapInteraction.selectedEnemyType,
            index,
            isWalk: mapInteraction.isEnemyWalk
        }])
    }

    const deleteUnit = index => {
        setSelectedEnemies([...selectedEnemies.filter(el => el.index !== index)])
    }

    const onBlockClick = index => () => {
        if (mapInteraction.interactionTyp === INTERACTION_TYPE.ADD_ENEMY) {
            const isIncludeUnit = selectedEnemies.map(el => el.index).includes(index);

            if (isIncludeUnit) {
                deleteUnit(index)
            } else {
                addUnit(index)
                deleteBlock(index)
            }
        }

        if (mapInteraction.interactionTyp === INTERACTION_TYPE.ADD_BLOCK) {
            const isIncludeBlock = selectedBlocks.includes(index);
            if (isIncludeBlock) {
                deleteBlock(index)
            } else {
                addBlock(index)
                deleteUnit(index)
            }
        }

        if (mapInteraction.interactionTyp === INTERACTION_TYPE.ADD_USER_POSITION) {
            setUserPosition(index)
            deleteBlock(index)
            deleteUnit(index)
        }
    }

    return (
        <MapWrapper>
            {
                Array(trLength).fill(1).map(_ => (
                        <Row>
                            {
                                Array(tdLength).fill(1).map(__ => {
                                    const index = indexAccamulator++
                                    const unit = selectedEnemies.find(el => el.index === index)

                                    let gunSrc;

                                    if (unit) {
                                        switch (unit.type) {
                                            case ENEMY_TYPE.PISTOL:
                                                gunSrc = gun3_in_bag_src;
                                                break;
                                            case ENEMY_TYPE.AK47:
                                                gunSrc = gun2_in_bag_src;
                                                break;
                                            case ENEMY_TYPE.GUN:
                                                gunSrc = gun1_in_bag_src;
                                                break;
                                        }
                                    }

                                    return (
                                        <Block
                                            isIncludeUnit={!!unit}
                                            isIncludeBlock={selectedBlocks.includes(index)}
                                            isUserPosition={index === userPosition}
                                            // isSelectUnit={isSelectUnit}
                                            onClick={onBlockClick(index)}
                                        >
                                            {index}
                                            {gunSrc && <img src={gunSrc} alt="gun image"/>}
                                            {unit && unit.isWalk && <WalkIcon/>}
                                        </Block>
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

export default EditLevelPage;