const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Map();
const drawHistory = [];
const MAX_HISTORY = 500;

// HTTP server to serve static files
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
    console.log('Client connected');

    ws.on('message', (data) => {
        let msg;
        try {
            msg = JSON.parse(data);
        } catch {
            return;
        }

        switch(msg.type) {
            case 'setUsername':
                const userColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
                clients.set(ws, { username: msg.username, color: userColor });
                const users = Array.from(clients.values()).map(c => c.username);
                ws.send(JSON.stringify({ type: 'init', drawHistory, users }));
                broadcast({ type: 'userJoined', username: msg.username, users }, ws);
                break;

            case 'drawLine':
                if (drawHistory.length >= MAX_HISTORY) drawHistory.shift();
                drawHistory.push(msg);
                broadcast(msg, ws);
                break;

            case 'clearCanvas':
                drawHistory.length = 0;
                broadcast(msg, ws);
                break;

            case 'undo':
                for (let i = drawHistory.length - 1; i >= 0; i--) {
                    if (drawHistory[i].type === 'drawLine') {
                        drawHistory.splice(i, 1);
                        break;
                    }
                }
                broadcast({ type: 'undo', drawHistory });
                break;

            case 'cursor':
                const user = clients.get(ws);
                if (user) {
                    broadcast({...msg, username: user.username }, ws);
                }
                break;

            case 'chatMessage':
                const sender = clients.get(ws);
                if (sender && msg.text.length <= 200) {
                    broadcast({ type: 'chatMessage', username: sender.username, text: msg.text });
                }
                break;

            case 'clearChat':
                broadcast({ type: 'clearChat' });
                break;
        }
    });

    ws.on('close', () => {
        const user = clients.get(ws);
        if (user) {
            clients.delete(ws);
            const users = Array.from(clients.values()).map(c => c.username);
            broadcast({ type: 'userLeft', username: user.username, users });
        }
        console.log('Client disconnected');
    });
});

function broadcast(data, excludeWs = null) {
    const message = JSON.stringify(data);
    wss.clients.forEach(client => {
        if (client!== excludeWs && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

console.log('WebSocket server running on ws://localhost:8080');