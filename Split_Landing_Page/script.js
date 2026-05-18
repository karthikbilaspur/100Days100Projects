document.addEventListener('DOMContentLoaded', () => {
    const learnMoreButton = document.getElementById('learn-more-button');
    const signUpButton = document.getElementById('sign-up-button');
    const progressBarFill = document.querySelector('.progress-bar-fill');

    // Modal elements
    const signupModal = document.getElementById('signup-modal');
    const closeButton = document.querySelector('.close-button');
    const signupForm = document.getElementById('signup-form');
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const signupFeedback = document.getElementById('signup-feedback');
    const modalSubmitButton = document.getElementById('modal-submit-button');

    // --- Helper Functions ---
    const isValidEmail = (email) => {
        // A more robust regex for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const showProgressBar = (width, color = 'var(--color-success)') => {
        progressBarFill.style.width = `${width}%`;
        progressBarFill.style.backgroundColor = color;
    };

    const resetProgressBar = () => {
        showProgressBar(0);
    };

    const openModal = () => {
        signupModal.classList.add('is-open');
        signupModal.setAttribute('aria-hidden', 'false');
        // Optional: Focus the first input for accessibility
        nameInput.focus();
        // Reset form and feedback
        signupForm.reset();
        nameError.textContent = '';
        emailError.textContent = '';
        signupFeedback.textContent = '';
        signupFeedback.className = 'feedback-message';
        modalSubmitButton.disabled = false;
    };

    const closeModal = () => {
        signupModal.classList.remove('is-open');
        signupModal.setAttribute('aria-hidden', 'true');
    };

    const showFeedback = (message, type) => {
        signupFeedback.textContent = message;
        signupFeedback.className = `feedback-message ${type}`; // Add type class (success/error)
        signupFeedback.style.display = 'block';
    };

    // --- Event Listeners ---

    // Learn More button functionality
    learnMoreButton.addEventListener('click', () => {
        // In a real app, this would navigate to another page or scroll to a section
        showFeedback("Navigating to Services page...", "success"); // Example of using feedback for other actions
        setTimeout(() => {
            alert('Imagine a smooth transition to our detailed services page!');
            signupFeedback.style.display = 'none';
        }, 1000);
    });

    // Open Sign Up Modal
    signUpButton.addEventListener('click', openModal);

    // Close Modal button
    closeButton.addEventListener('click', closeModal);

    // Close Modal when clicking outside content
    signupModal.addEventListener('click', (event) => {
        if (event.target === signupModal) {
            closeModal();
        }
    });

    // Close Modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && signupModal.classList.contains('is-open')) {
            closeModal();
        }
    });

    // Handle form submission
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        let isValid = true;
        nameError.textContent = '';
        emailError.textContent = '';
        signupFeedback.style.display = 'none';

        // Basic client-side validation
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            isValid = false;
        }

        if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!isValid) {
            showFeedback('Please correct the errors in the form.', 'error');
            return;
        }

        // If validation passes, simulate signup
        modalSubmitButton.disabled = true; // Disable button to prevent multiple submissions
        modalSubmitButton.textContent = 'Submitting...';
        showProgressBar(30, 'var(--color-primary-light)'); // Indicate submission is in progress

        try {
            // Simulate an API call
            await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay

            showProgressBar(70, 'var(--color-accent-gold)'); // Indicate more progress
            await new Promise(resolve => setTimeout(resolve, 1000)); // Another 1-second delay

            // Simulate success
            showProgressBar(100, 'var(--color-success)');
            showFeedback(`Thanks, ${nameInput.value.trim()}! Check your inbox at ${emailInput.value.trim()}.`, 'success');
            signupForm.reset(); // Clear form
            setTimeout(() => {
                closeModal();
                resetProgressBar();
            }, 3000); // Close modal and reset progress bar after a short delay
        } catch (error) {
            console.error('Signup failed:', error);
            showProgressBar(0, 'var(--color-error)'); // Show error in progress bar
            showFeedback('Signup failed. Please try again later.', 'error');
            resetProgressBar();
        } finally {
            modalSubmitButton.disabled = false;
            modalSubmitButton.textContent = 'Submit';
        }
    });
});