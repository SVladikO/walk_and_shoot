import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'

import Settings from "./settings/settings.jsx";
import TryAgainPopup from "./try-again/try-again";
import Header from "./header/header";

import { setIsUserDead } from "../../features/app.slice";

import {
    CanvasBoard,
    CanvasBoardWrapper,
    Wrapper
} from './play-room.page.style.js'

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

export default PlayRoomPage;