import {useState} from 'react';

import {Wrapper, InputWrapper} from './user-speed.style';
import {game} from '../../util/game';

export default function UserSpeed() {
    const [userSpeed, setUserSpeed] = useState(game.unitSpeedStep || 1);
    const changeUserSpeed = i => {
        game.unitSpeedStep += i;
        setUserSpeed(game.unitSpeedStep)
    }

    return (
        <Wrapper>
            user speed
            <InputWrapper>
                <span onClick={() => changeUserSpeed(-1)}>-</span>
                <input type="number" value={userSpeed} onChange={() => {}}/>
                <span  onClick={() => changeUserSpeed(1)}>+</span>
            </InputWrapper>
        </Wrapper>
    )
}