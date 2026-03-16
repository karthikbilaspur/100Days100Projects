const preloader = document.querySelector('.preloader');
const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
    // Add a slight delay to ensure content has a chance to render before preloader hides
    setTimeout(() => {
        preloader.classList.add('hide');
        
        // Remove the preloader element from the DOM after the fade-out transition
        preloader.addEventListener('transitionend', () => {
            preloader.remove();
            body.classList.add('preloader-hidden'); // Allow body scrolling
        }, { once: true }); // Ensure the event listener only runs once
    }, 5000); // Preloader visible for 5 seconds (can adjust)
});