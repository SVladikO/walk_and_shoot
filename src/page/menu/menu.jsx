import React, {useEffect} from 'react';
import {
    Wrapper,
    SubWrapper,
    NavigationWrapper,
    Canvas,
    GameTitle,
    LevelWrapper,
    LevelTitle
} from './menu.style.js';

import {SecondaryButton} from '../../components/button/button'

import navigationImg from '../../images/navigation.png';


import {style} from '../../util/settings';
import {levels} from '../../util/global-variables';
import {getScreen, prepareCanvas} from "../../util/util";

export default function Menu({onSelectLevel, onShowEditLevelPage, setSelectedEditLevelIds}) {
    const refLevels = [];

    useEffect(() => {
        refLevels.forEach((ref, index) => {
            const rectangles = levels[index].getRectangles(getScreen(200, 100))
            const ctx = ref.current.getContext('2d');
            ctx.canvas.width = 200;
            ctx.canvas.height = 100;
            prepareCanvas(ctx, {width: 200, height: 100})
            rectangles.forEach(rec => {
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
        return (
            <LevelWrapper key={index} onClick={() => onSelectLevel(index)}>
                <LevelTitle>LEVEL {index + 1}</LevelTitle>
                <Canvas ref={ref}/>
                <button onClick={e => {
                    e.stopPropagation();
                    onShowEditLevelPage(index)
                }}>Edit map</button>
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
            <SecondaryButton onClick={() => onShowEditLevelPage()}>CREATE NEW LEVEL</SecondaryButton>
            <NavigationWrapper>
                <span> Walk by</span>
                <img src={navigationImg}/>
            </NavigationWrapper>
        </Wrapper>
    )
}