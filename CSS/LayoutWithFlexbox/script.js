const toggleBtn = document.getElementById('toggle-btn');
const themeBtn = document.getElementById('theme-btn');
const fontSizeBtn = document.getElementById('font-size-btn');
const rightSection = document.querySelector('.right-section');
const body = document.body;

toggleBtn.addEventListener('click', () => {
    rightSection.classList.toggle('hide');
});

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

fontSizeBtn.addEventListener('click', () => {
    body.classList.toggle('large-font');
});