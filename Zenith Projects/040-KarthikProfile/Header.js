import React from 'react';
import { Link } from 'react-scroll';

function Header() {
    return (
        <header className="header">
            <nav className="navbar">
                <div className="navbar-container container">
                    <div>
                        <h1 className="navbar-brand">V. Karthik</h1>
                    </div>
                    <ul className="menu-items">
                        <li><Link to="home" smooth={true} duration={1000}>Home</Link></li>
                        <li><Link to="about" smooth={true} duration={1000}>About</Link></li>
                        <li><Link to="portfolio" smooth={true} duration={1000}>Portfolio</Link></li>
                        <li><Link to="contact" smooth={true} duration={1000}>Contact</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;