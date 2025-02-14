const chatLogList = document.getElementById('chat-log-list');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const clearButton = document.getElementById('clear-button');
const userList = document.getElementById('user-list');

const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = (event) => {
    const message = event.data;
    if (message.startsWith('chatMessage')) {
        const [_, username, text] = message.split(' ');
        const listItem = document.createElement('li');
        listItem.textContent = `${username}: ${text}`;
        chatLogList.appendChild(listItem);
    } else if (message.startsWith('userConnected')) {
        const [_, username] = message.split(' ');
        const listItem = document.createElement('li');
        listItem.textContent = username;
        userList.appendChild(listItem);
    } else if (message.startsWith('userDisconnected')) {
        const [_, username] = message.split(' ');
        const userListItem = userList.querySelector(`li:contains(${username})`);
        if (userListItem) {
            userList.removeChild(userListItem);
        }
    }
};

sendButton.addEventListener('click', () => {
    const message = chatInput.value;
    socket.send(`chatMessage ${message}`);
    chatInput.value = '';
});

clearButton.addEventListener('click', () => {
    chatLogList.innerHTML = '';
});

chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});