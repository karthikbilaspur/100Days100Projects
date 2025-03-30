// SocialMedia.js

import React, { useMemo, useCallback } from 'react';

function SocialMedia() {
    const socialMediaLinks = useMemo(() => [
        {
            id: 1,
            url: 'https://github.com/karthikbilaspur',
            icon: 'fab fa-github',
            text: 'GitHub',
            ariaLabel: 'Visit my GitHub profile',
        },
        {
            id: 2,
            url: 'https://www.linkedin.com/in/vasudev-karthik-b889272a7/',
            icon: 'fab fa-linkedin',
            text: 'LinkedIn',
            ariaLabel: 'Visit my LinkedIn profile',
        },
        {
            id: 3,
            url: 'https://www.instagram.com/vkarthikcoder/',
            icon: 'fab fa-instagram',
            text: 'Instagram',
            ariaLabel: 'Visit my Instagram profile',
        },
        {
            id: 4,
            url: 'https://codepen.io/karthikvasudev',
            icon: 'fab fa-codepen',
            text: 'CodePen',
            ariaLabel: 'Visit my CodePen profile',
        },
    ], []);

    const handleLinkClick = useCallback((event) => {
        event.preventDefault();
        const link = event.target.closest('a');
        if (link) {
            window.open(link.href, '_blank');
        }
    }, []);

    return (
        <ul className="social-media" role="list">
            {socialMediaLinks.map((link) => (
                <li key={link.id} role="listitem">
                    <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.ariaLabel}
                        onClick={handleLinkClick}
                    >
                        <i className={link.icon}></i> {link.text}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default SocialMedia;