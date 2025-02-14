// Get the toggle button
const toggleButton = document.getElementById('toggle-button');

// Add an event listener to the toggle button
toggleButton.addEventListener('click', function() {
    // Toggle the dark theme class on the body
    document.body.classList.toggle('dark-theme');
});

// Get the product list element
const productList = document.getElementById('product-list');

// Create a function to display products
function displayProducts(products) {
    // Loop through each product
    products.forEach(product => {
        // Create a new product element
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        // Create a new image element
        const imageElement = document.createElement('img');
        imageElement.src = product.image;
        productElement.appendChild(imageElement);

        // Create a new heading element
        const headingElement = document.createElement('h3');
        headingElement.textContent = product.name;
        productElement.appendChild(headingElement);

        // Create a new paragraph element
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = product.description;
        productElement.appendChild(paragraphElement);

        // Add the product element to the product list
        productList.appendChild(productElement);
    });
}

// Create a sample product array
const products = [
    {
        id: 1,
        name: 'Product 1',
        description: 'This is product 1',
        image: 'product1.jpg'
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'This is product 2',
        image: 'product2.jpg'
    },
    {
        id: 3,
        name: 'Product 3',
        description: 'This is product 3',
        image: 'product3.jpg'
    }
    ];
    
    // Call the displayProducts function and pass in the products array
    displayProducts(products);
    
    // Get the add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Add an event listener to each add to cart button
    addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the product ID from the button's data attribute
        const productId = button.dataset.productId;
    
        // Add the product to the cart
        addToCart(productId);
    });
    });
    
    // Create a function to add a product to the cart
    function addToCart(productId) {
        // Get the cart from local storage
        const cart = localStorage.getItem('cart');
    
        // If the cart is empty, create a new cart object
        if (!cart) {
            const newCart = {
                products: [productId]
            };
            localStorage.setItem('cart', JSON.stringify(newCart));
        } else {
            // If the cart is not empty, add the product to the cart
            const cartObject = JSON.parse(cart);
            cartObject.products.push(productId);
            localStorage.setItem('cart', JSON.stringify(cartObject));
        }
    }
    
    // Create a function to display the cart
    function displayCart() {
        // Get the cart from local storage
        const cart = localStorage.getItem('cart');
    
        // If the cart is empty, display a message
        if (!cart) {
            console.log('Your cart is empty');
        } else {
            // If the cart is not empty, display the cart
            const cartObject = JSON.parse(cart);
            console.log('Your cart:');
            cartObject.products.forEach(productId => {
                console.log(`Product ${productId}`);
            });
        }
    }
    
    // Call the displayCart function
    displayCart();