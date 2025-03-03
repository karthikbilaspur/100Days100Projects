// product data
const products = [
    {
        id: 1,
        name: "Product 1",
        price: 100,
        rating: 4.5,
        features: ["Feature 1", "Feature 2", "Feature 3"]
    },
    {
        id: 2,
        name: "Product 2",
        price: 120,
        rating: 4.8,
        features: ["Feature 1", "Feature 2", "Feature 4"]
    },
    {
        id: 3,
        name: "Product 3",
        price: 150,
        rating: 4.2,
        features: ["Feature 1", "Feature 3", "Feature 5"]
    }
];

// display products
const productList = document.getElementById("product-list");
products.forEach(product => {
    const productListItem = document.createElement("li");
    productListItem.textContent = product.name;
    productList.appendChild(productListItem);
});

// add event listener to compare button
const compareButton = document.getElementById("compare-button");
compareButton.addEventListener("click", compareProducts);

// compare products
function compareProducts() {
    const productComparison = document.getElementById("product-comparison");
    productComparison.innerHTML = "";
    const comparisonTable = document.createElement("table");
    const tableHeaderRow = document.createElement("tr");
    const tableHeaderCell1 = document.createElement("th");
    tableHeaderCell1.textContent = "Feature";
    const tableHeaderCell2 = document.createElement("th");
    tableHeaderCell2.textContent = "Product 1";
    const tableHeaderCell3 = document.createElement("th");
    tableHeaderCell3.textContent = "Product 2";
    tableHeaderRow.appendChild(tableHeaderCell1);
    tableHeaderRow.appendChild(tableHeaderCell2);
    tableHeaderRow.appendChild(tableHeaderCell3);
    comparisonTable.appendChild(tableHeaderRow);
    products.forEach(product => {
        const tableRow = document.createElement("tr");
        const tableCell1 = document.createElement("td");
        tableCell1.textContent = product.name;
        const tableCell2 = document.createElement("td");
        tableCell2.textContent = product.price;
        const tableCell3 = document.createElement("td");
        tableCell3.textContent = product.rating;
        tableRow.appendChild(tableCell1);
        tableRow.appendChild(tableCell2);
        tableRow.appendChild(tableCell3);
        comparisonTable.appendChild(tableRow);
    });
    productComparison.appendChild(comparisonTable);
}

// add event listener to add product button
const addProductButton = document.getElementById("add-product-button");
addProductButton.addEventListener("click", addProduct);

// add product
function addProduct() {
    const productName = prompt("Enter product name:");
    const productPrice = prompt("Enter product price:");
    const productRating = prompt("Enter product rating:");
    const productFeatures = prompt("Enter product features (comma-separated):");
    const newProduct = {
        id: products.length + 1,
        name: productName,
        price: productPrice,
        rating: productRating,
        features: productFeatures.split(",")
    };
    products.push(newProduct);
    const productListItem = document.createElement("li");
    productListItem.textContent = productName;
    productList.appendChild(productListItem);
}

// add event listener to filter button
const filterButton = document.getElementById("apply-filter-button");
filterButton.addEventListener("click", filterProducts);

// filter products
function filterProducts() {
    const priceFilter = document.getElementById("price-filter").value;
    const ratingFilter = document.getElementById("rating-filter").value;
    const filteredProducts = products.filter(product => {
        return product.price <= priceFilter && product.rating >= ratingFilter;
    });
    const productComparison = document.getElementById("product-comparison");
    productComparison.innerHTML = "";
    const comparisonTable = document.createElement("table");
    const tableHeaderRow = document.createElement("tr");
    const tableHeaderCell1 = document.createElement("th");
    tableHeaderCell1.textContent = "Feature";
    const tableHeaderCell2 = document.createElement("th");
    tableHeaderCell2.textContent = "Product 1";
    const tableHeaderCell3 = document.createElement("th");
    tableHeaderCell3.textContent = "Product 2";
    tableHeaderRow.appendChild(tableHeaderCell1);
    tableHeaderRow.appendChild(tableHeaderCell2);
    tableHeaderRow.appendChild(tableHeaderCell3);
    comparisonTable.appendChild(tableHeaderRow);
    filteredProducts.forEach(product => {
        const tableRow = document.createElement("tr");
        const tableCell1 = document.createElement("td");
        tableCell1.textContent = product.name;
        const tableCell2 = document.createElement("td");
        tableCell2.textContent = product.price;
        const tableCell3 = document.createElement("td");
        tableCell3.textContent = product.rating;
        tableRow.appendChild(tableCell1);
        tableRow.appendChild(tableCell2);
        tableRow.appendChild(tableCell3);
        comparisonTable.appendChild(tableRow);
    });
    productComparison.appendChild(comparisonTable);
}

// add event listener to product list items
const productListItem = document.querySelectorAll("#product-list li");
productListItem.forEach(item => {
    item.addEventListener("click", displayProductDetails);
});

// display product details
function displayProductDetails(event) {
    const productName = event.target.textContent;
    const product = products.find(product => product.name === productName);
    const productModal = document.getElementById("product-modal");
    productModal.style.display = "block";
    const productModalTitle = document.getElementById("product-modal-title");
    productModalTitle.textContent = product.name;
    const productModalDescription = document.getElementById("product-modal-description");
    productModalDescription.textContent = `Price: $${product.price}, Rating: ${product.rating}/5`;
}

// add event listener to close modal button
const closeModalButton = document.getElementById("close-modal-button");
closeModalButton.addEventListener("click", closeProductModal);

// close product modal
function closeProductModal() {
    const productModal = document.getElementById("product-modal");
    productModal.style.display = "none";
}