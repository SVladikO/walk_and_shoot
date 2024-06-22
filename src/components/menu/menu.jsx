import {Wrapper} from './menu.style';
import {getScreen} from "../../util/util";

function showAvaliableLevels() {
    // const parentId = 'game_levels_to_choose';
    // window.levels.forEach((level, index) => {
    //     addCanvasLevel(index, parentId)
    //     styleBoard(index, parentId)
    //
    // });

    // window.levels.map(renderRecatangle)

    // function renderRecatangle(level, index) {
    //     const canvasId = getGameLevelId(index);
    //     const canvas = document.getElementById(canvasId)
    //     const ctx = canvas.getContext("2d");
    //     const canvasScreen = getScreen(canvas.width, canvas.height);
    //     const rectangles = level.getRectangles(canvasScreen);
    //
    //     rectangles.forEach(rec => {
    //         const [x, y, width, height] = rec;
    //         ctx.rect(x, y, width, height);
    //         ctx.fillStyle = style.box.bgColor;
    //         ctx.fill()
    //         ctx.strokeStyle = style.box.borderColor;
    //         ctx.lineWidth = style.box.borderLineWidth;
    //         ctx.stroke();
    //         ctx.strokeStyle = 'black';
    //         ctx.lineWidth = 1;
    //     })
    // }

    // function getGameLevelId(levelIndex) {
    //     return `game_level_${levelIndex}`
    // }
    //
    // function addCanvasLevel(levelIndex, parentId) {
    //     var newCanvas = document.createElement('canvas');
    //     newCanvas.id = getGameLevelId(levelIndex);
    //     newCanvas.width = 200;
    //     newCanvas.height = 100;
    //     newCanvas.style.zIndex = 8;
    //     // newCanvas.style.position = "absolute";
    //     // newCanvas.style.border = "1px solid";
    //
    //     var title = document.createElement('h2');
    //     title.innerHTML = `Level ${levelIndex + 1}`;
    //     var wrapper = document.createElement('div');
    //     wrapper.classList.add("level_wrapper");
    //     wrapper.append(newCanvas)
    //     wrapper.append(title)
    //     wrapper.onclick = function () {
    //         game_over_notification.style.display = 'none';
    //         game_levels_board.style.display = 'none';
    //         restartGame();
    //         changeLevel(levelIndex);
    //     }
    //
    //     const parent = document.getElementById(parentId);
    //     parent.append(wrapper);
    // }
    //
    // function styleBoard(levelIndex) {
    //     const boardId = getGameLevelId(levelIndex);
    //     const newCanvas = document.getElementById(boardId)
    //     const ctx = newCanvas.getContext("2d");
    //     prepareCanvas(ctx);
    // }
}



export default function Menu() {
    return (
        <Wrapper>
            <h1 className="game_title">WALK AND SHOOT</h1>
            <h1>CHOOSE LEVEL</h1>
            <div id="game_levels_to_choose"></div>
        </Wrapper>
    )
}