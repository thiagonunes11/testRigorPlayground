document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const moreDotsButton = document.getElementById('moreDotsButton');
    const lessDotsButton = document.getElementById('lessDotsButton');

    let dots = [];
    let lines = [];
    let currentPath = [];
    let isDrawing = false;
    let lastDot = null;

    function drawDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        dots.forEach((dot, index) => {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 5, 0, 2 * Math.PI);
            ctx.fill();

            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(index + 1, dot.x, dot.y - 15);
        });
    }

    function drawLines() {
        lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(dots[line[0]].x, dots[line[0]].y);
            ctx.lineTo(dots[line[1]].x, dots[line[1]].y);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }

    function drawTempLine(toX, toY) {
        if (lastDot !== null) {
            ctx.beginPath();
            ctx.moveTo(dots[lastDot].x, dots[lastDot].y);
            ctx.lineTo(toX, toY);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    function showTriangle() {
        dots = [
            { x: canvas.width / 2, y: canvas.height / 4 }, // top
            { x: canvas.width * 3 / 4, y: canvas.height * 3 / 4 }, // right
            { x: canvas.width / 4, y: canvas.height * 3 / 4 } // left
        ];
        lines = []; // cleaning lines
        currentPath = [];
        isDrawing = false;
        lastDot = null;
        drawDots();
        drawLines();

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
        lines = []; // cleaning lines
        currentPath = [];
        isDrawing = false;
        lastDot = null;
        drawDots();
        drawLines();

        moreDotsButton.style.display = 'none';
        lessDotsButton.style.display = 'inline-block';
    }

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

    canvas.addEventListener('mousedown', function (event) {
        const { offsetX, offsetY } = event;
        const clickedDot = getDotUnderCursor(offsetX, offsetY);

        if (clickedDot !== null) {
            isDrawing = true;
            currentPath = [clickedDot];
            lastDot = clickedDot;
            drawDots();
            drawLines();
        }
    });

    canvas.addEventListener('mousemove', function (event) {
        if (isDrawing) {
            const { offsetX, offsetY } = event;
            const hoveredDot = getDotUnderCursor(offsetX, offsetY);

            if (hoveredDot !== null && !currentPath.includes(hoveredDot)) {
                lines.push([lastDot, hoveredDot]);
                currentPath.push(hoveredDot);
                lastDot = hoveredDot;
                drawDots();
                drawLines();
            }

            drawDots();
            drawLines();
            drawTempLine(offsetX, offsetY);
        }
    });

    canvas.addEventListener('mouseup', function (event) {
        if (isDrawing) {
            if (currentPath.length === dots.length) {
                isDrawing = false;
                lastDot = null;
            } else {
                lines = [];
                currentPath = [];
                isDrawing = false;
                lastDot = null;
                drawDots();
                drawLines();
            }
        }
    });

    // cleaning lines if mouse leaves canvas
    canvas.addEventListener('mouseleave', function () {
        if (isDrawing) {
            lines = [];
            currentPath = [];
            isDrawing = false;
            lastDot = null;
            drawDots();
            drawLines();
        }
    });

    showTriangle();
    moreDotsButton.addEventListener('click', function() {
        showHexagon();
    });
    lessDotsButton.addEventListener('click', function() {
        showTriangle();
    });
});