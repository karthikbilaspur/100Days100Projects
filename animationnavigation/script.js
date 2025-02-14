const toggle = document.getElementById('toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
    try {
        nav.classList.toggle('active');
    } catch (error) {
        console.error('Error toggling navigation:', error);
    } });

nav.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        nav.classList.remove('active');
    } });

nav.addEventListener('touchstart', () => {
    nav.classList.toggle('active'); });

nav.addEventListener('transitionend', () => {
    console.log('Navigation transition ended'); });

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        nav.classList.remove('active');});