// script.js

const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav-links');
const navToggle = document.querySelector('.nav-toggle');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});