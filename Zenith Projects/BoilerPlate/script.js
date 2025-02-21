const menu = document.getElementById('menu');
const menuToggle = document.getElementById('menu-toggle');

menuToggle.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});