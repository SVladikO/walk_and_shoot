import {useState} from 'react';
import {Wrapper, Navigation, NavigationBtn, Row, Block} from './edit-level.page.style'

import {ENEMY_TYPE} from '../../entity/unit/type';
import { weapons } from '../../entity/gun/gun';
import Units from '../../components/units/units'

import gunPistolSrc from '../../images/gun1.png';
import gunAK47Src from '../../images/gun2.png';
import gunGUNSrc from '../../images/gun3.png';

import {getLocalStorage, setLocalStorage, LOCAL_STORAGE_KEY} from '../../util/localstorage';

import {ReactComponent as WalkIcon} from '../../icons/walk.svg';

function EditLevelPage({levelForEdit, onShowMenuPage}) {
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

    // console.log({selectedEnemies})

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
                <div style={{border: 'solid 1px red'}}>
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
                    {isSelectUnit &&
                        <Units
                            selectEnemyType={selectEnemyType}
                            setSelectEnemyType={setSelectEnemyType}
                            isEnemyWalk={isEnemyWalk}
                            setIsEnemyWalk={setIsEnemyWalk}

                        />
                    }
                    
                     <table>
                        <tr>
                            <td>in bag</td>
                            <td>in hand</td>
                            <td>fire effect</td>
                            <td>bullet destroyed</td>
                            <td>bullet_avaliable</td>
                            <td>damage</td>
                            <td>speed</td>
                            <td>sound_gun_shoot</td>
                            <td>sound_gun_reload</td>
                            <td>sound_gun_empty_shoot</td>
                        </tr>
                        {weapons.map(w => {
                            return (
                                <tr>
                                    <td><img src={w.img.gun.in_bag} style={{height: '110px', width: 'auto'}} /></td>
                                    <td><img src={w.img.gun.in_hand} /></td>
                                    <td><img src={w.img.gun.fire_effect} /></td>
                                    <td><img src={w.img.bullet.fly} style={{height: '40px', width: 'auto'}}/></td>
                                    <td><img src={w.img.bullet.destroyed} style={{height: '40px', width: 'auto'}}/></td>
                                    <td><img src={w.img.bullet.avaliable} style={{height: '40px', width: 'auto'}}/></td>
                                    <td>{w.damage}</td>
                                    <td>{w.speed}</td>
                                    <td>{w.sound.gun.shoot}</td>
                                    <td>{w.sound.gun.reload}</td>
                                    <td>{w.sound.gun.empty_shoot}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </Wrapper>
        </div>
    )
}

export default EditLevelPage;