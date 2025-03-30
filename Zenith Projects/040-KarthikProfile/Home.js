import React from 'react';

function Home() {
    return (
        <section id="home" className="home-content">
            <div className="name">
                <h1>Hi, I'm V. Karthik</h1>
                <p>A Full Stack Developer with 5 years of CD/CI,  Github expertise. Python, AI, ML, Python, MERN and MEAN stacks.</p>            </div>
            <div className="angle-down-icon">
                <a href="#about"><i className="fas fa-angle-down"></i></a>
            </div>
        </section>
    );
}

export default Home;