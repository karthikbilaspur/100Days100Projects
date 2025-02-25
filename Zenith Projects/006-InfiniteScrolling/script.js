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
    const productsSection = document.querySelector('.products');
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
        productsSection.insertAdjacentHTML('beforeend', productHtml);
    });
}

// Function to handle infinite scrolling
function handleInfiniteScrolling() {
    const productsSection = document.querySelector('.products');
    const scrollPosition = window.scrollY + window.innerHeight;
    const productsSectionHeight = productsSection.offsetHeight;
    if (scrollPosition >= productsSectionHeight) {
        fetchProducts().then(products => {
            displayProducts(products);
        });
        document.querySelector('.loading-indicator').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.loading-indicator').style.display = 'none';
        }, 2000);
    }
}

// Function to handle load more button click
function handleLoadMoreButtonClick() {
    fetchProducts().then(products => {
        displayProducts(products);
    });
    document.querySelector('.loading-indicator').style.display = 'block';
    setTimeout(() => {
        document.querySelector('.loading-indicator').style.display = 'none';
    }, 2000);
}

// Add event listener to the window for infinite scrolling
window.addEventListener('scroll', handleInfiniteScrolling);

// Add event listener to the load more button
document.querySelector('.load-more-btn').addEventListener('click', handleLoadMoreButtonClick);

// Initial product fetch and display
fetchProducts().then(products => {
    displayProducts(products);
    document.querySelector('.load-more-btn').style.display = 'block';
});