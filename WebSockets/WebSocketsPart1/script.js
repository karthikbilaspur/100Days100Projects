const drawingCanvas = document.getElementById('drawing-canvas');
const clearButton = document.getElementById('clear-button');
const colorPicker = document.getElementById('color-picker');
const brushSizeSlider = document.getElementById('brush-size-slider');
const brushSizeDisplay = document.getElementById('brush-size-display');

const socket = new WebSocket('ws://localhost:8080');

let isDrawing = false;
let lastX, lastY;
let brushSize = 10;
let color = '#000000';

drawingCanvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

drawingCanvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        const x = event.offsetX;
        const y = event.offsetY;
        drawLine(lastX, lastY, x, y);
        lastX = x;
        lastY = y;
        socket.send(`drawLine ${lastX} ${lastY} ${x} ${y} ${brushSize} ${color}`);
    }
});

drawingCanvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

clearButton.addEventListener('click', () => {
    drawingCanvas.getContext('2d').clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    socket.send('clearCanvas');
});

colorPicker.addEventListener('input', () => {
    color = colorPicker.value;
});

brushSizeSlider.addEventListener('input', () => {
    brushSize = parseInt(brushSizeSlider.value);
    brushSizeDisplay.textContent = `Brush Size: ${brushSize}`;
});

socket.onmessage = (event) => {
    const message = event.data;
    if (message.startsWith('drawLine')) {
        const [_, x1, y1, x2, y2, brushSize, color] = message.split(' ');
        drawLine(parseInt(x1), parseInt(y1), parseInt(x2), parseInt(y2), parseInt(brushSize), color);
    } else if (message === 'clearCanvas') {
        drawingCanvas.getContext('2d').clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    }
};

function drawLine(x1, y1, x2, y2, brushSize, color) {
    const ctx = drawingCanvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}