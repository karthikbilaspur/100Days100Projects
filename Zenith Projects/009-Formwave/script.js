// Initialize Formwave
Formwave.init();

// Get the forms
const menuForm = document.querySelector('#menu-form');
const contactForm = document.querySelector('#contact-form');
const orderForm = document.querySelector('#order-form');

// Add event listeners to the forms
menuForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = menuForm.getFormData();
    fetch('menu-items.json')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(item => {
                return item.category === formData.category && item.name.includes(formData.search);
            });
            const menuItemsHtml = filteredData.map(item => `
                <div class="menu-item">
                    <img src="${item.image}" alt="${item.name}">
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>
                    <p>Price: ${item.price}</p>
                </div>
            `).join('');
            document.querySelector('#menu-items').innerHTML = menuItemsHtml;
        })
        .catch(error => console.error(error));
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = contactForm.getFormData();
    fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = orderForm.getFormData();
    fetch('/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});

// Add event listener to the gallery images
const galleryImages = document.querySelectorAll('.gallery-container img');
galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        // Open the image in a lightbox
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <img src="${image.src}" alt="${image.alt}">
            <button class="close-lightbox">&times;</button>
        `;
        document.body.appendChild(lightbox);
        const closeLightboxButton = document.querySelector('.close-lightbox');
        closeLightboxButton.addEventListener('click', () => {
            lightbox.remove();
        });
    });
});