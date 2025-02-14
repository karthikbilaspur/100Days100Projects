const darkModeToggle = document.querySelector('.dark-mode-toggle');
const backToTopButton = document.querySelector('.back-to-top');
const accordionToggles = document.querySelectorAll('.accordion-toggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

accordionToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        const accordionContent = toggle.nextElementSibling;
        accordionContent.style.display = accordionContent.style.display === 'block' ? 'none' : 'block';
    });
});