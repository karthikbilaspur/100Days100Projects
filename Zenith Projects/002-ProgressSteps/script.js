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
        modalContent.innerHTML = menuItemDetails.innerHTML;

        // Show the modal
        modal.style.display = 'block';
    });
});

// Add event listener to close button
document.querySelectorAll('.close').forEach((button) => {
    button.addEventListener('click', () => {
        // Get the modal
        const modal = document.getElementById('menu-item-modal');

        // Hide the modal
        modal.style.display = 'none';
    });
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
document.querySelectorAll('.remove-from-cart').forEach((button) => {
    button.addEventListener('click', () => {
        // Get the cart item
        const cartItem = button.closest('.cart-item');

        // Remove the cart item from the cart
        cartItem.remove();

        // Update the cart total
        updateCartTotal();
    });
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

// Update progress steps on menu item selection
document.querySelectorAll('.menu-item').forEach((menuItem) => {
    menuItem.addEventListener('click', () => {
        // Update progress steps
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            if (index === 0) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    });
});

// Update progress steps on add to cart button click
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        // Update progress steps
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            if (index === 1) {
                step.classList.add('active');
            } else if (index === 0) {
                step.classList.remove('active');
            }
        });
    });
});

// Update progress steps on checkout button click
document.querySelector('.checkout').addEventListener('click', () => {
    // Update progress steps
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        if (index === 2) {
            step.classList.add('active');
        } else if (index === 1) {
            step.classList.remove('active');
        }
    });
});

// Add animation to progress steps
document.querySelectorAll('.progress-step').forEach((step) => {
    step.addEventListener('click', () => {
        // Add animation class
        step.classList.add('animate');
        // Remove animation class after 0.5 seconds
        setTimeout(() => {
            step.classList.remove('animate');
        }, 500);
    });
});

// Add event listener to favorite button
document.querySelectorAll('.favorite').forEach((button) => {
    button.addEventListener('click', () => {
        // Toggle favorite class
        button.classList.toggle('favorited');
    });
});

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

// Update progress steps on page load
document.addEventListener('DOMContentLoaded', () => {
    // Update progress steps
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        if (index === 0) {
            step.classList.add('active');
        }
    });
});