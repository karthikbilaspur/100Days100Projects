import React from 'react';

function Portfolio() {
    return (
        <section id="portfolio" className="portfolio">
            <div className="container">
                <div className="portfolio-content">
                    <h1 className="portfolio-heading">Portfolio</h1>
                    <div className="portfolio-grid">
                        <div className="portfolio-item">
                            <img src="https://via.placeholder.com/300" alt="image" />
                            <h2>Project 1</h2>
                            <p>Short description of project 1</p>
                        </div>
                        <div className="portfolio-item">
                            <img src="https://via.placeholder.com/300" alt="image" />
                            <h2>Project 2</h2>
                            <p>Short description of project 2</p>
                        </div>
                        <div className="portfolio-item">
                            <img src="https://via.placeholder.com/300" alt="image" />
                            <h2>Project 3</h2>
                            <p>Short description of project 3</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Portfolio;