import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <Link to="/">karthikShop</Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/our-products">Our Products</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                </ul>
            </nav>
            <div className="search">
                <input type="text" placeholder="Search products" />
                <ion-icon name="search"></ion-icon>
            </div>
            <div className="menu-toggle">
                <ion-icon name="menu"></ion-icon>
            </div>
        </header>
    );
};

export default Header;