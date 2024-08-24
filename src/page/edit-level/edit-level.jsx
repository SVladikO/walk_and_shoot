import {useState} from 'react';
import {Wrapper, Navigation, NavigationBtn, Row, Block} from './edit-level.style'

function LevelModification({selectedEditLevelIds, selectedUnitIds}) {
    const [isSelectUnit, setIsSelectUnit] = useState(true)
    const [selectedUnits, setSelectedUnits] = useState(selectedUnitIds)
    const [selectedBlocks, setSelectedBlocks] = useState(selectedEditLevelIds)

    const addBlock = index => {
        setSelectedBlocks([...selectedBlocks, index])
    }
    const deleteBlock = index => {
        setSelectedBlocks([...selectedBlocks.filter(i => i !== index)])
    }

    const addUnit = index => {
        setSelectedUnits([...selectedUnits, index])
    }
    const deleteUnit = index => {
        setSelectedUnits([...selectedUnits.filter(i => i !== index)])
    }

    const clearBlocks = () => {
        setSelectedBlocks([])
        setSelectedUnits([])
    }

    const onBlockClick = index => () => {
        if (isSelectUnit) {
            const isIncludeUnit = selectedUnits.includes(index);
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

    return (
        <Wrapper>
            <Navigation>
                <NavigationBtn onClick={clearBlocks}>Clear board</NavigationBtn>
                <div>

                    <NavigationBtn isAddUnit={isSelectUnit} onClick={() => setIsSelectUnit(true)}>Select unit</NavigationBtn>
                    /
                    <NavigationBtn isAddBlock={!isSelectUnit} onClick={() => setIsSelectUnit(false)}>Select block</NavigationBtn>
                </div>
            </Navigation>
            {
                Array(trLength).fill(1).map(_ => (
                        <Row>
                            {
                                Array(tdLength).fill(1).map(__ => {
                                    const index = indexAccamulator++
                                    return (
                                        <Block
                                            isIncludeUnit={selectedUnits.includes(index)}
                                            isIncludeBlock={selectedBlocks.includes(index)}
                                            isSelectUnit={isSelectUnit}
                                            onClick={onBlockClick(index)}
                                        >
                                            {index}
                                        </Block>
                                    )
                                })
                            }
                        </Row>
                    )
                )
            }

            <div>Selected blocks:</div>
            <div>
                <input value={`[${selectedBlocks.sort((a, b) => a - b).join(', ')}]`}/>
            </div>

            <div>Selected units:</div>
            <div>
                <input value={`[${selectedUnits.sort((a, b) => a - b).join(', ')}]`}/>
            </div>
        </Wrapper>
    )
}

export default LevelModification;