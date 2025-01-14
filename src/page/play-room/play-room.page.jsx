import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from 'react-redux'

import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

import {
    closeSettings,
    disableUserSound,
    enableUserSound,
    openSettings,
    setIsUserDead,
    increaseGameSpeed,
    decreaseGameSpeed,
    enableEnemySound,
    disableEnemySound,
    setIsBulletFlyLimited,
    setIspUserControlBulletDirection,
    setIsBigBulletsImageEnabled,
    setIsVisibleAllEnemy
} from "../../features/app.slice";

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
import {game} from "../../utils/game";

const PlayRoomPage = () => {
    const {
        isShowSettings,
        isUserDead,
        selectedLevel,
        levels,
        isUserSoundEnabled,
        isEnemySoundEnabled,
        gameSpeed,
        isBulletFlyLimited,
        isUserControlBulletDirection,
        isBigBulletsImageEnabled,
        isVisibleAllEnemy
    } = useSelector(state => state.app);

    const dispatch = useDispatch();
    const onSetIsUserDead = is => dispatch(setIsUserDead(is));

    useEffect(() => {
        game.init({
            onSetIsUserDead,
            isUserSoundEnabled,
            isEnemySoundEnabled,
            isBulletFlyLimited,
            gameSpeed,
            isUserControlBulletDirection,
            isBigBulletsImageEnabled,
            isVisibleAllEnemy,
        });
        game.start(levels[selectedLevel]);

        return () => game.stop();
    }, []);

    return (
        <Wrapper>
            <Header/>
            <CanvasBoardWrapper id="canvas_board_wrapper">
                <CanvasBoard id="static_canvas_game_board"/>
                <CanvasBoard id="canvas_game_board"/>
            </CanvasBoardWrapper>
            {isShowSettings && <Settings/>}
            {isUserDead && <TryAgainPopup />}
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
    const {
        isUserSoundEnabled,
        isEnemySoundEnabled,
        gameSpeed,
        isBulletFlyLimited,
        isUserControlBulletDirection,
        isBigBulletsImageEnabled,
        isVisibleAllEnemy
    } = useSelector(state => state.app);
    const dispatch = useDispatch();

    const onSwitchUserSound = () => isUserSoundEnabled ? dispatch(disableUserSound()) : dispatch(enableUserSound());
    const onSwitchEnemySound = () => isEnemySoundEnabled ? dispatch(disableEnemySound()) : dispatch(enableEnemySound());

    const onIncreaseGameSpeed = () => dispatch(increaseGameSpeed())
    const onDecreaseGameSpeed = () => dispatch(decreaseGameSpeed())

    const onSwitchBulletFlyLimited = () => dispatch(setIsBulletFlyLimited(!isBulletFlyLimited))
    const onSwitchIsUserControlBulletDirection = () => dispatch(setIspUserControlBulletDirection(!isUserControlBulletDirection))
    const onSwitchBigBulletImage = () => dispatch(setIsBigBulletsImageEnabled(!isBigBulletsImageEnabled))
    const onChangeAllEnemyVisible = () => dispatch(setIsVisibleAllEnemy(!isVisibleAllEnemy))

    return (
        <SettingsWrapper>
            <SettingsInnerWrapper>
                <div>
                    <Title>SETTINGS</Title>
                    <SettingsItem is={isUserSoundEnabled} label="User shoot sound" onClick={onSwitchUserSound}/>
                    <SettingsItem is={isEnemySoundEnabled} label="Enemy shoot sound" onClick={onSwitchEnemySound}/>
                    <SettingsItem is={isBulletFlyLimited} label="Limit bullet distance"
                                  onClick={onSwitchBulletFlyLimited}/>
                    <SettingsItem is={isUserControlBulletDirection} label="User controll bullet direction" onClick={onSwitchIsUserControlBulletDirection}/>
                    <SettingsItem is={isBigBulletsImageEnabled} label="Big bullet image" onClick={onSwitchBigBulletImage}/>
                    <SettingsItem is={isVisibleAllEnemy} label="All enemy visible" onClick={onChangeAllEnemyVisible}/>
                    <MoreLessWrapper>
                        Game speed
                        <div>
                            <Button size="small" variant="contained" onClick={onDecreaseGameSpeed}>-</Button>
                            {gameSpeed}
                            <Button size="small" variant="contained" onClick={onIncreaseGameSpeed}>+</Button>
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
    const {selectedLevel,  levels,} = useSelector(state => state.app);

    return (
        <SettingsWrapper>
            <SettingsInnerWrapper>
                <Title>GAME OWER</Title>
                <div>
                    <Button variant="contained" onClick={() => {
                        game.stop();
                        game.start(levels[selectedLevel])
                    }}>Try again</Button>
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