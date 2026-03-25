// Add event listener to hero button for smooth scrolling
document.querySelector('#hero button').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default button action
    // Scroll to about section
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});

// Optional: Add active class to navigation links based on scroll position
// (This is a more advanced feature and requires tracking scroll events)
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('header nav ul li a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) { // Adjust offset as needed
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});