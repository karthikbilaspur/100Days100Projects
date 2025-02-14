const learnMoreButton = document.getElementById('learn-more-button');
const signUpButton = document.getElementById('sign-up-button');

learnMoreButton.addEventListener('click', () => {
    alert('Learn more button clicked!');
});

signUpButton.addEventListener('click', () => {
    const name = prompt('Please enter your name:');
    const email = prompt('Please enter your email:');
    alert(`Thanks for signing up, ${name}! We'll send you updates to ${email}.`);
});

// Add animation to buttons on hover
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});