// Add event listener to hero button
document.querySelector('#hero button').addEventListener('click', () => {
    // Scroll to about section
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});