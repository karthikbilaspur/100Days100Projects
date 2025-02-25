// Add event listener to the learn more button
document.querySelector('.learn-more-btn').addEventListener('click', () => {
    // TO DO: Add functionality to the learn more button
    console.log('Learn more button clicked!');
});

// Add event listener to the social links
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', () => {
        // TO DO: Add functionality to the social links
        console.log('Social link clicked!');
    });
});