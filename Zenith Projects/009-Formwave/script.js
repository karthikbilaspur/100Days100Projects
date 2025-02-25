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
    console.log(formData);
    // TO DO: Display menu items based on the selected category and search query
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = contactForm.getFormData();
    console.log(formData);
    // TO DO: Send the contact form data to the server
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = orderForm.getFormData();
    console.log(formData);
    // TO DO: Process the order and send a confirmation email
});

// TO DO: Display menu items on page load
fetch('menu-items.json')
    .then(response => response.json())
    .then(data => {
        const menuItemsHtml = data.map(item => `
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

// TO DO: Display menu items based on the selected category and search query
menuForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = menuForm.getFormData();
    const category = formData.category;
    const searchQuery = formData.search;
    fetch(`menu-items.json?category=${category}&search=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            const menuItemsHtml = data.map(item => `
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

// TO DO: Send the contact form data to the server
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

// TO DO: Process the order and send a confirmation email
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