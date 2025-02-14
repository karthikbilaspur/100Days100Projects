// Get all menu buttons
const menuButtons = document.querySelectorAll('.menu-button');

// Add event listener to each menu button
menuButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Get the target element
        const target = document.querySelector(button.dataset.target);

        // Toggle the collapse class
        target.classList.toggle('show');
    });
});

// Get all dropdown toggles
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

// Add event listener to each dropdown toggle
dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        // Get the dropdown menu
        const dropdownMenu = toggle.nextElementSibling;

        // Toggle the show class
        dropdownMenu.classList.toggle('show');
    });
});