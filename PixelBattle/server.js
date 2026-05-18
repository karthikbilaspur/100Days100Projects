const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Map(); // ws -> {username, color, score}
const GRID_SIZE = 50;
let pixelGrid = new Array(GRID_SIZE * GRID_SIZE).fill('#2a2a2a');

// HTTP server to serve files
http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';
    const ext = path.extname(filePath);
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json'
    }[ext] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}).listen(3000, () => console.log('HTTP server running on http://localhost:3000'));

wss.on('connection', (ws) => {
    console.log('Player connected');

    ws.on('message', (data) => {
        let msg;
        try {
            msg = JSON.parse(data);
        } catch {
            return;
        }

        switch(msg.type) {
            case 'setUsername':
                clients.set(ws, { username: msg.username, color: '#FF6B6B', score: 0 });
                const users = Array.from(clients.values()).map(c => c.username);
                const leaderboard = Array.from(clients.values()).map(c => ({ username: c.username, score: c.score }));
                ws.send(JSON.stringify({
                    type: 'init',
                    grid: pixelGrid,
                    users,
                    leaderboard
                }));
                broadcast({ type: 'userJoined', username: msg.username, users }, ws);
                break;

            case 'pixelClaim':
                const idx = msg.y * GRID_SIZE + msg.x;
                if (idx >= 0 && idx < pixelGrid.length) {
                    pixelGrid[idx] = msg.color;
                    const user = clients.get(ws);
                    if (user) {
                        user.score++;
                        user.color = msg.color;
                    }
                    broadcast({ type: 'pixelClaim', x: msg.x, y: msg.y, color: msg.color, username: msg.username }, ws);
                    broadcastLeaderboard();
                }
                break;

            case 'gridUpdate':
                pixelGrid = msg.grid;
                broadcast({ type: 'gridUpdate', grid: pixelGrid }, ws);
                break;

            case 'clearGrid':
                pixelGrid = new Array(GRID_SIZE * GRID_SIZE).fill('#2a2a2a');
                broadcast({ type: 'clearGrid' });
                break;

            case 'emojiRain':
                broadcast({ type: 'emojiRain', emoji: msg.emoji, username: msg.username });
                break;

            case 'chatMessage':
                broadcast({ type: 'chatMessage', username: msg.username, text: msg.text });
                break;

            case 'startMiniGame':
                broadcast({ type: 'startMiniGame' });
                break;

            case 'gameScore':
                const player = clients.get(ws);
                if (player) {
                    player.score = msg.score;
                    broadcastLeaderboard();
                }
                break;
        }
    });

    ws.on('close', () => {
        const user = clients.get(ws);
        if (user) {
            clients.delete(ws);
            const users = Array.from(clients.values()).map(c => c.username);
            broadcast({ type: 'userLeft', username: user.username, users });
            broadcastLeaderboard();
        }
    });

    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
        clients.delete(ws);
    });
});

// This was the missing part
function broadcast(data, excludeWs = null) {
    const message = JSON.stringify(data);
    wss.clients.forEach(client => {
        if (client!== excludeWs && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

function broadcastLeaderboard() {
    const leaderboard = Array.from(clients.values())
       .map(c => ({ username: c.username, score: c.score }));
    broadcast({ type: 'leaderboardUpdate', leaderboard });
}

console.log('WebSocket server running on ws://localhost:8080');