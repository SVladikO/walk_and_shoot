import {Wrapper} from './menu-button.style';
import {ReactComponent as MenuIcon} from '../../icons/menu.svg';

export default function MenuButton({showMenu}) {
    return (
        <Wrapper>
            <MenuIcon onClick={() => showMenu(true)}/>
        </Wrapper>
    )
}