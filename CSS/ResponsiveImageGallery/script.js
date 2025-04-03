// script.js

const loadMoreButton = document.querySelector('.load-more-button');
const gallery = document.querySelector('.gallery');

let imageIndex = 3; // Initial number of images
const imagesPerLoad = 3; // Number of images to load per click

loadMoreButton.addEventListener('click', loadMoreImages);

function loadMoreImages() {
    for (let i = 0; i < imagesPerLoad; i++) {
        const newImage = document.createElement('div');
        newImage.classList.add('gallery-item');
        const img = document.createElement('img');
        img.src = `image${imageIndex + 1}.jpeg`;
        img.alt = `Image ${imageIndex + 1}`;
        img.loading = 'lazy';
        newImage.appendChild(img);
        gallery.appendChild(newImage);
        imageIndex++;
    }
}