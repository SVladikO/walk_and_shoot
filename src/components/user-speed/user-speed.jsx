import {Wrapper, InputWrapper} from './user-speed.style';

export default function UserSpeed() {
    return (
        <Wrapper>
            user speed
            <InputWrapper>
                <span>-</span>
                <input type="number" value="1" onChange={() => {}}/>
                <span>+</span>
            </InputWrapper>
        </Wrapper>
    )
}