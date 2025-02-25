// script.js

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const orderBtn = document.getElementById('order-btn');
const payBtn = document.getElementById('pay-btn');
const languageSelect = document.getElementById('language-select');

const restaurantMenu = {
    "pizza": "Our famous pizza, made with fresh ingredients and cooked to perfection.",
    "burger": "Our juicy burger, made with 100% beef and topped with your favorite toppings.",
    "salad": "Our fresh salad, made with mixed greens and your choice of toppings."
};

const order = [];

const googleCloudTranslationApiKey = 'YOUR_API_KEY_HERE';

async function translateText(text, targetLanguage) {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${googleCloudTranslationApiKey}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: text,
            target: targetLanguage
        })
    });
    const data = await response.json();
    return data.data.translations[0].translatedText;
}

sendBtn.addEventListener('click', async () => {
    const userMessage = userInput.value.toLowerCase();
    let response;

    if (userMessage === "hello") {
        response = "Hello! Welcome to our restaurant. How can I assist you today?";
    } else if (userMessage === "menu") {
        response = "Here is our menu: pizza, burger, salad. What would you like to order?";
        orderBtn.style.display = 'block';
    } else if (userMessage === "order") {
        response = "Please select an item from the menu to order.";
    } else if (order.includes(userMessage)) {
        response = `You have already ordered ${userMessage}. Would you like to pay now?`;
        payBtn.style.display = 'block';
    } else if (userMessage in restaurantMenu) {
        order.push(userMessage);
        response = `You have ordered ${userMessage}. Would you like to order something else?`;
    } else {
        response = "Sorry, I didn't understand that. Please try again.";
    }

    const targetLanguage = languageSelect.value;
    if (targetLanguage !== 'en') {
        response = await translateText(response, targetLanguage);
    }

    const chatMessage = document.createElement('p');
    chatMessage.textContent = `User: ${userMessage}`;
    chatBox.appendChild(chatMessage);

    const responseMessage = document.createElement('p');
    responseMessage.textContent = `Restaurant: ${response}`;
    chatBox.appendChild(responseMessage);

    userInput.value = '';
});