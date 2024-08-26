import {Wrapper} from "./shoot-auto.style";

export default function ShootAuto({value, onChangeHandler}) {
    return (
        <Wrapper>
            shoot auto
            <input type='checkbox' value={value} onChange={onChangeHandler}/>
        </Wrapper>
    )
}