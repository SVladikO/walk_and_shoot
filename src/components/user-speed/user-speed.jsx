import {useState} from 'react';

import {Wrapper, InputWrapper} from './user-speed.style';
import {game} from '../../util/glob';

export default function UserSpeed() {
    const [userSpeed, setUserSpeed] = useState(game.user?.step || 1);
    const changeUserSpeed = i => {
        game.user.step += i;
        setUserSpeed(game.user.step)
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