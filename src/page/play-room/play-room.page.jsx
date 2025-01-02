import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {NavLink} from "react-router";

import {Wrapper, HeaderWrapper, LineGroup, SoundWrapper, CanvasBoardWrapper, CanvasBoard} from './play-room.page.style.js'

import {ReactComponent as MuteIcon} from "../../icons/mute.svg";
import {ReactComponent as UnMuteIcon} from "../../icons/unmute.svg";

import {
    enableAutoShoot,
    disableAutoShoot,
    incrementSelectedLevel,
    decrementSelectedLevel,
    enableSound,
    disableSound
} from "../../features/app.slice";

import {levels} from "../../util/levels.data";

import {ThirdButton} from "../../components/button/button";
import UserSpeed from "../../components/user-speed/user-speed";
import ShootAuto from "../../components/shoot-auto/shoot-auto";
import GunList from "../../components/gun-list/gun-list";
import Bullets from "../../components/bullets/bullets";
import {game} from "../../util/game";
import {isUnutVisiable} from "../../util/util";

const PlayRoomPage = () => {
    return (
        <Wrapper>
            <Header/>
            <Board/>
        </Wrapper>
    )
}

const Board = () => {
    useEffect(() => {
        const updateBulletsAmountUI = () => {};
            // setUserBulletAmount(game.user.bulletAmount);

        game.init(updateBulletsAmountUI);
        game.start(levels[0]);
    }, []);

    useEffect(() => {

        // setInterval(() => {
        //     if (!game.inPlay) {
        //         return
        //     }
        //
        //     game.enemies
        //         // .filter(unit => game.user.isVisibleForMe(unit.x, unit.y))
        //         .filter(enemy => isUnutVisiable(enemy, game))
        //         .forEach(enemy => enemy.shootSingle())
        //
        //     game.enemies.forEach(enemy => enemy.isShootEnabled = true);
        //     setTimeout(() => game.enemies.forEach(enemy => enemy.isShootEnabled = false), 1000);
        //
        // }, 2000)

        return () => game.removeListeners();
    }, []);

    return (
        <CanvasBoardWrapper id="canvas_board_wrapper">
            <CanvasBoard id="static_canvas_game_board"/>
            <CanvasBoard id="canvas_game_board"/>
        </CanvasBoardWrapper>
    )
}
const SoundController = () => {
    const {isSoundEnabled} = useSelector(state => state.app.settings);
    const dispatch = useDispatch();

    return (
        <SoundWrapper>
            {isSoundEnabled && <MuteIcon onClick={() => dispatch(enableSound())}/>}
            {!isSoundEnabled && <UnMuteIcon onClick={() => dispatch(disableSound())}/>}
        </SoundWrapper>
    )
}

const Header = () => {
    const {settings: {isAutoShootEnabled}} = useSelector(state => state.app);
    const dispatch = useDispatch();

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
                <ShootAuto value={isAutoShootEnabled} onChangeHandler={triggerShootAuto} />
                <GunList setUserBulletAmount={() => 'setUserBulletAmount'}/>
                <Bullets amount={2} maxAmount={game?.user?.weapon?.reloadBulletAmount || 8}/>
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