// src/components/StickyNavbar.jsx
import React, { useState, useEffect, useRef } from 'react';

function StickyNavbar({ mainContentRef }) { // Accept mainContentRef as a prop
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Handle sticky behavior, active link, and scroll progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Sticky effect
      setIsSticky(scrollPosition > 50);

      // Scroll progress bar
      if (mainContentRef && mainContentRef.current) {
        // Calculate scrollable height correctly
        const totalPageHeight = document.documentElement.scrollHeight;
        const scrollableHeight = totalPageHeight - window.innerHeight;
        const progress = Math.min(100, Math.max(0, (scrollPosition / scrollableHeight) * 100));
        setScrollProgress(progress);
      } else {
         setScrollProgress(0); // Reset if ref not available
      }

      // Show/hide scroll-to-top button
      setShowScrollToTop(scrollPosition > viewportHeight / 2); // Show after scrolling half a viewport

      // Active link & Dynamic Title Update
      const sections = document.querySelectorAll('section[id]');
      let currentActiveId = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 70; // Offset for navbar height
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentActiveId = section.id;
        }
      });
      setActiveLink(currentActiveId);

      // Update document title
      if (currentActiveId) {
        // Attempt to get title from an h1 or h2 within the section, or fallback
        const sectionElement = document.getElementById(currentActiveId);
        const sectionTitle = sectionElement?.querySelector('h1, h2')?.textContent || sectionElement.id.charAt(0).toUpperCase() + sectionElement.id.slice(1);
        document.title = `${sectionTitle} | MySite`;
      } else {
        document.title = 'MySite'; // Default title if no section is active
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mainContentRef]); // Depend on mainContentRef to re-run effect if it changes

  // Handle smooth scroll when clicking on nav links
  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu on click
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 60, // Adjust for navbar height
        behavior: 'smooth',
      });
    }
  };

  // Close mobile menu if window is resized (e.g., from mobile to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <nav className={`navbar ${isSticky? 'sticky' : ''}`}>
        <div className="navbar-container">
          <a href="#home" className="navbar-logo" onClick={(e) => handleNavLinkClick(e, 'home')}>
            MySite
          </a>

          <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={`bar ${isMenuOpen? 'bar1-open' : ''}`}></div>
            <div className={`bar ${isMenuOpen? 'bar2-open' : ''}`}></div>
            <div className={`bar ${isMenuOpen? 'bar3-open' : ''}`}></div>
          </div>

          <ul className={`nav-menu ${isMenuOpen? 'active' : ''}`}>
            <li className="nav-item">
              <a
                href="#home"
                className={`nav-links ${activeLink === 'home'? 'active-link' : ''}`}
                onClick={(e) => handleNavLinkClick(e, 'home')}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#about"
                className={`nav-links ${activeLink === 'about'? 'active-link' : ''}`}
                onClick={(e) => handleNavLinkClick(e, 'about')}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#services"
                className={`nav-links ${activeLink === 'services'? 'active-link' : ''}`}
                onClick={(e) => handleNavLinkClick(e, 'services')}
              >
                Services
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#contact"
                className={`nav-links ${activeLink === 'contact'? 'active-link' : ''}`}
                onClick={(e) => handleNavLinkClick(e, 'contact')}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* Reading Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${scrollProgress}%` }}></div>
        </div>
      </nav>

      {/* Scroll-to-Top Button */}
      <button
        className={`scroll-to-top ${showScrollToTop? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        &#x2191; {/* Up arrow unicode character */}
      </button>
    </>
  );
}

export default StickyNavbar;