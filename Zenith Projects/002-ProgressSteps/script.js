// Add event listener to menu item cards
document.querySelectorAll('.menu-item .card').forEach((card) => {
    card.addEventListener('click', () => {
        // Toggle card content visibility
        card.querySelector('.card-content').classList.toggle('show');
    });
});

// Add event listener to view more button
document.querySelectorAll('.view-more').forEach((button) => {
    button.addEventListener('click', () => {
        // Get the modal and its content
        const modal = document.getElementById('menu-item-modal');
        const modalContent = modal.querySelector('.modal-content');

        // Get the menu item details
        const menuItem = button.closest('.menu-item');
        const menuItemDetails = menuItem.querySelector('.card-content');

        // Set the modal content
        modalContent.querySelector('#modal-description').textContent = menuItemDetails.querySelector('p').textContent;
        modalContent.querySelector('#modal-price').textContent = menuItem.querySelector('.card-header span.price').textContent;

        // Show the modal
        modal.style.display = 'block';
    });
});

// Add event listener to close button
document.querySelector('.close').addEventListener('click', () => {
    // Get the modal
    const modal = document.getElementById('menu-item-modal');

    // Hide the modal
    modal.style.display = 'none';
});

// Add event listener to add to cart button
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        // Get the menu item
        const menuItem = button.closest('.menu-item');

        // Get the cart
        const cart = document.getElementById('cart');

        // Create a new cart item
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // Set the cart item content
        cartItem.innerHTML = `
            <h3>${menuItem.querySelector('.card-header h3').textContent}</h3>
            <span class="price">${menuItem.querySelector('.card-header span.price').textContent}</span>
            <button class="remove-from-cart">Remove</button>
        `;

        // Add the cart item to the cart
        cart.querySelector('.cart-items').appendChild(cartItem);

        // Update the cart total
        updateCartTotal();
    });
});

// Add event listener to remove from cart button
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart')) {
        // Get the cart item
        const cartItem = event.target.parentNode;

        // Remove the cart item from the cart
        cartItem.remove();

        // Update the cart total
        updateCartTotal();
    }
});

// Update the cart total
function updateCartTotal() {
    // Get the cart items
    const cartItems = document.querySelectorAll('.cart-item');

    // Calculate the total
    let total = 0;
    cartItems.forEach((cartItem) => {
        total += parseFloat(cartItem.querySelector('.price').textContent.replace('$', ''));
    });

    // Update the cart total
    document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

// Add event listener to checkout button
document.querySelector('.checkout').addEventListener('click', () => {
    // Get the cart items
    const cartItems = document.querySelectorAll('.cart-item');

    // Check if cart is empty
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Proceed to checkout
    alert('Checkout successful!');
});