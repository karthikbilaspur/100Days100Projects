// DOM Elements
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const cursorCanvas = document.getElementById('cursor-canvas');
const cursorCtx = cursorCanvas.getContext('2d');

const clearCanvasBtn = document.getElementById('clear-canvas-btn');
const eraserBtn = document.getElementById('eraser-btn');
const undoBtn = document.getElementById('undo-btn');
const colorPicker = document.getElementById('color-picker');
const brushSizeSlider = document.getElementById('brush-size-slider');
const brushSizeDisplay = document.getElementById('brush-size-display');

const chatLogList = document.getElementById('chat-log-list');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const clearChatBtn = document.getElementById('clear-chat-btn');
const userList = document.getElementById('user-list');
const userCount = document.getElementById('user-count');

const usernameModal = document.getElementById('username-modal');
const usernameInput = document.getElementById('username-input');
const joinBtn = document.getElementById('join-btn');

// State
let socket;
let username = '';
let isDrawing = false;
let lastX = 0, lastY = 0;
let brushSize = 5;
let color = '#000000';
let isEraser = false;
let userCursors = new Map();
let reconnectAttempts = 0;

// Canvas setup
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.imageSmoothingEnabled = true;

// Responsive canvas
function resizeCanvas() {
    const wrapper = document.querySelector('.canvas-wrapper');
    const rect = wrapper.getBoundingClientRect();
    canvas.width = cursorCanvas.width = rect.width;
    canvas.height = cursorCanvas.height = rect.height;
}
window.addEventListener('resize', resizeCanvas);

// WebSocket with auto-reconnect
function connectWS() {
    const protocol = window.location.protocol === 'https:'? 'wss:' : 'ws:';
    socket = new WebSocket(`${protocol}//${window.location.hostname}:8080`);

    socket.onopen = () => {
        reconnectAttempts = 0;
        addSystemMessage('Connected');
        if (username) {
            socket.send(JSON.stringify({ type: 'setUsername', username }));
        }
    };

    socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        switch(msg.type) {
            case 'init':
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                msg.drawHistory.forEach(cmd => {
                    if (cmd.type === 'drawLine') {
                        drawLine(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.size, cmd.color, false);
                    }
                });
                updateUserList(msg.users);
                break;
            case 'drawLine':
                drawLine(msg.x1, msg.y1, msg.x2, msg.y2, msg.size, msg.color, false);
                break;
            case 'clearCanvas':
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                addSystemMessage('Canvas cleared');
                break;
            case 'undo':
                redrawFromHistory(msg.drawHistory);
                break;
            case 'cursor':
                if (msg.username!== username) {
                    userCursors.set(msg.username, { x: msg.x, y: msg.y, color: msg.color });
                    drawCursors();
                }
                break;
            case 'chatMessage':
                addChatMessage(msg.username, msg.text);
                break;
            case 'userJoined':
                updateUserList(msg.users);
                addSystemMessage(`${msg.username} joined`);
                break;
            case 'userLeft':
                updateUserList(msg.users);
                userCursors.delete(msg.username);
                drawCursors();
                addSystemMessage(`${msg.username} left`);
                break;
            case 'clearChat':
                chatLogList.innerHTML = '';
                addSystemMessage('Chat cleared');
                break;
        }
    };

    socket.onclose = () => {
        addSystemMessage('Disconnected. Reconnecting...');
        if (reconnectAttempts < 5) {
            setTimeout(() => {
                reconnectAttempts++;
                connectWS();
            }, 2000 * reconnectAttempts);
        } else {
            addSystemMessage('Could not reconnect. Refresh the page.');
        }
    };
}

// Drawing functions
function drawLine(x1, y1, x2, y2, size, color, emit = true) {
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.globalCompositeOperation = color === 'eraser'? 'destination-out' : 'source-over';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
    if (emit && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'drawLine', x1, y1, x2, y2, size, color }));
    }
}

