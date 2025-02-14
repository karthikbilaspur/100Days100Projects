const toggleButton = document.getElementById('toggle-button');
const body = document.body;

// Add event listener to toggle button
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // Update toggle button text
    toggleButton.textContent = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

// Store user's dark mode preference in local storage
const storedDarkMode = localStorage.getItem('dark-mode');
if (storedDarkMode === 'true') {
    body.classList.add('dark-mode');
    toggleButton.textContent = 'Light Mode';
}

// Update local storage when dark mode is toggled
toggleButton.addEventListener('click', () => {
    localStorage.setItem('dark-mode', body.classList.contains('dark-mode'));
});