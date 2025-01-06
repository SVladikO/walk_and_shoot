import {useState} from 'react';
import {Wrapper} from './edit-level.page.style'

import {ENEMY_TYPE} from '../../utils/types';
import {INTERACTION_TYPE} from '../../utils/types.js'

import ControlButtons from './control-buttons/control-buttons.module';
import Map from './map/map.module';
import Units from './units/units.module';
import {useSelector} from "react-redux";

function EditLevelPage() {
    const {levelForEditIndex, levels} = useSelector(state => state.app);

    const [blockIds, setBlockIds] = useState(levels[levelForEditIndex].blockIds);
    const [enemies, setEnemies] = useState(levels[levelForEditIndex].enemies);
    const [userStartPosition, setUserStartPosition] = useState(levels[levelForEditIndex].userStartPosition);

    const [mapInteraction, setMapInteraction] = useState({
        isEnemyWalk: false,
        selectedEnemyType: ENEMY_TYPE.PISTOL,
        interactionTyp: INTERACTION_TYPE.ADD_ENEMY,
    })

    return (
        <div>
            <ControlButtons
                enemies={enemies}
                blockIds={blockIds}
                userStartPosition={userStartPosition}
                setBlockIds={setBlockIds}
                setEnemies={setEnemies}
            />
            <Wrapper>
                <Map
                    mapInteraction={mapInteraction}
                    enemies={enemies}
                    blockIds={blockIds}
                    userStartPosition={userStartPosition}
                    setBlockIds={setBlockIds}
                    setEnemies={setEnemies}
                    setUserStartPosition={setUserStartPosition}
                />
                <Units mapInteraction={mapInteraction} setMapInteraction={setMapInteraction}/>
            </Wrapper>
        </div>
    )
}


export default EditLevelPage;