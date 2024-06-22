import React, {useEffect} from 'react';
import {Wrapper, Canvas, LevelWrapper, LevelTitle} from './menu.style';

import {getScreen, prepareCanvas, restartGame} from "../../util/util";
import {game} from '../../util/glob';
import {levels} from '../../util/global-variables';
import {style} from '../../util/settings';

export default function Menu({showMenu}) {
    const refLevels = [];
    const onSelectLevel = levelIndex =>
        () => {
            showMenu(false);
            restartGame();
            game.changeLevel(levelIndex);
            game.inPlay = true;
        }

    useEffect(() => {
        refLevels.forEach((ref, index) => {
            const rectangles = levels[index].getRectangles(getScreen(200, 100))
            const ctx = ref.current.getContext('2d');
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
            <LevelWrapper key={index} onClick={onSelectLevel(index)}>
                <Canvas ref={ref}/>
                <LevelTitle>Level {index + 1}</LevelTitle>
            </LevelWrapper>
        )
    })


    return (
        <Wrapper>
            <h1 className="game_title">WALK AND SHOOT</h1>
            <h1>CHOOSE LEVEL</h1>
            <div id="game_levels_to_choose">
                {canvasLevels}
            </div>
        </Wrapper>
    )
}