function redrawFromHistory(history) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    history.forEach(cmd => {
        if (cmd.type === 'drawLine') {
            drawLine(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.size, cmd.color, false);
        }
    });
}

function drawCursors() {
    cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
    userCursors.forEach((data, user) => {
        cursorCtx.fillStyle = data.color === 'eraser'? '#fff' : data.color;
        cursorCtx.beginPath();
        cursorCtx.arc(data.x, data.y, 8, 0, Math.PI * 2);
        cursorCtx.fill();
        cursorCtx.fillStyle = '#000';
        cursorCtx.strokeStyle = '#fff';
        cursorCtx.lineWidth = 2;
        cursorCtx.font = 'bold 12px Arial';
        cursorCtx.strokeText(user, data.x + 12, data.y + 4);
        cursorCtx.fillText(user, data.x + 12, data.y + 4);
    });
}

// Mouse + Touch events
function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
        return {
            x: (e.touches[0].clientX - rect.left) * scaleX,
            y: (e.touches[0].clientY - rect.top) * scaleY
        };
    }
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

function startDraw(e) {
    isDrawing = true;
    const pos = getPos(e);
    [lastX, lastY] = [pos.x, pos.y];
}

function draw(e) {
    const pos = getPos(e);
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            type: 'cursor',
            x: pos.x, y: pos.y, color: isEraser? 'eraser' : color
        }));
    }
    if (!isDrawing) return;
    e.preventDefault();
    const currentColor = isEraser? 'eraser' : color;
    drawLine(lastX, lastY, pos.x, pos.y, brushSize, currentColor);
    [lastX, lastY] = [pos.x, pos.y];
}

function endDraw() {
    isDrawing = false;
}

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mouseleave', endDraw);
canvas.addEventListener('touchstart', startDraw);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', endDraw);

// Toolbar events
clearCanvasBtn.addEventListener('click', () => {
    socket.send(JSON.stringify({ type: 'clearCanvas' }));
});

colorPicker.addEventListener('input', () => {
    color = colorPicker.value;
    isEraser = false;
    eraserBtn.classList.remove('active');
});

brushSizeSlider.addEventListener('input', () => {
    brushSize = parseInt(brushSizeSlider.value);
    brushSizeDisplay.textContent = `Size: ${brushSize}`;
});

eraserBtn.addEventListener('click', () => {
    isEraser =!isEraser;
    eraserBtn.classList.toggle('active', isEraser);
});

undoBtn.addEventListener('click', () => {
    socket.send(JSON.stringify({ type: 'undo' }));
});

// Chat functions
function addChatMessage(user, text) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="username">${escapeHtml(user)}:</span> ${escapeHtml(text)}`;
    chatLogList.appendChild(li);
    chatLogList.parentElement.scrollTop = chatLogList.parentElement.scrollHeight;
}

function addSystemMessage(text) {
    const li = document.createElement('li');
    li.className = 'system';
    li.textContent = text;
    chatLogList.appendChild(li);
    chatLogList.parentElement.scrollTop = chatLogList.parentElement.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function sendChat() {
    const text = chatInput.value.trim();
    if (!text) return;
    socket.send(JSON.stringify({ type: 'chatMessage', text }));
    chatInput.value = '';
}

sendButton.addEventListener('click', sendChat);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChat();
});

clearChatBtn.addEventListener('click', () => {
    socket.send(JSON.stringify({ type: 'clearChat' }));
});

function updateUserList(users) {
    userList.innerHTML = '';
    users.forEach(u => {
        const li = document.createElement('li');
        li.textContent = u;
        if (u === username) li.style.color = '#4CAF50';
        userList.appendChild(li);
    });
    userCount.textContent = users.length;
}

// Username modal
function joinChat() {
    username = usernameInput.value.trim();
    if (!username) return;
    usernameModal.classList.add('hidden');
    resizeCanvas();
    connectWS();
}

joinBtn.addEventListener('click', joinChat);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') joinChat();
});

usernameInput.focus();