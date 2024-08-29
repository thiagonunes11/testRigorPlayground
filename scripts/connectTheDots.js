document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const moreDotsButton = document.getElementById('moreDotsButton');
    const lessDotsButton = document.getElementById('lessDotsButton');

    let dots = [];
    let isDrawing = false;
    let points = [];

    function drawDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        dots.forEach((dot, index) => {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 5, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(index + 1, dot.x, dot.y - 15);
        });
    }

    function showTriangle() {
        dots = [
            { x: canvas.width / 2, y: canvas.height / 4 }, // top
            { x: canvas.width * 3 / 4, y: canvas.height * 3 / 4 }, // bottom right
            { x: canvas.width / 4, y: canvas.height * 3 / 4 } // bottom left
        ];
        isDrawing = false;
        points = [];
        drawDots();

        moreDotsButton.style.display = 'inline-block';
        lessDotsButton.style.display = 'none';
    }

    function showHexagon() {
        dots = [
            { x: canvas.width / 2, y: canvas.height / 5 }, // top
            { x: canvas.width * 4 / 5, y: canvas.height / 3 }, // top right
            { x: canvas.width * 4 / 5, y: canvas.height * 2 / 3 }, // bottom right
            { x: canvas.width / 2, y: canvas.height * 4 / 5 }, // bottom
            { x: canvas.width / 5, y: canvas.height * 2 / 3 }, // bottom left
            { x: canvas.width / 5, y: canvas.height / 3 }, // top left
        ];
        isDrawing = false;
        points = [];
        drawDots();

        moreDotsButton.style.display = 'none';
        lessDotsButton.style.display = 'inline-block';
    }

    canvas.addEventListener('mousedown', function (event) {
        const { offsetX, offsetY } = event;
        const clickedDot = getDotUnderCursor(offsetX, offsetY);

        if (clickedDot !== null) {
            if (!isDrawing) {
                isDrawing = true;
                points.push(clickedDot);
                ctx.beginPath();
                ctx.moveTo(dots[clickedDot].x, dots[clickedDot].y);
            } else if (points.length < dots.length && !points.includes(clickedDot)) {
                points.push(clickedDot);
                ctx.lineTo(dots[clickedDot].x, dots[clickedDot].y);
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.stroke();

                if (points.length === dots.length) {
                    ctx.closePath();
                    ctx.stroke();
                    isDrawing = false;
                    points = [];
                }
            }
        }
    });

    canvas.addEventListener('mousemove', function (event) {
        if (isDrawing && points.length > 0) {
            const { offsetX, offsetY } = event;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawDots();

            ctx.beginPath();
            ctx.moveTo(dots[points[0]].x, dots[points[0]].y);
            points.slice(1).forEach((pointIndex) => {
                ctx.lineTo(dots[pointIndex].x, dots[pointIndex].y);
            });

            ctx.lineTo(offsetX, offsetY);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', function (event) {
        const { offsetX, offsetY } = event;
        const releasedDot = getDotUnderCursor(offsetX, offsetY);

        if (isDrawing && releasedDot !== null && !points.includes(releasedDot)) {
            points.push(releasedDot);
            ctx.lineTo(dots[releasedDot].x, dots[releasedDot].y);
            ctx.stroke();

            if (points.length === dots.length) {
                ctx.closePath();
                ctx.stroke();
                isDrawing = false;
                points = [];
            }
        }
    });

    function getDotUnderCursor(x, y) {
        for (let i = 0; i < dots.length; i++) {
            const dot = dots[i];
            const distance = Math.sqrt((x - dot.x) ** 2 + (y - dot.y) ** 2);
            if (distance < 10) {
                return i;
            }
        }
        return null;
    }

    showTriangle();

    moreDotsButton.addEventListener('click', function() {
        showHexagon();
    });

    lessDotsButton.addEventListener('click', function() {
        showTriangle();
    });
});
