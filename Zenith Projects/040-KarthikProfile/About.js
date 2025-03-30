import React from 'react';

function About() {
    return (
        <section id="about" className="about-me">
            <div className="container">
                <div className="about-content">
                    <div className="left-content">
                        <h1 className="about-heading">About Me</h1>
                        <img src="https://via.placeholder.com/150" alt="image" />
                        <p>
                            I am V. Karthik, a web developer in training.
                        </p>
                    </div>
                    <div className="right-content">
                        <h1 className="skills-heading">My Skills</h1>
                        <div className="skills-bar">
                            <div className="bar">
                                <div className="info">
                                    <span>HTML</span>
                                </div>
                                <div className="progress-line"><span className="html"></span></div>
                            </div>
                            <div className="bar">
                                <div className="info">
                                    <span>CSS</span>
                                </div>
                                <div className="progress-line"><span className="css"></span></div>
                            </div>
                            <div className="bar">
                                <div className="info">
                                    <span>JavaScript</span>
                                </div>
                                <div className="progress-line"><span className="javascript"></span>
                                </div>
                            <div className="bar">
                                <div className="info">
                                    <span>React</span>
                                </div>
                                <div className="progress-line"><span className="react"></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;