// --- Web Worker for Heavy Calculations ---
const workerCode = `
    function floodFill(grid, startX, startY, newColor, width, height) {
        const targetColor = grid[startY * width + startX];
        if (targetColor === newColor) return grid;
        const stack = [[startX, startY]];
        const visited = new Set();
        while (stack.length > 0) {
            const [x, y] = stack.pop();
            const key = y * width + x;
            if (visited.has(key)) continue;
            if (x < 0 || x >= width || y < 0 || y >= height) continue;
            if (grid[key]!== targetColor) continue;
            visited.add(key);
            grid[key] = newColor;
            stack.push([x+1, y], [x-1, y], [x, y+1], [x, y-1]);
        }
        return grid;
    }

    function calculateParticles(particles, gravity, width, height) {
        return particles.map(p => {
            p.vy += gravity;
            p.y += p.vy;
            p.x += p.vx;
            p.life--;
            return p;
        }).filter(p => p.life > 0 && p.y < height && p.x > 0 && p.x < width);
    }

    self.onmessage = (e) => {
        const { type, data } = e.data;
        if (type === 'floodFill') {
            const result = floodFill(data.grid, data.x, data.y, data.color, data.width, data.height);
            self.postMessage({ type: 'floodFillComplete', grid: result });
        }
        if (type === 'particles') {
            const result = calculateParticles(data.particles, data.gravity, data.width, data.height);
            self.postMessage({ type: 'particlesUpdate', particles: result });
        }
        if (type === 'leaderboard') {
            const sorted = data.scores.sort((a, b) => b.score - a.score).slice(0, 10);
            self.postMessage({ type: 'leaderboardUpdate', sorted });
        }
    };
`;

const worker = new Worker(URL.createObjectURL(new Blob([workerCode], { type: 'application/javascript' })));

// --- DOM Elements ---
const canvas = document.getElementById('pixel-canvas');
const ctx = canvas.getContext('2d');
const effectsCanvas = document.getElementById('effects-canvas');
const effectsCtx = effectsCanvas.getContext('2d');
const target = document.getElementById('target');
const userScoreEl = document.getElementById('user-score');
const userCountEl = document.getElementById('user-count');
const streakEl = document.getElementById('streak-count');
const cpuStatusEl = document.getElementById('cpu-status');
const leaderboardList = document.getElementById('leaderboard-list');
const userList = document.getElementById('user-list');
const chatLogList = document.getElementById('chat-log-list');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const usernameModal = document.getElementById('username-modal');
const usernameInput = document.getElementById('username-input');
const joinBtn = document.getElementById('join-btn');
const gameOverlay = document.getElementById('game-overlay');
const currentYearSpan = document.getElementById('current-year');

// --- Game State ---
const GRID_SIZE = 50;
const PIXEL_SIZE = 10;
let pixelGrid = new Array(GRID_SIZE * GRID_SIZE).fill('#2a2a2a');
let userTeam = '#FF6B6B';
let username = '';
let userScore = 0;
let streak = 0;
let particles = [];
let miniGameActive = false;
let socket;
let reconnectAttempts = 0;

ctx.imageSmoothingEnabled = false;
currentYearSpan.textContent = new Date().getFullYear();

// --- WebSocket Connection ---
function connectWS() {
    const protocol = window.location.protocol === 'https:'? 'wss:' : 'ws:';
    const host = window.location.hostname || 'localhost';
    socket = new WebSocket(`${protocol}//${host}:8080`);

    socket.onopen = () => {
        reconnectAttempts = 0;
        addSystemMessage('Connected to arena!');
        if (username) {
            socket.send(JSON.stringify({ type: 'setUsername', username }));
        }
    };

    socket.onmessage = (event) => {
        let msg;
        try {
            msg = JSON.parse(event.data);
        } catch {
            return;
        }
        switch(msg.type) {
            case 'init':
                pixelGrid = msg.grid || pixelGrid;
                redrawCanvas();
                updateUserList(msg.users);
                updateLeaderboard(msg.leaderboard);
                break;
            case 'pixelClaim':
                const idx = msg.y * GRID_SIZE + msg.x;
                pixelGrid[idx] = msg.color;
                drawPixel(msg.x, msg.y, msg.color);
                if (msg.username!== username) {
                    spawnParticles(msg.x * PIXEL_SIZE, msg.y * PIXEL_SIZE, msg.color);
                }
                break;
            case 'gridUpdate':
                pixelGrid = msg.grid;
                redrawCanvas();
                addSystemMessage('💣 Grid updated!');
                break;
            case 'emojiRain':
                createEmojiRain(msg.emoji);
                addChatMessage(msg.username, msg.emoji);
                break;
            case 'chatMessage':
                addChatMessage(msg.username, msg.text);
                break;
            case 'userJoined':
                updateUserList(msg.users);
                addSystemMessage(`${msg.username} joined the battle!`);
                break;
            case 'userLeft':
                updateUserList(msg.users);
                addSystemMessage(`${msg.username} left`);
                break;
            case 'startMiniGame':
                startMiniGame();
                break;
            case 'leaderboardUpdate':
                updateLeaderboard(msg.leaderboard);
                break;
            case 'clearGrid':
                pixelGrid = new Array(GRID_SIZE * GRID_SIZE).fill('#2a2a2a');
                redrawCanvas();
                addSystemMessage('Grid reset!');
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
        }
    };
}

