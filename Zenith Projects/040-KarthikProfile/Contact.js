import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import Recaptcha from 'react-recaptcha';
import Loading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram, faCodepen } from '@fortawesome/free-brands-svg-icons';
import GoogleMapReact from 'google-map-react';
import LazyLoad from 'react-lazy-load';

function Contact() {
    const { register, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);

    const recaptchaRef = React.createRef();

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await emailjs.send(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                data,
                'YOUR_USER_ID'
            );
            setSent(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onVerify = () => {
        console.log('Recaptcha verified!');
    };

    const handleMapLoad = () => {
        setMapLoaded(true);
    };

    return (
        <div>
            <Helmet>
                <title>Contact Me</title>
                <meta name="description" content="Get in touch with me through my contact form or social media profiles." />
                <link rel="canonical" href="https://yourwebsite.com/contact" />
            </Helmet>
            <section id="contact" className="contact">
                <div className="container">
                    <div className="contact-content">
                        <h1 className="contact-heading">Get in Touch</h1>
                        <p>Let's connect!</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    ref={register({ required: true })}
                                />
                                {errors.name && <div className="error">Please enter your name.</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    ref={register({ required: true, pattern: /\S+@\S+/i })}
                                />
                                {errors.email && <div className="error">Please enter a valid email address.</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    ref={register({ required: true })}
                                />
                                {errors.message && <div className="error">Please enter a message.</div>}
                            </div>
                            <Recaptcha
                                ref={recaptchaRef}
                                sitekey="YOUR_RECAPTCHA_SITE_KEY"
                                verifyCallback={onVerify}
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? (
                                    <Loading type="spin" color="#333" />
                                ) : sent ? (
                                    'Sent!'
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                        <ul className="social-media">
                            <li role="listitem">
                                <a href="https://github.com/karthikbilaspur" target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={faGithub} /> GitHub
                                </a>
                            </li>
                            <li role="listitem">
                                <a href="https://www.linkedin.com/in/vasudev-karthik-b889272a7/" target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                                </a>
                            </li>
                            <li role="listitem">
                                <a href="https://www.instagram.com/vkarthikcoder/" target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={faInstagram} /> Instagram
                                </a>
                            </li>
                            <li role="listitem">
                                <a href="https://codepen.io/karthikvasudev" target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={faCodepen} /> CodePen
                                </a>
                            </li>
                        </ul>
                        <LazyLoad>
                        <GoogleMapReact
    bootstrapURLKeys={{
        key: 'YOUR_GOOGLE_MAPS_API_KEY'
    }}
    defaultCenter={[37.7749, -122.4194]}
    defaultZoom={11}
    yesIWantToUseGoogleMapApiInternals
    onGoogleApiLoaded={({ map, maps }) => handleMapLoad(map, maps)}
>
    <div lat={37.7749} lng={-122.4194}>
        <img src="marker.png" alt="Marker" />
    </div>
</GoogleMapReact>
</LazyLoad>
</div>
</div>
</section>
</div>
);
}

export default Contact;                                