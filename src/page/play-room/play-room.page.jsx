import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from 'react-redux'

import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

import {closeSettings, disableSound, enableSound, openSettings, setIsUserDead} from "../../features/app.slice";

import {
    CanvasBoard,
    CanvasBoardWrapper,
    HeaderWrapper,
    LineGroup,
    MoreLessWrapper,
    SettingsInnerWrapper,
    SettingsItemWrapper,
    SettingsWrapper,
    Title,
    Wrapper
} from './play-room.page.style.js'

import {ReactComponent as SettingsIcon} from "../../img/icons/settings.svg";
import GunList from "../../components/gun-list/gun-list";
import {game} from "../../util/game";

const PlayRoomPage = () => {
    const {isShowSettings, isUserDead, selectedLevel, levels} = useSelector(state => state.app);

    const dispatch = useDispatch();
    const onSetIsUserDead = is => dispatch(setIsUserDead(is));

    useEffect(() => {
        game.init({
            onSetIsUserDead
        });

        game.start(levels[selectedLevel]);
        return () => {
            game.stop();

        }

    }, []);

    return (
        <Wrapper>
            <Header/>
            <CanvasBoardWrapper id="canvas_board_wrapper">
                <CanvasBoard id="static_canvas_game_board"/>
                <CanvasBoard id="canvas_game_board"/>
            </CanvasBoardWrapper>
            {isShowSettings && <Settings/>}
            {isUserDead && <TryAgainPopup/>}
        </Wrapper>
    )
}

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

const Settings = () => {
    let navigate = useNavigate();
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
                    <Button variant="contained" onClick={() => {
                        dispatch(closeSettings())
                        navigate("/")
                    }}>Menu</Button>
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

const TryAgainPopup = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <SettingsWrapper>
            <SettingsInnerWrapper>
                <Title>GAME OWER</Title>
                <div>
                    <Button variant="contained" onClick={() => window.location.reload()}>Try again</Button>
                    <Button variant="contained" onClick={() => {
                        dispatch(setIsUserDead(false))
                        navigate("/")
                    }}>Menu</Button>
                </div>
            </SettingsInnerWrapper>
        </SettingsWrapper>
    )
}

export default PlayRoomPage;