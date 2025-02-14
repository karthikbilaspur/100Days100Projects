// script.js

const changeColorBtn = document.getElementById('change-color-btn');
const darkModeToggle = document.getElementById('dark-mode-toggle');

changeColorBtn.addEventListener('click', () => {
    const randomColor = getRandomColor();
    document.body.style.backgroundColor = randomColor;
    changeColorBtn.style.backgroundColor = randomColor;
});

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Add event listener to contact form submit button
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    // Add logic to handle form submission
});