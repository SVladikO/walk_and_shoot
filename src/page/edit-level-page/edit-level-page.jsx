import {useState} from 'react';
import {Wrapper, Row, Block} from './edit-level-page.style'

function LevelModification({selectedEditLevelIds}) {
    const [selectedBlocks, setSelectedBlocks] = useState(selectedEditLevelIds)

    const addBlock = index => {
        setSelectedBlocks([...selectedBlocks, index])
    }
    const deleteBlock = index => {
        setSelectedBlocks([...selectedBlocks.filter(i => i !== index)])
    }

    const clearBlocks = () => setSelectedBlocks([])

    const onBlockClick = index => () => {
        console.log('click on: ', index);

        const isSelected = selectedBlocks.includes(index);

        isSelected
            ? deleteBlock(index)
            : addBlock(index)
    }

    const trLength = 8;
    const tdLength = 16;
    let indexAccamulator = 0;

    return (
        <Wrapper>
            <div>
                <button onClick={clearBlocks}>Clear board</button>
            </div>
            {
                Array(trLength).fill(1).map(_ => (
                        <Row>
                            {
                                Array(tdLength).fill(1).map(__ => {
                                    const index = indexAccamulator++
                                    return <Block isSelected={selectedBlocks.includes(index)}
                                                  onClick={onBlockClick(index)}>{index}</Block>
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
                <input value={`[${selectedBlocks.sort((a, b) => a - b).join(', ')}]`}/>
            </div>

        </Wrapper>
    )
}

export default LevelModification;