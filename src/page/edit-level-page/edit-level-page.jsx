import {useState} from 'react';
import {Wrapper, Row, Block} from './edit-level-page.style'

function LevelModification() {
    const [selectedBlocks, setSelectedBlocks] = useState([])

    const addBlock = () => {
    }
    const deleteBlock = () => {
    }

    const trLength = 8;
    const tdLength = 16;
    let indexAccamulator = 0;

    return (
        <Wrapper>
            {
                Array(trLength).fill(1).map(_ => (
                        <Row>
                            {
                                Array(tdLength).fill(1).map(__ => {
                                    console.log(indexAccamulator)
                                    return <Block>{indexAccamulator++}</Block>
                                })
                            }
                        </Row>
                    )
                )
            }
        </Wrapper>
    )
}

export default LevelModification;