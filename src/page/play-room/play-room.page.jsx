import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

import {
    Wrapper,
    HeaderWrapper,
    LineGroup,
    SettingsWrapper,
    SettingsInnerWrapper,
    Title,
    MoreLessWrapper,
    SettingsItemWrapper,
} from './play-room.page.style.js'

import {ReactComponent as SettingsIcon} from "../../icons/settings.svg";

import {
    enableAutoShoot,
    disableAutoShoot,
    enableSound,
    disableSound,
    closeSettings,
    openSettings,
} from "../../features/app.slice";

import GunList from "../../components/gun-list/gun-list";
import Bullets from "../../components/bullets/bullets";
import {game} from "../../util/game";

import Board from "../../module/board/board";

const PlayRoomPage = () => {
    const {isShowSettings} = useSelector(state => state.app);
    return (
        <Wrapper>
            <Header/>
            <Board/>
            {isShowSettings && <Settings/>}
        </Wrapper>
    )
}

const Header = () => {
    const {userBulletsInClip} = useSelector(state => state.app);
    const dispatch = useDispatch();

    return (
        <HeaderWrapper>
            <LineGroup></LineGroup>
            <LineGroup>
                <GunList setUserBulletAmount={() => 'setUserBulletAmount'}/>
                <Bullets amount={userBulletsInClip} maxAmount={game?.user?.weapon?.reloadBulletAmount || 8}/>
                {/* <Health health={userHealth}/> */}
                <SettingsIcon onClick={() => dispatch(openSettings())}/>
            </LineGroup>
        </HeaderWrapper>
    )
}

const Settings = () => {
    const {isSoundEnabled, gameSpeed} = useSelector(state => state.app);
    const dispatch = useDispatch();

    const onSwitchSound = () => isSoundEnabled ? dispatch(disableSound()) : dispatch(enableSound());

    return (
        <SettingsWrapper>
            <SettingsInnerWrapper>
                <div>
                    <Title>SETTINGS</Title>
                    <SettingsItem is={isSoundEnabled} label="Sound" onClick={onSwitchSound}/>
                    <MoreLessWrapper>
                        Game speed
                        <div>
                            <Button size="small" variant="contained">-</Button>
                            {gameSpeed}
                            <Button size="small" variant="contained">+</Button>
                        </div>
                    </MoreLessWrapper>
                </div>
                <div>
                    <Button variant="contained">Menu</Button>
                    <Button variant="contained" onClick={() => dispatch(closeSettings())}>Close</Button>
                </div>
            </SettingsInnerWrapper>
        </SettingsWrapper>
    )
}

const SettingsItem = ({is, label, onClick}) => {
    return (
        <SettingsItemWrapper>
            <span>{label}</span>
            <Switch checked={is} onClick={onClick}/>
        </SettingsItemWrapper>
    )
}

export default PlayRoomPage;