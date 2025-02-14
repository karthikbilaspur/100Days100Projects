const kinetic = document.querySelector('.kinetic');

// Function to handle errors
function handleError(error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
}

// Add event listener to window to handle errors
window.addEventListener('error', handleError);

// Function to update the kinetic loader's aria-valuenow attribute
function updateKineticLoader(value) {
    kinetic.setAttribute('aria-valuenow', value);
}

// Update the kinetic loader's aria-valuenow attribute every second
setInterval(() => {
    const value = Math.floor(Math.random() * 100);
    updateKineticLoader(value);
}, 1000);