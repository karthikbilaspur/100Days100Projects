import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-top">
                <div className="logo">
                    <a href="#">karthikShop</a>
                </div>
                <div className="social-media">
                    <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
                    <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
                    <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
                    <a href="#"><ion-icon name="logo-youtube"></ion-icon></a>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-links">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Shop</a></li>
                        <li><a href="#">Our Products</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                </div>
                <div className="copyright">
                    <p>&copy;2025 karthikShop</p>
                </div>
                <div className="back-to-top">
                <a href="#top">Back to top</a>
            </div>
            </div>
        </footer>
    );
};

export default Footer;