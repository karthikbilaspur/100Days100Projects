// script.js

const loadMoreButton = document.getElementById('loadMoreBtn');
const gallery = document.getElementById('imageGallery');

// A list of all available image URLs. This makes it more robust than just incrementing numbers.
const allImageUrls = [
    'image1.jpeg', 'image2.jpeg', 'image3.jpeg', 'image4.jpeg',
    'image5.jpeg', 'image6.jpeg', 'image7.jpeg', 'image8.jpeg',
    'image9.jpeg', 'image10.jpeg', 'image11.jpeg', 'image12.jpeg'
    // Add as many as you have
];

// Determine the starting index based on how many images are initially in the HTML
// Assumes initial images are sequential from image1.jpeg
let currentImageIndex = document.querySelectorAll('.gallery-item').length;
const imagesPerLoad = 3; // Number of images to load per click

loadMoreButton.addEventListener('click', loadMoreImages);

function loadMoreImages() {
    // Disable button and show a loading state (optional)
    loadMoreButton.disabled = true;
    loadMoreButton.textContent = 'Loading...';

    // Simulate a network request delay for better UX demonstration
    setTimeout(() => {
        let imagesLoadedThisClick = 0;
        for (let i = 0; i < imagesPerLoad; i++) {
            const imageUrlToLoad = allImageUrls[currentImageIndex];

            if (imageUrlToLoad) {
                const newImageItem = document.createElement('div');
                newImageItem.classList.add('gallery-item');

                const img = document.createElement('img');
                img.src = imageUrlToLoad;
                img.alt = `Gallery image ${currentImageIndex + 1}`; // More descriptive alt text
                img.loading = 'lazy'; // Still good for performance

                newImageItem.appendChild(img);
                gallery.appendChild(newImageItem);
                currentImageIndex++;
                imagesLoadedThisClick++;
            } else {
                // No more images to load
                console.log('No more images available.');
                break; // Exit the loop if no more images
            }
        }

        // Re-enable button and update text
        loadMoreButton.disabled = false;
        loadMoreButton.textContent = 'Load More';

        // Check if all images are loaded and hide the button if so
        if (currentImageIndex >= allImageUrls.length) {
            loadMoreButton.style.display = 'none'; // Hide the button
            console.log('All images have been loaded.');
        } else if (imagesLoadedThisClick === 0) {
            // This case handles if we tried to load but found no new images
            loadMoreButton.style.display = 'none';
        }

    }, 500); // 500ms delay to simulate loading
}

// Initial check in case there are no more images even at start (unlikely but good for robustness)
if (currentImageIndex >= allImageUrls.length) {
    loadMoreButton.style.display = 'none';
}