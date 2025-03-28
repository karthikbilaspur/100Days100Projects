// Get the message list element
const messageList = document.getElementById('message-list');

// Get the message input element
const messageInput = document.getElementById('message-input');

// Get the send button element
const sendButton = document.getElementById('send-button');

// Get the clear button element
const clearButton = document.getElementById('clear-button');

// Add an event listener to the send button
sendButton.addEventListener('click', function() {
    // Get the message input value
    const message = messageInput.value.trim();

    // Check if the message is not empty
    if (message !== '') {
        // Create a new message element
        const messageElement = document.createElement('li');
        messageElement.textContent = message;

        // Add the message element to the message list
        messageList.appendChild(messageElement);

        // Clear the message input value
        messageInput.value = '';

        // Scroll to the bottom of the message list
        messageList.scrollTop = messageList.scrollHeight;
    }
});

// Add an event listener to the message input
messageInput.addEventListener('keypress', function(event) {
    // Check if the enter key was pressed
    if (event.key === 'Enter') {
        // Get the message input value
        const message = messageInput.value.trim();

        // Check if the message is not empty
        if (message !== '') {
            // Create a new message element
            const messageElement = document.createElement('li');
            messageElement.textContent = message;

            // Add the message element to the message list
            messageList.appendChild(messageElement);

                        // Clear the message input value
                        messageInput.value = '';

                        // Scroll to the bottom of the message list
                        messageList.scrollTop = messageList.scrollHeight;
                    }
                }
            });
            // Add an event listener to the clear button
            clearButton.addEventListener('click', function() {
                // Clear the message list
                messageList.innerHTML = '';
            // Clear the message input value
                messageInput.value = '';
            });
            // Add an event listener to the message list
            messageList.addEventListener('click', function(event) {
                // Check if the event target is a message element
                if (event.target.tagName === 'LI') {
                    // Get the message text
                    const messageText = event.target.textContent;
                    // Create a new message element with a delete button
                    const newMessageElement = document.createElement('li');
                    newMessageElement.textContent = messageText;
                    // Create a delete button
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', function() {
                        // Remove the message element from the message list
                        messageList.removeChild(newMessageElement);
                    });
                    // Add the delete button to the new message element
                    newMessageElement.appendChild(deleteButton);
                    // Replace the old message element with the new message element
                    messageList.replaceChild(newMessageElement, event.target);
                }
            });