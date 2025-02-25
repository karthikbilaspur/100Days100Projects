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
        // Show modal
        document.getElementById('menu-item-modal').style.display = 'block';
    });
});

// Add event listener to close modal
document.querySelector('.close').addEventListener('click', () => {
    // Hide modal
    document.getElementById('menu-item-modal').style.display = 'none';
});

// Add event listener to add to cart button
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        // Get menu item details
        const menuItem = button.closest('.menu-item');
        const itemName = menuItem.querySelector('.card-header h3').textContent;
        const price = menuItem.querySelector('.card-header .price').textContent;

        // Add item to cart
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${itemName}</h3>
            <span class="price">${price}</span>
            <button class="remove-from-cart">Remove</button>
        `;
        document.querySelector('.cart-items').appendChild(cartItem);

        // Update cart total
        const cartTotal = document.querySelector('.cart-total');
        const currentTotal = parseFloat(cartTotal.textContent.replace('$', ''));
        const newItemPrice = parseFloat(price.replace('$', ''));
        cartTotal.textContent = `$${(currentTotal + newItemPrice).toFixed(2)}`;
    });
});

// Add event listener to remove from cart button
document.querySelectorAll('.remove-from-cart').forEach((button) => {
    button.addEventListener('click', () => {
        // Remove item from cart
        const cartItem = button.closest('.cart-item');
        cartItem.remove();

        // Update cart total
        const cartTotal = document.querySelector('.cart-total');
        const currentTotal = parseFloat(cartTotal.textContent.replace('$', ''));
        const removedItemPrice = parseFloat(cartItem.querySelector('.price').textContent.replace('$', ''));
        cartTotal.textContent = `$${(currentTotal - removedItemPrice).toFixed(2)}`;
    });
});

// Add event listener to checkout button
document.querySelector('.checkout').addEventListener('click', () => {
    // Process payment and complete order
    alert('Thank you for your order!');
});

// Add event listener to checkout button
document.querySelector('.checkout').addEventListener('click', () => {
    // Process payment and complete order
    alert('Thank you for your order!');
});

// Add event listener to favorite button
document.querySelectorAll('.favorite').forEach((button) => {
    button.addEventListener('click', () => {
        // Toggle favorite icon
        button.classList.toggle('favorited');
    });
});