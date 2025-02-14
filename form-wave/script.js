// Get all form control elements
const formControls = document.querySelectorAll('.form-control');

// Add event listener to each form control element
formControls.forEach((formControl) => {
    const input = formControl.querySelector('input');
    const label = formControl.querySelector('label');

    // Add event listener to the input element
    input.addEventListener('focus', () => {
        label.classList.add('active');
    });

    // Add event listener to the input element
    input.addEventListener('blur', () => {
        if (input.value === '') {
            label.classList.remove('active');
        }
    });
});

// Get the login button element
const loginBtn = document.querySelector('.btn');

// Add event listener to the login button element
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

// Get the email and password input elements
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');

// Check if the email and password input fields are valid
if (emailInput.checkValidity() && passwordInput.checkValidity()) {
    // Display a success message
    alert('Login successful!');
} else {
    // Display an error message
    alert('Please enter valid email and password.');
}
});

// Function to handle errors
function handleError(error) {
    console.error('Error:', error);
    // Display an error message
    alert('An error occurred. Please try again later.');
}