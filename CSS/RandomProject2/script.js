const productButtons = document.querySelectorAll('.product-button');

productButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const productName = button.parentNode.querySelector('.product-title').textContent;
        const productPrice = button.parentNode.querySelector('.product-price').textContent;
        console.log(`Added ${productName} to cart for ${productPrice}`);
        
        // Update cart summary
        const cartSummary = document.querySelector('.cart-summary');
        const cartTable = cartSummary.querySelector('.cart-table');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${productName}</td>
            <td>${productPrice}</td>
            <td>1</td>
            <td>${productPrice}</td>
        `;
        cartTable.appendChild(newRow);
        
        // Update cart total
        const cartTotal = document.querySelector('.cart-total');
        const currentTotal = parseFloat(cartTotal.textContent.replace('$', ''));
        const newTotal = currentTotal + parseFloat(productPrice.replace('$', ''));
        cartTotal.textContent = `$${newTotal.toFixed(2)}`;
    });
});