// --- Canvas Drawing ---
function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE);
}

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const color = pixelGrid[y * GRID_SIZE + x];
            if (color!== '#2a2a2a') {
                drawPixel(x, y, color);
            }
        }
    }
}

// --- Click to Claim Pixel ---
canvas.addEventListener('click', (e) => {
    if (miniGameActive) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX / PIXEL_SIZE);
    const y = Math.floor((e.clientY - rect.top) * scaleY / PIXEL_SIZE);
    if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return;

    const idx = y * GRID_SIZE + x;
    if (pixelGrid[idx]!== userTeam) {
        pixelGrid[idx] = userTeam;
        userScore++;
        streak++;
        updateScore();
        drawPixel(x, y, userTeam);
        socket?.send(JSON.stringify({ type: 'pixelClaim', x, y, color: userTeam, username }));
        spawnParticles(x * PIXEL_SIZE + PIXEL_SIZE/2, y * PIXEL_SIZE + PIXEL_SIZE/2, userTeam);
    } else {
        streak = 0;
        updateScore();
    }
});

// --- Team Selection ---
document.querySelectorAll('.team-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.team-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        userTeam = btn.dataset.color;
        addSystemMessage(`Switched to ${btn.textContent}`);
    });
});

// --- Flood Fill with Worker ---
document.getElementById('flood-fill-btn').addEventListener('click', () => {
    addSystemMessage('💣 Flood fill running in Web Worker... UI responsive!');
    cpuStatusEl.textContent = 'Working...';
    worker.postMessage({
        type: 'floodFill',
        data: {
            grid: [...pixelGrid],
            x: Math.floor(GRID_SIZE / 2),
            y: Math.floor(GRID_SIZE / 2),
            color: userTeam,
            width: GRID_SIZE,
            height: GRID_SIZE
        }
    });
});

worker.onmessage = (e) => {
    if (e.data.type === 'floodFillComplete') {
        pixelGrid = e.data.grid;
        redrawCanvas();
        socket?.send(JSON.stringify({ type: 'gridUpdate', grid: pixelGrid }));
        addSystemMessage('💣 Flood fill complete! CPU stayed free.');
        cpuStatusEl.textContent = '100%';
    }
    if (e.data.type === 'particlesUpdate') {
        particles = e.data.particles;
        drawParticles();
    }
    if (e.data.type === 'leaderboardUpdate') {
        renderLeaderboard(e.data.sorted);
    }
};

// --- Particle System ---
function spawnParticles(x, y, color) {
    for (let i = 0; i < 15; i++) {
        particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 6,
            vy: Math.random() * -5,
            color,
            life: 60,
            size: Math.random() * 4 + 2
        });
    }
}

function drawParticles() {
    effectsCtx.clearRect(0, 0, effectsCanvas.width, effectsCanvas.height);
    particles.forEach(p => {
        effectsCtx.fillStyle = p.emoji? '#fff' : p.color;
        effectsCtx.globalAlpha = p.life / 60;
        if (p.emoji) {
            effectsCtx.font = `${p.size * 3}px Arial`;
            effectsCtx.fillText(p.emoji, p.x, p.y);
        } else {
            effectsCtx.beginPath();
            effectsCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            effectsCtx.fill();
        }
    });
    effectsCtx.globalAlpha = 1;
}

