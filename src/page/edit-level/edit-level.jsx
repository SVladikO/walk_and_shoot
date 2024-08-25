import {useState} from 'react';
import {Wrapper, Navigation, NavigationBtn, Row, Block} from './edit-level.style'

import {ENEMY_TYPE} from '../../entity/unit/type';
import Units from '../../components/units/units'

import gunPistolSrc from '../../images/gun1.png';
import gunAK47Src from '../../images/gun2.png';
import gunGUNSrc from '../../images/gun3.png';

import {ReactComponent as WalkIcon} from '../../icons/walk.svg';

function EditLevel({selectedEditLevelIds, selectedUnitIds, onShowMenuPage}) {
    const [isSelectUnit, setIsSelectUnit] = useState(true)
    const [isEnemyWalk, setIsEnemyWalk] = useState(false)
    const [selectEnemyType, setSelectEnemyType] = useState(ENEMY_TYPE.PISTOL)
    const [selectedUnits, setSelectedUnits] = useState(selectedUnitIds)
    const [selectedBlocks, setSelectedBlocks] = useState(selectedEditLevelIds)

    const addBlock = index => {
        setSelectedBlocks([...selectedBlocks, index])
    }

    const deleteBlock = index => {
        setSelectedBlocks([...selectedBlocks.filter(i => i !== index)])
    }

    const addUnit = index => {
        setSelectedUnits([...selectedUnits, {type: selectEnemyType, index, isWalk: isEnemyWalk}])
    }

    const deleteUnit = index => {
        setSelectedUnits([...selectedUnits.filter(el => el.index !== index)])
    }

    const clearBlocks = () => {
        setSelectedBlocks([])
        setSelectedUnits([])
    }

    const onBlockClick = index => () => {
        if (isSelectUnit) {
            const isIncludeUnit = selectedUnits.map(el => el.index).includes(index);
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

    console.log({selectedUnits})

    return (
        <div>
            <NavigationBtn onClick={onShowMenuPage}>MENU</NavigationBtn>
            <Wrapper>
                <div>
                    <Navigation>
                        <NavigationBtn onClick={clearBlocks}>Clear board</NavigationBtn>
                        <NavigationBtn onClick={() => setSelectedUnits([])}>Clear enemies</NavigationBtn>
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
                                            const unit = selectedUnits.find(el => el.index === index)

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
                        <input value={`${JSON.stringify(selectedUnits)}`}/>
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