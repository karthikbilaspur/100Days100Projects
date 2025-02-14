const form = document.getElementById('validation-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const successMessageDiv = document.querySelector('.success-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const confirmPasswordValue = confirmPasswordInput.value.trim();

    let error = false;

    if (nameValue === '') {
        setError(nameInput, 'Name is required');
        error = true;
    } else {
        setSuccess(nameInput);
    }

    if (emailValue === '') {
        setError(emailInput, 'Email is required');
        error = true;
    } else if (!validateEmail(emailValue)) {
        setError(emailInput, 'Invalid email format');
        error = true;
    } else {
        setSuccess(emailInput);
    }

    if (passwordValue === '') {
        setError(passwordInput, 'Password is required');
        error = true;
    } else if (passwordValue.length < 8) {
        setError(passwordInput, 'Password must be at least 8 characters');
        error = true;
    } else {
        setSuccess(passwordInput);
    }

    if (confirmPasswordValue === '') {
        setError(confirmPasswordInput, 'Confirm password is required');
        error = true;
    } else if (confirmPasswordValue !== passwordValue) {
        setError(confirmPasswordInput, 'Passwords do not match');
        error = true;
    } else {
        setSuccess(confirmPasswordInput);
    }

    if (!error) {
        // Form is valid, submit it
        successMessageDiv.textContent = 'Form submitted successfully!';
        successMessageDiv.style.display = 'block';

        // Simulate form submission (replace with actual submission code)
        setTimeout(() => {
            form.reset();
            successMessageDiv.style.display = 'none';
            setSuccess(nameInput);
            setSuccess(emailInput);
            setSuccess(passwordInput);
            setSuccess(confirmPasswordInput);
        }, 2000);
    }
});

function setError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group error';
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
}

function setSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = '';
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}