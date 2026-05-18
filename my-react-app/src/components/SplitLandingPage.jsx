// src/components/SplitLandingPage.jsx
import React, { useState, useEffect } from 'react';

// Example icons (replace with actual SVG/FontAwesome/React-icons)
const leftIcon = '&#128100;'; // Unicode for a generic person icon
const rightIcon = '&#128218;'; // Unicode for a book icon

function SplitLandingPage() {
  const [hoveredHalf, setHoveredHalf] = useState(null); // 'left' or 'right'
  const [activeHalf, setActiveHalf] = useState('left'); // For keyboard navigation

  const handleLeftClick = () => {
    alert('Left side action: Join Our Community!');
    // In a real app, you would navigate to a different route or trigger an event.
  };

  const handleRightClick = () => {
    alert('Right side action: Discover Premium Content!');
    // In a real app, you would navigate to a different route or trigger an event.
  };

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        setActiveHalf('left');
        event.preventDefault();
      } else if (event.key === 'ArrowRight') {
        setActiveHalf('right');
        event.preventDefault();
      } else if (event.key === 'Enter') {
        if (activeHalf === 'left') {
          handleLeftClick();
        } else if (activeHalf === 'right') {
          handleRightClick();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeHalf]); // Re-run if activeHalf changes

  return (
    <section className="split-landing-section">
      <div className="split-container">
        {/* Left Half */}
        <div
          className={`split-half left ${hoveredHalf === 'left'? 'hovered' : ''} ${activeHalf === 'left'? 'active' : ''}`}
          onClick={handleLeftClick}
          onMouseEnter={() => setHoveredHalf('left')}
          onMouseLeave={() => setHoveredHalf(null)}
          tabIndex="0" // Make focusable
          aria-label="Join Our Community"
        >
          <div className="content">
            <span className="split-icon" dangerouslySetInnerHTML={{ __html: leftIcon }}></span>
            <h2 className="title">Join Our Community</h2>
            <p className="description">
              Connect with like-minded individuals and explore new ideas.
            </p>
            {hoveredHalf === 'left' && (
              <p className="hover-description">
                Access forums, events, and exclusive groups.
              </p>
            )}
            <button className="cta-button">Sign Up Now</button>
          </div>
        </div>

        {/* Right Half */}
        <div
          className={`split-half right ${hoveredHalf === 'right'? 'hovered' : ''} ${activeHalf === 'right'? 'active' : ''}`}
          onClick={handleRightClick}
          onMouseEnter={() => setHoveredHalf('right')}
          onMouseLeave={() => setHoveredHalf(null)}
          tabIndex="0" // Make focusable
          aria-label="Discover Premium Content"
        >
          <div className="content">
            <span className="split-icon" dangerouslySetInnerHTML={{ __html: rightIcon }}></span>
            <h2 className="title">Discover Premium Content</h2>
            <p className="description">
              Access exclusive articles, courses, and resources.
            </p>
            {hoveredHalf === 'right' && (
              <p className="hover-description">
                Unlock premium articles, video tutorials, and more!
              </p>
            )}
            <button className="cta-button">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SplitLandingPage;