function animateParticles() {
    if (particles.length > 0) {
        worker.postMessage({
            type: 'particles',
            data: { particles: [...particles], gravity: 0.3, width: canvas.width, height: canvas.height }
        });
        cpuStatusEl.textContent = '95%';
    } else {
        cpuStatusEl.textContent = '100%';
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// --- Emoji Reactions ---
document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const emoji = btn.dataset.emoji;
        socket?.send(JSON.stringify({ type: 'emojiRain', emoji, username }));
        createEmojiRain(emoji);
    });
});

function createEmojiRain(emoji) {
    for (let i = 0; i < 25; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -20,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 3 + 1,
            emoji,
            life: 120,
            size: Math.random() * 5 + 15
        });
    }
}

// --- Mini Game ---
document.getElementById('mini-game-btn').addEventListener('click', () => {
    socket?.send(JSON.stringify({ type: 'startMiniGame', username }));
});

function startMiniGame() {
    miniGameActive = true;
    target.classList.remove('hidden');
    let hits = 0;
    const gameTime = 5000;

    function moveTarget() {
        target.style.left = Math.random() * 400 + 'px';
        target.style.top = Math.random() * 400 + 'px';
    }

    target.onclick = () => {
        hits++;
        moveTarget();
        spawnParticles(parseInt(target.style.left), parseInt(target.style.top), '#FFD700');
    };

    moveTarget();
    const interval = setInterval(moveTarget, 700);

    setTimeout(() => {
        clearInterval(interval);
        target.classList.add('hidden');
        miniGameActive = false;
        showGameResult(hits);
        userScore += hits * 5;
        updateScore();
        socket?.send(JSON.stringify({ type: 'gameScore', username, score: userScore }));
    }, gameTime);
}

function showGameResult(hits) {
    gameOverlay.classList.remove('hidden');
    document.getElementById('game-result-text').textContent = hits > 5? '🔥 LEGENDARY!' : 'Nice Try!';
    document.getElementById('game-result-score').textContent = `You hit ${hits} targets! +${hits * 5} points`;
}

document.getElementById('close-game-btn').addEventListener('click', () => {
    gameOverlay.classList.add('hidden');
});

// --- Chat ---
function addChatMessage(user, text) {
    const li = document.createElement('li');
    li.innerHTML = `<strong style="color:${user === username? '#FF6B6B' : '#4ECDC4'}">${escapeHtml(user)}:</strong> ${escapeHtml(text)}`;
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
    if (text === '/startgame') {
        socket?.send(JSON.stringify({ type: 'startMiniGame', username }));
    } else {
        socket?.send(JSON.stringify({ type: 'chatMessage', text, username }));
    }
    chatInput.value = '';
}

sendButton.addEventListener('click', sendChat);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChat();
});

// --- UI Updates ---
function updateScore() {
    userScoreEl.textContent = userScore;
    streakEl.textContent = streak;
}

function updateUserList(users) {
    userList.innerHTML = '';
    users.forEach(u => {
        const li = document.createElement('li');
        li.textContent = u;
        if (u === username) li.style.color = '#FF6B6B';
        userList.appendChild(li);
    });
    userCountEl.textContent = users.length;
}

function updateLeaderboard(leaderboard) {
    worker.postMessage({
        type: 'leaderboard',
        data: { scores: leaderboard }
    });
}

function renderLeaderboard(sorted) {
    leaderboardList.innerHTML = '';
    sorted.forEach((entry, i) => {
        const li = document.createElement('li');
        const medal = i === 0? '🥇' : i === 1? '🥈' : i === 2? '🥉' : `${i+1}.`;
        li.innerHTML = `<span>${medal} ${escapeHtml(entry.username)}</span><span>${entry.score}</span>`;
        leaderboardList.appendChild(li);
    });
}

// --- Clear Grid ---
document.getElementById('clear-btn').addEventListener('click', () => {
    if (confirm('Reset entire grid?')) {
        socket?.send(JSON.stringify({ type: 'clearGrid' }));
    }
});

// --- Join Game ---
function joinGame() {
    username = usernameInput.value.trim();
    if (!username) {
        usernameInput.style.border = '2px solid #FF6B6B';
        return;
    }
    usernameModal.classList.add('hidden');
    connectWS();
    redrawCanvas();
}

joinBtn.addEventListener('click', joinGame);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') joinGame();
});

usernameInput.focus();