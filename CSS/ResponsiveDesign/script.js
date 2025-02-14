// Get the toggle button element
const toggleButton = document.getElementById('toggle-button');

// Define a function to toggle dark mode
const toggleDarkMode = () => {
  // Toggle the 'dark-mode' class on the body element
  document.body.classList.toggle('dark-mode');

  // Update the button text based on the current mode
  const isDarkMode = document.body.classList.contains('dark-mode');
  toggleButton.textContent = isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode';

  // Store the current mode in local storage
  localStorage.setItem('darkMode', isDarkMode);
};

// Add an event listener to the toggle button
toggleButton.addEventListener('click', toggleDarkMode);

// Check if dark mode is enabled on page load
const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';
if (isDarkModeEnabled) {
  document.body.classList.add('dark-mode');
  toggleButton.textContent = 'Toggle Light Mode';
}