// src/components/Footer.jsx
import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-social-links">
          <a href="https://github.com/karthikcodingsolutions" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i> {/* Example: Font Awesome icon */}
          </a>
          <a href="https://linkedin.com/in/karthikcodingsolutions" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://twitter.com/karthikcodes" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="mailto:info@karthikcodingsolutions.com" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        <p className="footer-copyright">
          &copy; {currentYear} Karthik Coding Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;