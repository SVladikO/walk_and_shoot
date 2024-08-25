import {useState} from 'react';
import {Wrapper, Navigation, NavigationBtn, Row, Block} from './edit-level.style'

import {ENEMY_TYPE} from '../../entity/unit/type';
import Units from '../../components/units/units'

import gunPistolSrc from '../../images/gun1.png';
import gunAK47Src from '../../images/gun2.png';
import gunGUNSrc from '../../images/gun3.png';

import {getLocalStorage, setLocalStorage, LOCAL_STORAGE_KEY} from '../../util/localstorage';

import {ReactComponent as WalkIcon} from '../../icons/walk.svg';

function EditLevel({levelForEdit, onShowMenuPage}) {
    const [isSelectUnit, setIsSelectUnit] = useState(true)
    const [isEnemyWalk, setIsEnemyWalk] = useState(false)
    const [selectEnemyType, setSelectEnemyType] = useState(ENEMY_TYPE.PISTOL)

    const [selectedEnemies, setSelectedEnemies] = useState(levelForEdit.enemies || [])
    const [selectedBlocks, setSelectedBlocks] = useState(levelForEdit.blockIds || [])

    const addBlock = index => {
        setSelectedBlocks([...selectedBlocks, index])
    }

    const deleteBlock = index => {
        setSelectedBlocks([...selectedBlocks.filter(i => i !== index)])
    }

    const addUnit = index => {
        setSelectedEnemies([...selectedEnemies, {type: selectEnemyType, index, isWalk: isEnemyWalk}])
    }

    const deleteUnit = index => {
        setSelectedEnemies([...selectedEnemies.filter(el => el.index !== index)])
    }

    const clearBlocks = () => {
        setSelectedBlocks([])
        setSelectedEnemies([])
    }

    const onBlockClick = index => () => {
        if (isSelectUnit) {
            const isIncludeUnit = selectedEnemies.map(el => el.index).includes(index);
            isIncludeUnit
                ? deleteUnit(index)
                : addUnit(index)

            return
        }

        const isIncludeBlock = selectedBlocks.includes(index);
        isIncludeBlock
            ? deleteBlock(index)
            : addBlock(index)
    }

    const trLength = 8;
    const tdLength = 16;
    let indexAccamulator = 0;

    console.log({selectedEnemies})

    return (
        <div>

            <NavigationBtn onClick={onShowMenuPage}>MENU</NavigationBtn>
            <NavigationBtn onClick={() => {
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
                onShowMenuPage();
            }}>Save level
            </NavigationBtn>
            <NavigationBtn onClick={clearBlocks}>Clear board</NavigationBtn>
            <NavigationBtn onClick={() => setSelectedEnemies([])}>Clear enemies</NavigationBtn>
            <Wrapper>
                <div>
                    <Navigation>
                        <div>
                            <NavigationBtn
                                isAddBlock={!isSelectUnit}
                                onClick={() => setIsSelectUnit(false)}>
                                Select block
                            </NavigationBtn>
                            /
                            <NavigationBtn isAddUnit={isSelectUnit} onClick={() => setIsSelectUnit(true)}>Select
                                unit</NavigationBtn>
                        </div>
                    </Navigation>
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
                                                        gunSrc = gunPistolSrc;
                                                        break;
                                                    case ENEMY_TYPE.AK47:
                                                        gunSrc = gunAK47Src;
                                                        break;
                                                    case ENEMY_TYPE.GUN:
                                                        gunSrc = gunGUNSrc;
                                                        break;
                                                }
                                            }

                                            return (
                                                <Block
                                                    isIncludeUnit={!!unit}
                                                    isIncludeBlock={selectedBlocks.includes(index)}
                                                    isSelectUnit={isSelectUnit}
                                                    onClick={onBlockClick(index)}
                                                >
                                                    {index}
                                                    {gunSrc && <img src={gunSrc}/>}
                                                    {unit && unit.isWalk && <WalkIcon/>}
                                                </Block>
                                            )
                                        })
                                    }
                                </Row>
                            )
                        )
                    }
                    <div>
                        Selected blocks:
                        <input value={`[${selectedBlocks.sort((a, b) => a - b).join(', ')}]`}/>
                    </div>

                    <div>
                        Selected units:
                        <input value={`${JSON.stringify(selectedEnemies)}`}/>
                    </div>

                </div>
                <div>
                    {isSelectUnit &&
                        <Units
                            selectEnemyType={selectEnemyType}
                            setSelectEnemyType={setSelectEnemyType}
                            isEnemyWalk={isEnemyWalk}
                            setIsEnemyWalk={setIsEnemyWalk}

                        />
                    }
                </div>
            </Wrapper>
        </div>
    )
}

export default EditLevel;