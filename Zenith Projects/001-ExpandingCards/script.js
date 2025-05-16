// Get all menu items
const menuItems = document.querySelectorAll('.menu-item');

// Add event listener to each menu item
menuItems.forEach((menuItem) => {
    const viewMoreButton = menuItem.querySelector('.view-more');
    viewMoreButton.addEventListener('click', () => {
        // Get menu item details
        const menuItemName = menuItem.querySelector('.card-header h3').textContent;
        const menuItemPrice = menuItem.querySelector('.card-header .price').textContent;
        const menuItemDescription = menuItem.querySelector('.card-content p').textContent;

        // Show modal
        const modal = document.getElementById('menu-item-modal');
        modal.style.display = 'block';

        // Update modal content
        const modalContent = modal.querySelector('.modal-content');
        modalContent.querySelector('h2').textContent = menuItemName;
        modalContent.querySelector('#modal-description').textContent = menuItemDescription;
        modalContent.querySelector('#modal-price').textContent = `Price: ${menuItemPrice}`;

        // Add event listener to add to cart button
        const addToCartButton = modalContent.querySelector('.add-to-cart-modal');
        addToCartButton.addEventListener('click', () => {
            // Add item to cart
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h3>${menuItemName}</h3>
                <span class="price">${menuItemPrice}</span>
                <button class="remove-from-cart">Remove</button>
            `;
            document.querySelector('.cart-items').appendChild(cartItem);

            // Update cart total
            const cartTotal = document.querySelector('.cart-total');
            const currentTotal = parseFloat(cartTotal.textContent.replace('Total: $', ''));
            const newItemPrice = parseFloat(menuItemPrice.replace('$', ''));
            cartTotal.textContent = `Total: $${(currentTotal + newItemPrice).toFixed(2)}`;

            // Hide modal
            modal.style.display = 'none';
        });
    });
});

// Add event listener to close modal
const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', () => {
    // Hide modal
    const modal = document.getElementById('menu-item-modal');
    modal.style.display = 'none';
});

// Add event listener to checkout button
const checkoutButton = document.querySelector('.checkout');
checkoutButton.addEventListener('click', () => {
    // Process payment and complete order
    alert('Thank you for your order!');
});

// Add event listener to favorite button
const favoriteButtons = document.querySelectorAll('.favorite');
favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Toggle favorite icon
        button.classList.toggle('favorited');
    });
});

// Add event listener to remove from cart button
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart')) {
        // Remove item from cart
        const cartItem = event.target.parentNode;
        cartItem.remove();

        // Update cart total
        const cartTotal = document.querySelector('.cart-total');
        const currentTotal = parseFloat(cartTotal.textContent.replace('Total: $', ''));
        const removedItemPrice = parseFloat(cartItem.querySelector('.price').textContent.replace('$', ''));
        cartTotal.textContent = `Total: $${(currentTotal - removedItemPrice).toFixed(2)}`;
    }
});