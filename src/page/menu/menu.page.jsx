import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";

import {
    Canvas,
    GameTitle,
    LevelTitle,
    LevelWrapper,
    NavigationWrapper,
    SubWrapper,
    Wrapper
} from './menu.page.style.js';

import {setLevelForEditIndex, setSelectedLevel} from "../../features/app.slice";

import navigationImg from '../../img/navigation.webp';

import {style} from '../../utils/settings';
import {getScreen} from "../../utils/screen";
import {prepareCanvas} from "../../utils/utils";

export default function MenuPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const refLevels = [];
    const {levels} = useSelector(state => state.app)
    console.log('menuPage', {levels})
    useEffect(() => {
        const screen = getScreen(200, 100);

        refLevels.forEach((ref, index) => {
            const rectangles = screen.getBoxes(levels[index].blockIds)
            // console.log('level: ', index, {rectangles})
            const ctx = ref.current.getContext('2d');
            ctx.canvas.width = 200;
            ctx.canvas.height = 100;
            prepareCanvas(ctx, {width: 200, height: 100})
            rectangles.forEach(rec => {
                ctx.beginPath();
                const [x, y, width, height] = rec;
                ctx.rect(x, y, width, height);
                ctx.fillStyle = style.box.bgColor;
                ctx.fill()

                ctx.strokeStyle = style.box.borderColor;
                ctx.lineWidth = style.box.borderLineWidth;
                ctx.stroke();
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 1;
            })
        })
    }, [])

    const canvasLevels = levels.map((level, index) => {
        const ref = React.createRef();
        refLevels.push(ref);
        // const redirect = index => window.location.href = `${window.location.origin}/play`;

        return (
            <LevelWrapper key={index}>
                <LevelTitle>LEVEL {index + 1}</LevelTitle>
                <Canvas ref={ref}/>
                <div>
                    <Button variant="contained" onClick={() => {
                        dispatch(setLevelForEditIndex(index))
                        navigate('/edit')
                    }}>EDIT</Button>
                    <Button variant="contained" onClick={() => {
                        dispatch(setSelectedLevel(index))
                        navigate('/play')
                    }}>Play</Button>
                </div>
            </LevelWrapper>
        )
    })

    return (
        <Wrapper>
            <GameTitle className="game_title">WALK AND SHOOT</GameTitle>
            <h1>CHOOSE LEVEL</h1>
            <SubWrapper>
                {canvasLevels}
            </SubWrapper>
            <Button variant="contained" onClick={() => {
                dispatch(setLevelForEditIndex(-1))
                navigate('/edit')
            }}>CREATE NEW LEVEL</Button>
            <NavigationWrapper>
                <img src={navigationImg}/>
            </NavigationWrapper>
        </Wrapper>
    )
}