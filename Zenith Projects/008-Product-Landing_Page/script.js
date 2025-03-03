// Function to fetch products
function fetchProducts() {
    // TO DO: Implement API call to fetch products
    // For now, return a mock response
    return new Promise(resolve => {
        const mockProducts = [
            { id: 1, name: 'Dell Inspiron 15', price: 599.99, image: 'product1.jpg' },
            { id: 2, name: 'HP Envy x360', price: 699.99, image: 'product2.jpg' },
            { id: 3, name: 'Lenovo ThinkPad X1', price: 999.99, image: 'product3.jpg' },
            // Add more products here //
        ];
        resolve(mockProducts);
    });
}

// Function to display products
function displayProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    products.forEach(product => {
        const productHtml = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h2>${product.name}</h2>
                    <p>$${product.price}</p>
                </div>
            </div>
        `;
        productGrid.insertAdjacentHTML('beforeend', productHtml);
    });
}

// Function to handle infinite scrolling
function handleInfiniteScrolling() {
    const productGrid = document.querySelector('.product-grid');
    const scrollPosition = window.scrollY + window.innerHeight;
    const productGridHeight = productGrid.offsetHeight;
    if (scrollPosition >= productGridHeight) {
        fetchProducts().then(products => {
            displayProducts(products);
        });
    }
}

// Add event listener to the window for infinite scrolling
window.addEventListener('scroll', handleInfiniteScrolling);

// Initial product fetch and display
fetchProducts().then(products => {
    displayProducts(products);
});

// Add event listener to the learn more buttons
document.querySelectorAll('.learn-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        // TO DO: Add functionality to the learn more button
        console.log('Learn more button clicked!');
    });
});

// Function to fetch products
function fetchProducts() {
    // TO DO: Implement API call to fetch products
    // For now, return a mock response
    return new Promise(resolve => {
        const mockProducts = [
            { 
                id: 1, 
                name: 'Dell Inspiron 15', 
                price: 599.99, 
                image: 'https://m.media-amazon.com/images/I/71u6DkZRhgL._AC_SX679_.jpg' 
            },
            { 
                id: 2, 
                name: 'HP Envy x360', 
                price: 699.99, 
                image: 'https://m.media-amazon.com/images/I/81y6Oe1qHgL._AC_SX679_.jpg' 
            },
            { 
                id: 3, 
                name: 'Lenovo ThinkPad X1', 
                price: 999.99, 
                image: 'https://m.media-amazon.com/images/I/71XXJCk8MgL._AC_SX679_.jpg' 
            },
            // Add more products here...
        ];
        resolve(mockProducts);
    });
}

// Function to display products
function displayProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    products.forEach(product => {
        const productHtml = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h2>${product.name}</h2>
                    <p>$${product.price}</p>
                </div>
            </div>
        `;
        productGrid.insertAdjacentHTML('beforeend', productHtml);
    });
}

// Function to handle infinite scrolling
function handleInfiniteScrolling() {
    const productGrid = document.querySelector('.product-grid');
    const scrollPosition = window.scrollY + window.innerHeight;
    const productGridHeight = productGrid.offsetHeight;
    if (scrollPosition >= productGridHeight) {
        fetchProducts().then(products => {
            displayProducts(products);
        });
    }
}

// Add event listener to the window for infinite scrolling
window.addEventListener('scroll', handleInfiniteScrolling);

// Initial product fetch and display
fetchProducts().then(products => {
    displayProducts(products);
});

// Add event listener to the learn more buttons
document.querySelectorAll('.learn-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        // TO DO: Add functionality to the learn more button
        console.log('Learn more button clicked!');
    });
});