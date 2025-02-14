// Add event listener to each image
const images = document.querySelectorAll('.gallery-item img');
images.forEach((image) => {
    image.addEventListener('click', () => {
        // Create a full-screen overlay
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);

        // Create a full-screen image
        const fullScreenImage = document.createElement('img');
        fullScreenImage.src = image.src;
        fullScreenImage.classList.add('full-screen-image');
        overlay.appendChild(fullScreenImage);

        // Add image description
        const imageDescription = document.createElement('p');
        imageDescription.classList.add('full-screen-image-description');
        imageDescription.textContent = image.getAttribute('data-description');
        overlay.appendChild(imageDescription);

        // Add close button
        const closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.textContent = '×';
        overlay.appendChild(closeButton);

        // Add event listener to close the overlay
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target === closeButton) {
                overlay.remove();
            }
        });
    });
});