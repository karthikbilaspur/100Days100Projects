const quoteContainer = document.querySelector('.quote-container');
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote-btn');

let currentQuoteIndex = 0;
let quotes = [];

fetch('quotes.json')
    .then(response => response.json())
    .then(data => {
        quotes = data;
        displayQuote();
    })
    .catch(error => console.error(error));

newQuoteBtn.addEventListener('click', displayNewQuote);

function displayQuote() {
    const currentQuote = quotes[currentQuoteIndex];
    quoteElement.textContent = currentQuote.quote;
    authorElement.textContent = `- ${currentQuote.author}`;
}

function displayNewQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    displayQuote();
}