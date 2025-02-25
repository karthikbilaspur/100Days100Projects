// script.js

// Define products data
const products = [
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 9.99 },
    { id: 3, name: 'Product 3', price: 12.99 },
];

// Get the cart
const cart = [];

// Function to add product to cart
function addProductToCart(productId) {
    const product = products.find((product) => product.id === parseInt(productId));
    if (product) {
        const existingProductInCart = cart.find((cartProduct) => cartProduct.id === product.id);
        if (existingProductInCart) {
            existingProductInCart.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
    }
}

// Function to remove product from cart
function removeProductFromCart(productId) {
    const productIndexInCart = cart.findIndex((cartProduct) => cartProduct.id === parseInt(productId));
    if (productIndexInCart !== -1) {
        cart.splice(productIndexInCart, 1);
        updateCartDisplay();
    }
}

// Function to update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
    cart.forEach((cartProduct) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = `
            <h3>${cartProduct.name}</h3>
            <p>Quantity: ${cartProduct.quantity}</p>
            <p>Price: $${cartProduct.price}</p>
            <button class="remove-from-cart" data-product-id="${cartProduct.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });
    const totalPriceDisplay = document.querySelector('.cart p:last-child');
    const totalPrice = cart.reduce((acc, cartProduct) => acc + cartProduct.price * cartProduct.quantity, 0);
    totalPriceDisplay.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Add event listeners to all add-to-cart buttons
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', (event) => {
        addProductToCart(event.target.dataset.productId);
    });
});

// Add event listeners to all remove-from-cart buttons
document.querySelector('.cart-items').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart')) {
        removeProductFromCart(event.target.dataset.productId);
    }
});