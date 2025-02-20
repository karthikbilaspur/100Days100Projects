const learnMoreButton = document.getElementById('learn-more-button');
const signUpButton = document.getElementById('sign-up-button');
const progressBar = document.querySelector('.progress-bar-fill');

learnMoreButton.addEventListener('click', () => {
    alert('Learn more button clicked!');
});

signUpButton.addEventListener('click', () => {
    try {
        const name = prompt('Please enter your name:');
        const email = prompt('Please enter your email:');
        if (name && email) {
            progressBar.style.width = '50%';
            setTimeout(() => {
                alert(`Thanks for signing up, ${name}! We'll send you updates to ${email}.`);
                progressBar.style.width = '0%';
            }, 2000);
        } else {
            alert('Please enter both name and email.');
        }
    } catch (error) {
        console.error('Error signing up:', error);
        alert('An error occurred while signing up. Please try again.');
    }
});

// Add event listener to progress bar
progressBar.addEventListener('transitionend', () => {
    console.log('Progress bar transition ended');
});