const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
const saveEl = document.getElementById('save');
const loadEl = document.getElementById('load');

const ctx = canvas.getContext('2d');

let size = 10;
let isPressed = false;
let color = colorEl.value;
let x, y;
let drawing = [];

// Event listeners
canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
    drawing.push({ x, y, size, color });
});

document.addEventListener('mouseup', () => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        drawing.push({ x: x2, y: y2, size, color });
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

canvas.addEventListener('touchstart', (e) => {
    isPressed = true;
    x = e.touches[0].clientX - canvas.offsetLeft;
    y = e.touches[0].clientY - canvas.offsetTop;
    drawing.push({ x, y, size, color });
});

canvas.addEventListener('touchmove', (e) => {
    if (isPressed) {
        const x2 = e.touches[0].clientX - canvas.offsetLeft;
        const y2 = e.touches[0].clientY - canvas.offsetTop;
        drawing.push({ x: x2, y: y2, size, color });
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

canvas.addEventListener('touchend', () => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

increaseBtn.addEventListener('click', () => {
    size = Math.min(size + 5, 50);
    updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () => {
    size = Math.max(size - 5, 5);
    updateSizeOnScreen();
});

colorEl.addEventListener('change', (e) => {
    color = e.target.value;
});

clearEl.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawing = [];
});

saveEl.addEventListener('click', () => {
    const dataURL = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'drawing.png';
    link.click();
});

loadEl.addEventListener('click', () => {
    const savedDrawing = localStorage.getItem('drawing');
    if (savedDrawing) {
        drawing = JSON.parse(savedDrawing);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawing.forEach((point) => {
            drawCircle(point.x, point.y);
            if (point.prev) {
                drawLine(point.prev.x, point.prev.y, point.x, point.y);
            }
        });
    }
});

// Drawing functions
function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

function updateSizeOnScreen() {
    sizeEL.innerText = size;
}

updateSizeOnScreen();

// Save drawing to local storage
setInterval(() => {
    localStorage.setItem('drawing', JSON.stringify(drawing));
}, 1000);