const chatLogList = document.getElementById('chat-log-list');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = (event) => {
    const message = event.data;
    const listItem = document.createElement('li');
    listItem.textContent = message;
    chatLogList.appendChild(listItem);
};

sendButton.addEventListener('click', () => {
    const message = chatInput.value;
    socket.send(message);
    chatInput.value = '';
});

chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});