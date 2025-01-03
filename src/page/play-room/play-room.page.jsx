import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {NavLink} from "react-router";

import {Wrapper, HeaderWrapper, LineGroup, SoundWrapper} from './play-room.page.style.js'

import {ReactComponent as MuteIcon} from "../../icons/mute.svg";
import {ReactComponent as UnMuteIcon} from "../../icons/unmute.svg";

import {
    enableAutoShoot,
    disableAutoShoot,
    incrementSelectedLevel,
    decrementSelectedLevel,
    enableSound,
    disableSound,
} from "../../features/app.slice";

import {ThirdButton} from "../../components/button/button";
import UserSpeed from "../../components/user-speed/user-speed";
import ShootAuto from "../../components/shoot-auto/shoot-auto";
import GunList from "../../components/gun-list/gun-list";
import Bullets from "../../components/bullets/bullets";
import {game} from "../../util/game";

import Board from "../../module/board/board";

const PlayRoomPage = () => {
    return (
        <Wrapper>
            <Header/>
            <Board/>
        </Wrapper>
    )
}

const SoundController = () => {
    const {isSoundEnabled} = useSelector(state => state.app);
    const dispatch = useDispatch();

    return (
        <SoundWrapper>
            {isSoundEnabled && <MuteIcon onClick={() => dispatch(disableSound())}/>}
            {!isSoundEnabled && <UnMuteIcon onClick={() => dispatch(enableSound())}/>}
        </SoundWrapper>
    )
}

const Header = () => {
    const {
        isAutoShootEnabled,
        userBulletsInClip
    } = useSelector(state => state.app);

    const dispatch = useDispatch();
    console.log({isAutoShootEnabled})
    const triggerShootAuto = () => {
        dispatch(isAutoShootEnabled ? disableAutoShoot() : enableAutoShoot())
    }

    return (
        <HeaderWrapper>
            <LineGroup>
                <NavLink to="/menu" end>Menu</NavLink>
                <SoundController/>
                <LevelController/>
                <UserSpeed/>
            </LineGroup>
            <LineGroup>
                <ShootAuto value={true} onChangeHandler={triggerShootAuto} />
                <GunList setUserBulletAmount={() => 'setUserBulletAmount'}/>
                <Bullets amount={userBulletsInClip} maxAmount={game?.user?.weapon?.reloadBulletAmount || 8}/>
                {/* <Health health={userHealth}/> */}
            </LineGroup>
        </HeaderWrapper>
    )
}
const LevelController = () => {
    const {selectedLevel} = useSelector(state => state.app);
    const dispatch = useDispatch();

    return (
        <>
            <ThirdButton onClick={() => dispatch(decrementSelectedLevel())}>PREV</ThirdButton>
            <div>LEVEL {selectedLevel}</div>
            <ThirdButton onClick={() => dispatch(incrementSelectedLevel())}>NEXT</ThirdButton>
        </>
    )
}

export default PlayRoomPage;