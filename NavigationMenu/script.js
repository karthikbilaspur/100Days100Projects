const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('mouseover', () => {
        const submenu = dropdown.querySelector('.submenu');
        submenu.classList.add('show');
    });

    dropdown.addEventListener('mouseout', () => {
        const submenu = dropdown.querySelector('.submenu');
        submenu.classList.remove('show');
    });
});

// Add keyboard navigation support
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach((navLink, index) => {
    navLink.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            navLink.click();
        }
    });
});

// Add event listener to document to handle outside clicks
document.addEventListener('click', (event) => {
    const submenu = document.querySelector('.submenu.show');
    if (submenu && !submenu.contains(event.target)) {
        submenu.classList.remove('show');
    }
});