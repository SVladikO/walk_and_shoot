import React from "react";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import {SettingsInnerWrapper, SettingsWrapper, Title} from "../play-room.page.style";
import Button from "@mui/material/Button";
import {game} from "../../../utils/game";
import {setIsUserDead} from "../../../features/app.slice";

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

export default TryAgainPopup;