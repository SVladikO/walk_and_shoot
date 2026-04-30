import React from "react";
import {SettingsInnerWrapper, SettingsWrapper, Title, MoreLessWrapper} from "./settings.style";
import Switch from "@mui/material/Switch";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button";

import {
    closeSettings,
    disableUserSound,
    enableUserSound,
    increaseGameSpeed,
    decreaseGameSpeed,
    enableEnemySound,
    disableEnemySound,
    setIsBulletFlyLimited,
    setIspUserControlBulletDirection,
    setIsBigBulletsImageEnabled,
    setIsVisibleAllEnemy
} from "../../../features/app.slice";
import {SettingsItemWrapper} from "../play-room.page.style";

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

export default Settings;