// src/App.jsx
import React, { useRef } from 'react';
import './index.css'; // Make sure your global CSS is imported here
import StickyNavbar from './components/StickyNavbar';
import TestimonialSwitcher from './components/TestimonialSwitcher';
import SplitLandingPage from './components/SplitLandingPage';
import Footer from './components/Footer'; // Import the new Footer component

function App() {
  const mainContentRef = useRef(null); // Create a ref for the main content area

  return (
    <>
      {/* Pass the mainContentRef to StickyNavbar */}
      <StickyNavbar mainContentRef={mainContentRef} />
      <div className="content-placeholder"></div>

      {/* Wrap your main content with the ref. This is crucial for scroll progress calculation. */}
      <main ref={mainContentRef} style={{ padding: '0' }}>
        <section id="home" className="section-content" style={{ backgroundColor: '#f0f0f0' }}>
          <div className="section-inner-content">
            <h1>Welcome to Karthik's App!</h1>
            <p className="lead-paragraph">
              This application is your all-in-one solution for modern web experiences.
              It showcases a range of cutting-edge React components, designed to be
              responsive, interactive, and highly performant. Dive in to explore
              dynamic navigation, engaging user feedback, and captivating landing pages.
            </p>
            <p>
              Whether you're a developer looking for inspiration or a user seeking
              a seamless digital journey, you've come to the right place.
            </p>
            <p>Scroll down to see the sticky effect, active links, and more!</p>
          </div>
        </section>

        <section id="about" className="section-content" style={{ backgroundColor: '#e0e0e0' }}>
          <div className="section-inner-content">
            <h2>About Karthik Coding Solutions</h2>
            <p>
              Karthik Coding Solutions is dedicated to crafting innovative and robust
              web applications. With a passion for clean code and exceptional user
              experiences, we specialize in modern front-end development, particularly
              with React. Our mission is to transform complex ideas into intuitive
              and visually appealing digital products.
            </p>
            <p>
              We believe in continuous learning, leveraging the latest technologies,
              and delivering solutions that not only meet but exceed expectations.
              Our expertise spans responsive design, interactive UIs, performance
              optimization, and scalable architecture.
            </p>
          </div>
        </section>

        <TestimonialSwitcher /> {/* Your testimonial switcher remains here */}

        <SplitLandingPage /> {/* Your split landing page remains here */}

        <section id="services" className="section-content" style={{ backgroundColor: '#d0d0d0' }}>
          <div className="section-inner-content">
            <h2>Our Services</h2>
            <div className="services-grid">
              <div className="service-item">
                <h3>Web Development</h3>
                <p>Building high-performance, scalable, and responsive web applications using React, Next.js, and modern JavaScript frameworks.</p>
              </div>
              <div className="service-item">
                <h3>UI/UX Design</h3>
                <p>Creating intuitive and engaging user interfaces with a focus on user-centered design principles and aesthetic appeal.</p>
              </div>
              <div className="service-item">
                <h3>Consulting</h3>
                <p>Offering expert advice on technology stacks, project architecture, and best practices to optimize your development process.</p>
              </div>
              <div className="service-item">
                <h3>API Integration</h3>
                <p>Seamlessly connecting your applications with third-party services and APIs to enhance functionality and data flow.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-content" style={{ backgroundColor: '#c0c0c0' }}>
          <div className="section-inner-content">
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you! Whether you have a project idea, a question,
              or just want to say hello, feel free to reach out.
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:info@karthikcodingsolutions.com">info@karthikcodingsolutions.com</a>
            </p>
            <p>
              <strong>Phone:</strong> <a href="tel:+9*********0">+91 9*********0</a>
            </p>
            <p>
              <strong>Address:</strong> 123 Dev Street, Tech City, Karnataka, India
            </p>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows="5" required></textarea>
              <button type="submit" className="cta-button">Send Message</button>
            </form>
          </div>
        </section>
      </main>

      <Footer /> {/* The new Footer component! */}
    </>
  );
}

export default App;