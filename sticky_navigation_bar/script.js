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

// Add event listener to dropdown menu
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownToggle = document.querySelector('.dropdown-toggle');

dropdownToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
});

// Add error handling for navigation
try {
    nav.addEventListener('click', (event) => {
        if (event.target.classList.contains('nav-link')) {
            event.preventDefault();
            const href = event.target.getAttribute('href');
            window.location.href = href;
        }
    });
} catch (error) {
    console.error('Error handling navigation:', error);
}

// Add accessibility features
nav.setAttribute('role', 'navigation');
navToggle.setAttribute('aria-label', 'Toggle navigation');
navLinks.setAttribute('aria-labelledby', 'nav-toggle');

// Add CSS classes for accessibility
nav.classList.add('nav-accessible');
navToggle.classList.add('nav-toggle-accessible');
navLinks.classList.add('nav-links-accessible');
