const toggleButton = document.getElementById('toggle-button');
const mainElement = document.querySelector('.main');

// Add event listener to toggle button
toggleButton.addEventListener('click', () => {
  mainElement.classList.toggle('toggle-grid');
  // Update toggle button text
  toggleButton.textContent = mainElement.classList.contains('toggle-grid') ? 'Toggle List' : 'Toggle Grid';
});

// Store user's grid preference in local storage
const storedGridPreference = localStorage.getItem('grid-preference');
if (storedGridPreference === 'true') {
  mainElement.classList.add('toggle-grid');
  toggleButton.textContent = 'Toggle List';
}

// Update local storage when grid preference is toggled
toggleButton.addEventListener('click', () => {
  localStorage.setItem('grid-preference', mainElement.classList.contains('toggle-grid'));
});

// Add event listener to window resize event
window.addEventListener('resize', () => {
  // Check if window width is less than 480px
  if (window.innerWidth < 480) {
    mainElement.classList.remove('toggle-grid');
    toggleButton.textContent = 'Toggle Grid';
  }
});

// Add event listener to window load event
window.addEventListener('load', () => {
  // Check if local storage has grid preference
  if (localStorage.getItem('grid-preference') !== null) {
    mainElement.classList.toggle('toggle-grid');
    toggleButton.textContent = mainElement.classList.contains('toggle-grid') ? 'Toggle List' : 'Toggle Grid';
  }
});