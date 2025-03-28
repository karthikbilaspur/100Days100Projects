import React from 'react';
import Header from './Header';
import Hero from './Hero';
import ProductGrid from './ProductGrid';
import Footer from './Footer';

const App = () => {
    const products = [
        { id: 1, name: 'Product 1', price: '$19.99', image: 'https://via.placeholder.com/200x200' },
        { id: 2, name: 'Product 2', price: '$9.99', image: 'https://via.placeholder.com/200x200' },
        { id: 3, name: 'Product 3', price: '$29.99', image: 'https://via.placeholder.com/200x200' },
    ];

    return (
        <div>
            <Header />
            <Hero />
            <ProductGrid products={products} />
            <Footer />
        </div>
    );
};

export default App;