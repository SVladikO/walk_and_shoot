function renderRectangles() {
    rectangles.forEach(renderRectangle)
}

function renderRectangle(block) {
    const [x, y, width, height] = block;

    ctx.rect(x, y, width, height);
    ctx.fillStyle = style.box.bgColor;
    ctx.fill()
    ctx.strokeStyle = style.box.borderColor;
    ctx.lineWidth = style.box.borderLineWidth;
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
}

