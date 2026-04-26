
# ⚔️ Pixel Wars Arena

Real-time multiplayer pixel battle game built with HTML5 Canvas, Web Workers, and WebSockets. Capture territory, chat with players, trigger emoji rains, and run heavy calculations without freezing the UI.

## **Features**

- **Real-time Multiplayer**: WebSocket-powered pixel claiming synced across all players
- **Web Workers**: Flood fill and particle physics run off the main thread. CPU stays at 100% free during heavy ops
- **Team System**: Pick Red, Cyan, Yellow, or Mint. Switch teams anytime
- **Live Chat**: Send messages + `/startgame` command for mini-games
- **Emoji Rain**: Spam 🔥 💯 😂 ⚡ 🎉 💀 reactions that rain across everyone’s screen
- **Mini Game**: 5-second target clicker. Most hits = bonus points
- **Live Leaderboard**: Scores sorted by Web Worker, updates in real-time
- **Particle Effects**: Pixel claim explosions + emoji physics, all GPU-friendly
- **Auto Reconnect**: Drops? Client reconnects up to 5x with backoff

### **Tech Stack**

| Frontend | Backend | Performance |
| --- | --- | --- |
| HTML5 Canvas | Node.js | Web Workers |
| Vanilla JS | ws WebSocket lib | RequestAnimationFrame |
| CSS3 Animations | HTTP static server | ImageRendering: pixelated |

## **Project Structure**

pixel-wars-arena/
├── index.html      # Main game UI + markup
├── styles.css      # Dark theme, animations, responsive layout  
├── script.js       # Client logic, canvas rendering, Web Worker
├── server.js       # Node.js WebSocket + HTTP server
└── README.md       # You are here

### **Quick Start**

1. **Install Node.js** 18+ if you don’t have it
bash
   node -v

2. **Install dependencies**

   ```bash
   npm init -y
   npm install ws
   ```

3. **Start the server**

   ```bash
   node server.js

     You should see:
   HTTP server running on http://localhost:3000
   WebSocket server running on ws://localhost:8080
   ```

4.**Play**
   Open `http://localhost:3000` in 2+ browser tabs. Enter a warrior name and start claiming pixels!

### **How It Works**

1. **Web Workers**: `floodFill` and `calculateParticles` run in `worker.js` blob. Main thread only handles rendering, so clicking/chat never lags even with 10k particles.
2. **WebSocket Protocol**: All events are JSON messages: `pixelClaim`, `gridUpdate`, `emojiRain`, `chatMessage`, `startMiniGame`.
3. **State Sync**: Server is authoritative for `pixelGrid`. Clients optimistically update then get corrected on `gridUpdate`.
4. **Canvas Layers**: `#pixel-canvas` for game state, `#effects-canvas` for particles. Keeps redraws cheap.

### **Controls**

- **Left Click Canvas**: Claim pixel for your team. +1 score
- **Team Buttons**: Switch color. Doesn’t reset score
- **💣 Flood Fill**: Worker fills from center with your color
- **🗑️ Reset**: Clears entire grid for everyone
- **🎮 Mini Game**: Starts target clicker for all players
- **Emoji Buttons**: Broadcast emoji rain
- **Chat**: Type message or `/startgame` and hit Enter

### **Deployment Notes**

1. **Don’t open `index.html` directly** - Web Workers fail on `file://`. Must use `http://` via `node server.js`
2. **For production**: Set `const host = 'your-domain.com'` in `script.js` connectWS function
3. **Ports**: HTTP on 3000, WS on 8080. Change in `server.js` if needed
4. **Persistence**: Grid resets on server restart. Add Redis/JSON file save if you want permanent maps

### **Troubleshooting**

| Issue | Fix |
| --- | --- |
| `WebSocket connection failed` | Make sure `node server.js` is running first |
| `Worker blocked` error | Access via `http://localhost:3000`, not file path |
| Canvas blurry on mobile | Already handled with `image-rendering: pixelated` |
| Emojis not showing | Check browser supports Canvas fillText with emoji |

### **Future Ideas**

- [ ] Private rooms with invite codes
- [ ] Persistent user accounts + stats
- [ ] Power-ups: pixel bomb, line draw, area protect
- [ ] Spectator mode
- [ ] Save/replay famous battles

### **License**

MIT - Use it, mod it, ship it.

Built by KarthikCodingSolutions © 2026
