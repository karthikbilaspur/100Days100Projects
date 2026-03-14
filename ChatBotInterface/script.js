document.addEventListener('DOMContentLoaded', () => {
    const chatDisplay = document.getElementById('chat-display');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const quickRepliesContainer = document.getElementById('quick-replies');
    const clearChatButton = document.getElementById('clear-chat-button'); // New button

    let lastTopic = null; // To keep track of the last medical topic discussed for context

    // --- Chatbot Knowledge Base (More structured with regex and context) ---
    const knowledgeBase = [
        {
            keywords: /^(hello|hi|hey)$/i,
            response: "Hello there! How can I assist you with your health today?",
            topic: null
        },
        {
            keywords: /how are you/i,
            response: "I'm a bot, but I'm functioning perfectly! How are *you* feeling?",
            topic: null
        },
        {
            keywords: /(fever|temperature|hot|febrile)/i,
            response: "A fever is usually a sign that your body is fighting an infection. Rest, drink fluids, and consider acetaminophen or ibuprofen. If it's high or lasts long, please consult a doctor. Is there anything else you'd like to know about fever?",
            contextualResponse: { // If user asks about fever again immediately
                keywords: /(else|more|details|further)/i,
                response: "Fever can sometimes indicate serious conditions. Watch for symptoms like stiff neck, severe headache, rash, or difficulty breathing, and seek immediate medical attention if present.",
                topic: 'fever_details'
            },
            topic: 'fever'
        },
        {
            keywords: /(headache|head pain|migraine)/i,
            response: "Headaches can be caused by many things like stress, dehydration, or eye strain. Try resting, drinking water, or an over-the-counter pain reliever. If severe, sudden, or persistent, seek medical advice. Can I tell you more about headache types?",
            contextualResponse: {
                keywords: /(types|kinds|classification)/i,
                response: "Common types include tension headaches, migraines, and cluster headaches. Each has distinct characteristics and triggers.",
                topic: 'headache_types'
            },
            topic: 'headache'
        },
        {
            keywords: /(cold symptoms|common cold|sniffles|sneeze|cough)/i,
            response: "Common cold symptoms include a runny nose, sore throat, coughing, and sneezing. Get plenty of rest, stay hydrated, and use over-the-counter remedies for symptom relief. It usually resolves in a week or two.",
            topic: 'cold_symptoms'
        },
        {
            keywords: /(stomach ache|stomach pain|abdominal pain|belly ache)/i,
            response: "Stomach aches can be mild or severe. Causes range from indigestion to more serious conditions. Try bland foods, water, and rest. If it's very painful, recurring, or accompanied by other symptoms, see a doctor.",
            topic: 'stomach_ache'
        },
        {
            keywords: /(sore throat|throat pain|swallowing pain)/i,
            response: "For a sore throat, gargle with salt water, drink warm liquids, and rest your voice. Lozenges can also help. If it worsens, or if you have difficulty breathing/swallowing, consult a doctor.",
            topic: 'sore_throat'
        },
        {
            keywords: /^(thank you|thanks|cheers)$/i,
            response: "You're welcome! Feel better soon.",
            topic: null
        },
        {
            keywords: /^(bye|goodbye|farewell)$/i,
            response: "Goodbye! Take care and stay healthy.",
            topic: null
        }
    ];

    // --- Utility Functions ---

    /**
     * Adds a message to the chat display.
     * @param {string} message - The text content of the message.
     * @param {'user' | 'bot'} sender - The sender of the message ('user' or 'bot').
     * @param {string} [avatarIcon=''] - Optional emoji for the avatar.
     * @returns {HTMLElement} The message element that was added.
     */
    function addMessage(message, sender, avatarIcon = '') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = message;

        const timestamp = document.createElement('span'); // New: Timestamp
        timestamp.classList.add('timestamp');
        timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const avatarSpan = document.createElement('span');
        avatarSpan.classList.add('avatar');
        avatarSpan.textContent = avatarIcon || (sender === 'user'? '🙋‍♂️' : '🤖'); // Default avatars

        if (sender === 'user') {
            messageElement.appendChild(messageContent);
            messageElement.appendChild(timestamp); // Append timestamp
            messageElement.appendChild(avatarSpan);
        } else {
            messageElement.appendChild(avatarSpan);
            messageElement.appendChild(messageContent);
            messageElement.appendChild(timestamp); // Append timestamp
        }

        chatDisplay.appendChild(messageElement);
        chatDisplay.scrollTop = chatDisplay.scrollHeight; // Auto-scroll to the latest message
        saveChatHistory(); // Save history after adding message
        return messageElement;
    }

    /**
     * Shows a typing indicator in the chat display.
     * @returns {HTMLElement} The typing indicator element.
     */
    function showTypingIndicator() {
        const indicatorElement = document.createElement('div');
        indicatorElement.classList.add('typing-indicator', 'bot-message');
        indicatorElement.innerHTML = `
            <span class="avatar">🤖</span>
            <div class="message-content">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <span class="timestamp"></span> <!-- Placeholder for timestamp -->
        `;
        chatDisplay.appendChild(indicatorElement);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
        return indicatorElement;
    }

    /**
     * Removes the typing indicator from the chat display.
     * @param {HTMLElement} indicatorElement - The typing indicator element to remove.
     */
    function removeTypingIndicator(indicatorElement) {
        if (indicatorElement && indicatorElement.parentNode) {
            indicatorElement.parentNode.removeChild(indicatorElement);
        }
    }

    /**
     * Gets a bot response based on the user's message, considering context.
     * @param {string} userMessage - The user's message.
     * @returns {string} The bot's response.
     */
    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();

        // Check for contextual responses first
        if (lastTopic) {
            const topicEntry = knowledgeBase.find(entry => entry.topic === lastTopic);
            if (topicEntry && topicEntry.contextualResponse && lowerCaseMessage.match(topicEntry.contextualResponse.keywords)) {
                lastTopic = topicEntry.contextualResponse.topic; // Update context for sub-topic
                return topicEntry.contextualResponse.response;
            }
        }

        // Then check general responses
        for (const entry of knowledgeBase) {
            if (lowerCaseMessage.match(entry.keywords)) {
                lastTopic = entry.topic; // Set current topic for next turn
                return entry.response;
            }
        }

        lastTopic = null; // Reset topic if no match
        return "I'm sorry, I can only provide general health information and cannot offer medical diagnoses or treatment. Please consult a healthcare professional for personalized advice.";
    }

    /**
     * Disables/enables user input elements during bot's response.
     * @param {boolean} disable - True to disable, false to enable.
     */
    function toggleInputState(disable) {
        userInput.disabled = disable;
        sendButton.disabled = disable;
        // Optionally disable quick reply buttons too
        Array.from(quickRepliesContainer.children).forEach(button => {
            button.disabled = disable;
        });
        if (disable) {
            userInput.classList.add('disabled-input');
            sendButton.classList.add('disabled-button');
        } else {
            userInput.classList.remove('disabled-input');
            sendButton.classList.remove('disabled-button');
        }
    }

    /**
     * Handles user input from the text field or quick reply buttons.
     * @param {string} [inputOverride] - Optional text to use instead of the input field value (e.g., from quick reply).
     */
    function handleUserInput(inputOverride = null) {
        const userText = inputOverride || userInput.value.trim();
        if (!userText) return;

        addMessage(userText, 'user');
        userInput.value = ''; // Clear input field

        toggleInputState(true); // Disable input while bot is responding
        const typingIndicator = showTypingIndicator(); // Show typing indicator

        // Simulate a delay before the bot responds
        setTimeout(() => {
            removeTypingIndicator(typingIndicator); // Remove typing indicator
            const botResponse = getBotResponse(userText);
            addMessage(botResponse, 'bot');
            toggleInputState(false); // Enable input after bot responds
        }, Math.random() * 1500 + 500); // Random delay between 0.5 and 2 seconds
    }

    // --- Local Storage for Chat History ---

    /**
     * Saves the current chat history to local storage.
     */
    function saveChatHistory() {
        const messages = Array.from(chatDisplay.children).map(node => {
            if (node.classList.contains('message')) {
                return {
                    text: node.querySelector('.message-content').textContent,
                    sender: node.classList.contains('user-message')? 'user' : 'bot',
                    avatar: node.querySelector('.avatar').textContent,
                    timestamp: node.querySelector('.timestamp').textContent
                };
            }
            return null;
        }).filter(Boolean); // Filter out any non-message elements like typing indicator

        localStorage.setItem('medicalChatHistory', JSON.stringify(messages));
    }

    /**
     * Loads chat history from local storage.
     */
    function loadChatHistory() {
        const savedHistory = localStorage.getItem('medicalChatHistory');
        if (savedHistory) {
            const messages = JSON.parse(savedHistory);
            chatDisplay.innerHTML = ''; // Clear initial message

            messages.forEach(msg => {
                const messageElement = addMessage(msg.text, msg.sender, msg.avatar);
                // Manually set timestamp if loaded
                messageElement.querySelector('.timestamp').textContent = msg.timestamp;
            });
        } else {
            // If no history, add initial bot message
            addMessage("Hello! I'm MediBot. How can I help you today?", 'bot', '🤖');
        }
    }

    /**
     * Clears the chat history from the display and local storage.
     */
    function clearChat() {
        chatDisplay.innerHTML = '';
        localStorage.removeItem('medicalChatHistory');
        lastTopic = null; // Reset context
        // Add initial bot message after clearing
        addMessage("Hello! I'm MediBot. How can I help you today?", 'bot', '🤖');
    }

    // --- Event Listeners ---

    sendButton.addEventListener('click', () => handleUserInput());

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' &&!userInput.disabled) { // Check if input is not disabled
            handleUserInput();
        }
    });

    if (quickRepliesContainer) {
        quickRepliesContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('quick-button') &&!event.target.disabled) { // Check if button is not disabled
                const question = event.target.dataset.question;
                handleUserInput(question);
            }
        });
    }

    // New: Clear Chat button listener
    if (clearChatButton) {
        clearChatButton.addEventListener('click', clearChat);
    }

    // --- Initial Load ---
    loadChatHistory(); // Load history when the page loads
});