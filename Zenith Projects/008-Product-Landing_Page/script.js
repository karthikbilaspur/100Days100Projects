// Function to fetch products
function fetchProducts() {
    // TO DO: Implement API call to fetch products
    // For now, return a mock response
    return new Promise(resolve => {
        const mockProducts = [
            { id: 1, name: 'Product 1', price: 19.99, image: 'product1.jpg' },
            { id: 2, name: 'Product 2', price: 29.99, image: 'product2.jpg' },
            { id: 3, name: 'Product 3', price: 39.99, image: 'product3.jpg' },
            // Add more products here...
        ];
        resolve(mockProducts);
    });
}

// Function to display products
function displayProducts(products) {
    const infiniteScrollingSection = document.querySelector('.infinite-scrolling');
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
        infiniteScrollingSection.insertAdjacentHTML('beforeend', productHtml);
    });
}

// Function to handle infinite scrolling
function handleInfiniteScrolling() {
    const infiniteScrollingSection = document.querySelector('.infinite-scrolling');
    const scrollPosition = window.scrollY + window.innerHeight;
    const infiniteScrollingSectionHeight = infiniteScrollingSection.offsetHeight;
    if (scrollPosition >= infiniteScrollingSectionHeight) {
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

// Add event listener to the PS6 learn more button
document.querySelector('.ps6-section .learn-more-btn').addEventListener('click', () => {
    // TO DO: Add functionality to the PS6 learn more button
    console.log('PS6 learn more button clicked!');
});

// Add event listener to the PS7 learn more button
document.querySelector('.ps7-section .learn-more-btn').addEventListener('click', () => {
    // TO DO: Add functionality to the PS7 learn more button
    console.log('PS7 learn more button clicked!');
});