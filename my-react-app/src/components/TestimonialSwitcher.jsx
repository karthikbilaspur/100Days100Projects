// src/components/TestimonialSwitcher.jsx
import React, { useState, useEffect } from 'react';

// Sample testimonial data (you can replace this with data from an API or prop)
const testimonials = [
  {
    id: 1,
    quote: "This is truly the best service I've ever encountered! My productivity has skyrocketed. Highly recommend!",
    author: "Alice Johnson",
    title: "CEO, Tech Solutions",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg" // Placeholder image
  },
  {
    id: 2,
    quote: "Unbelievable results! The team went above and beyond to deliver exactly what we needed. A pleasure to work with.",
    author: "Bob Smith",
    title: "Founder, Creative Agency",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg" // Placeholder image
  },
  {
    id: 3,
    quote: "From start to finish, the experience was seamless. Their attention to detail and customer support are unmatched.",
    author: "Carol White",
    title: "Marketing Manager, Global Corp",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg" // Placeholder image
  },
  {
    id: 4,
    quote: "I was skeptical at first, but this product changed my perspective. It's intuitive, powerful, and truly innovative.",
    author: "David Green",
    title: "Lead Developer, Innovate Inc.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/4.jpg" // Placeholder image
  },
];

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={`star ${i <= rating? 'filled' : ''}`}>
        &#9733; {/* Unicode star character */}
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

function TestimonialSwitcher({ data = testimonials, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-switch testimonials
  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, interval);
    }

    // Cleanup interval on component unmount or pause
    return () => clearInterval(timer);
  }, [data.length, interval, isPaused]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsPaused(true); // Pause when user interacts
    setTimeout(() => setIsPaused(false), interval * 2); // Resume after a delay
  };

  const handleArrowClick = (direction) => {
    setIsPaused(true); // Pause when user interacts
    if (direction === 'prev') {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }
    setTimeout(() => setIsPaused(false), interval * 2); // Resume after a delay
  };

  const currentTestimonial = data[currentIndex];

  return (
    <section className="testimonial-switcher-section">
      <div className="testimonial-switcher-container">
        <h2 className="testimonial-section-title">What Our Clients Say</h2>
        <div
          className="testimonial-box"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <p className="testimonial-quote">"{currentTestimonial.quote}"</p>
          <div className="testimonial-author-info">
            <img src={currentTestimonial.avatar} alt={currentTestimonial.author} className="testimonial-avatar" />
            <div className="author-details">
              <p className="testimonial-author">{currentTestimonial.author}</p>
              <p className="testimonial-title">{currentTestimonial.title}</p>
              {currentTestimonial.rating && <StarRating rating={currentTestimonial.rating} />}
            </div>
          </div>
        </div>

        <div className="testimonial-navigation">
          <button className="nav-arrow prev-arrow" onClick={() => handleArrowClick('prev')}>
            &#x2190; {/* Left arrow */}
          </button>

          <div className="nav-dots">
            {data.map((_, index) => (
              <span
                key={index}
                className={`nav-dot ${currentIndex === index? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>

          <button className="nav-arrow next-arrow" onClick={() => handleArrowClick('next')}>
            &#x2192; {/* Right arrow */}
          </button>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSwitcher;