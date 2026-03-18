// Get the toggle button
const toggleButton = document.getElementById('toggle-button');

// Add an event listener to the toggle button
if (toggleButton) {
    toggleButton.addEventListener('click', function() {
        // Toggle the dark theme class on the body
        document.body.classList.toggle('dark-theme');
    });
}

// Sample product data
const products = [
    {
        id: 1,
        name: 'Cozy Knit Sweater',
        description: 'A super soft and warm sweater, perfect for chilly evenings. Made from 100% organic cotton.',
        price: 49.99,
        image: 'product1.jpeg',
        details: 'Available in sizes S, M, L, XL. Colors: Beige, Grey, Navy. Material: Organic Cotton. Care: Machine wash cold, tumble dry low.',
        material: 'Organic Cotton'
    },
    {
        id: 2,
        name: 'Adventure Backpack',
        description: 'Durable and spacious backpack for all your outdoor adventures. Water-resistant material with multiple compartments.',
        price: 79.95,
        image: 'product2.jpeg',
        details: 'Capacity: 30L. Features: Padded laptop sleeve, side mesh pockets, adjustable straps. Material: High-density Polyester. Color: Forest Green.',
        material: 'Polyester'
    },
    {
        id: 3,
        name: 'Ergonomic Office Chair',
        description: 'Experience ultimate comfort and support with this ergonomic office chair. Designed for long hours of work.',
        price: 199.00,
        image: 'product3.jpeg',
        details: 'Adjustable lumbar support, breathable mesh back, 360-degree swivel, smooth-rolling casters. Material: Mesh and High-quality Steel. Max weight: 250 lbs.',
        material: 'Mesh & Steel'
    }
];

// Function to display products
function displayProducts(containerId) {
    const productListElement = document.getElementById(containerId);
    if (!productListElement) return; // Exit if container not found

    productListElement.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.setAttribute('data-product-id', product.id);

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onclick="showProductDetails(${product.id})">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>Price: $${product.price.toFixed(2)}</strong></p>
            <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        `;
        productListElement.appendChild(productElement);
    });

    // Add event listeners for "Add to Cart" buttons after they are created
    document.querySelectorAll(`#${containerId} .add-to-cart`).forEach(button => {
        button.addEventListener('click', function(event) {
            const productId = parseInt(button.dataset.productId);
            addToCart(productId);
            alert(`${products.find(p => p.id === productId).name} added to cart!`);
            event.stopPropagation(); // Prevent modal from opening if parent div is clicked
        });
    });
}

// Call displayProducts for both home and products pages
displayProducts('home-product-list');
displayProducts('products-product-list');

// Product Details Modal functionality
const productDetailsModal = document.getElementById('product-details-modal');
const modalProductContent = document.getElementById('modal-product-content');

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    modalProductContent.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}" class="modal-product-image">
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <p><strong>Details:</strong> ${product.details}</p>
        <p><strong>Material:</strong> ${product.material}</p>
        <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    `;
    productDetailsModal.style.display = 'block';

    // Add event listener for "Add to Cart" button in the modal
    document.querySelector('#modal-product-content .add-to-cart').addEventListener('click', function() {
        addToCart(product.id);
        alert(`${product.name} added to cart!`);
        closeProductDetails();
    });
}

function closeProductDetails() {
    if (productDetailsModal) {
        productDetailsModal.style.display = 'none';
    }
}

// Close the modal if the user clicks outside of it
window.addEventListener('click', function(event) {
    if (event.target === productDetailsModal) {
        closeProductDetails();
    }
});

// Cart functionality
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : { products: [] };
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const cart = getCart();
    cart.products.push(productId);
    saveCart(cart);
    displayCart(); // Update cart display immediately
}

function displayCart() {
    const cartListElement = document.getElementById('cart-list');
    if (!cartListElement) return;

    const cart = getCart();
    cartListElement.innerHTML = '';

    if (cart.products.length === 0) {
        cartListElement.innerHTML = '<p>Your cart is empty. Start shopping!</p>';
        return;
    }

    let totalPrice = 0;
    cart.products.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <span>${product.name} - $${product.price.toFixed(2)}</span>
            `;
            cartListElement.appendChild(cartItemElement);
            totalPrice += product.price;
        }
    });

    const totalElement = document.createElement('div');
    totalElement.classList.add('cart-total');
    totalElement.innerHTML = `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;
    cartListElement.appendChild(totalElement);
}

// Initial cart display when page loads (or when 'cart' page is shown)
displayCart();

// Contact Form Submission (example)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;

        console.log('Contact Form Submitted:', { name, email, message });
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset(); // Clear the form
    });
}

// Checkout Form Submission (example)
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const name = document.getElementById('checkout-name').value;
        const email = document.getElementById('checkout-email').value;
        const address = document.getElementById('checkout-address').value;

        console.log('Checkout Form Submitted:', { name, email, address });
        alert('Order placed successfully! Thank you for your purchase.');
        localStorage.removeItem('cart'); // Clear the cart
        displayCart(); // Update cart display
        checkoutForm.reset(); // Clear the form
        showPage('home'); // Redirect to home or a confirmation page
    });
}