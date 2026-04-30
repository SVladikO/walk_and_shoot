import {useDispatch} from "react-redux";
import {HeaderWrapper, LineGroup} from "./header.style";

import {ReactComponent as SettingsIcon} from "../../../img/icons/settings.svg";
import GunList from "../../../components/gun-list/gun-list";

import { openSettings } from "../../../features/app.slice";

const Header = () => {
    const dispatch = useDispatch();

    return (
        <HeaderWrapper>
            <LineGroup></LineGroup>
            <LineGroup>
                <GunList setUserBulletAmount={() => 'setUserBulletAmount'}/>
                <SettingsIcon onClick={() => dispatch(openSettings())}/>
            </LineGroup>
        </HeaderWrapper>
    )
}

export default Header;