# Collaborative Draw + Chat

A real-time collaborative drawing and chat application built with HTML5 Canvas, CSS3, Vanilla JavaScript, and WebSockets.

[App Screenshot](https://via.placeholder.com/800x400/1a1a1a/4CAF50?text=Collaborative+Draw+%2B+Chat)

## ✨ Features

- **Real-time Drawing** - Multiple users can draw on the same canvas simultaneously
- **Live Chat** - Built-in chat system with user list and system notifications
- **Tools** - Brush, color picker, adjustable brush size, eraser, and undo
- **User Cursors** - See other users' cursor positions in real-time with their usernames
- **Touch Support** - Works on mobile devices and tablets
- **Auto-Reconnect** - Automatically reconnects if connection drops
- **Responsive Design** - Fully responsive with animations and transitions
- **XSS Protection** - All user input is sanitized before rendering

## 🛠️ Tech Stack

**Frontend:**

- HTML5 Canvas API
- CSS3 (Animations, Transitions, Media Queries, Flexbox)
- Vanilla JavaScript (ES6+)

**Backend:**

- Node.js
- `ws` library for WebSocket server
- Native HTTP module for serving static files

## 📁 Project Structure

collaborative-draw-chat/
├── index.html          # Main HTML file with meta tags and structure
├── styles.css          # All styling, animations, and responsive design
├── script.js           # Client-side WebSocket logic and canvas handling
├── server.js           # Node.js WebSocket + HTTP server
├── package.json        # Project dependencies
└── README.md           # This file

## 🚀 Getting Started

### Prerequisites

- Node.js v14+ installed on your system
- npm (comes with Node.js)

### Installation

1. **Clone or download the project files** into a folder

2. **Install dependencies:**
   bash
   npm install

3. **Start the server:**
   bash
   node server.js
   Or if you added the start script:
   bash
   npm start

4. **Open in browser:**
   http://localhost:3000

5. **Test with multiple users:** Open multiple browser tabs or windows and pick different usernames

## 🎮 How to Use

1. **Join:** Enter a username when prompted and click "Join"
2. **Draw:** Click and drag on the canvas to draw. Use the toolbar to change color, brush size, or select the eraser
3. **Chat:** Type messages in the chat box and press Enter or click Send
4. **Undo:** Click the Undo button to remove the last stroke from the canvas
5. **Clear:** Use "Clear Canvas" or "Clear Chat" to reset either section

### Controls

| Action | Tool |
| --- | --- |
| Draw | Left-click + drag mouse or touch + drag |
| Change Color | Color picker in toolbar |
| Change Brush Size | Slider in toolbar |
| Erase | Click "Eraser" button to toggle |
| Undo Last Stroke | Click "Undo" button |
| Send Message | Type in chat box + Enter |

## 🔧 Configuration

### Changing Ports

By default, the HTTP server runs on port `3000` and WebSocket on port `8080`. To change:

**server.js:**
javascript
.listen(3000, () => console.log('HTTP server running on http://localhost:3000'));
const wss = new WebSocket.Server({ port: 8080 });

**script.js:**
javascript
socket = new WebSocket(`${protocol}//${window.location.hostname}:8080`);

### Draw History Limit

To prevent memory issues, drawing history is capped at 500 strokes. Change in `server.js`:
javascript
const MAX_HISTORY = 500;

## 📱 Responsive Breakpoints

- **1200px** - Canvas scales to 600x400
- **950px** - Layout switches to vertical, chat goes below canvas
- **650px** - Canvas scales to 400x300, smaller toolbar buttons
- **400px** - Canvas scales to 250px height, compact chat

## 🔒 Security Notes

- All chat messages are escaped using `escapeHtml()` to prevent XSS
- Message length is limited to 200 characters server-side
- Drawing history is capped to prevent memory exhaustion
- No user authentication - usernames are not verified

## 🚧 Known Limitations

1. **No persistence** - Refreshing clears the canvas for everyone. Add a database to save drawings
2. **No rooms** - All users share the same canvas. Room support can be added
3. **No admin controls** - Any user can clear canvas or chat
4. **Single server** - Does not scale horizontally. Use Redis for multi-server setup

## 🔮 Future Enhancements

- [ ] Private rooms with shareable links
- [ ] Save/load drawings as PNG
- [ ] More tools: shapes, text, fill bucket
- [ ] Pressure sensitivity for stylus
- [ ] User authentication
- [ ] Drawing permissions / admin mode
- [ ] Export chat logs

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**KarthikCodingSolutions** © 2026

---

Built with ❤️ using WebSockets and Canvas API
