document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle');
    const mainNav = document.getElementById('main-nav');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('a');
    // Ensure all potentially focusable elements in the nav are included
    const focusableElementsInNav = [toggleButton,...Array.from(navLinks)];

    let isNavOpen = false;

    // --- Helper Functions ---

    function toggleNav(forceState) {
        isNavOpen = forceState!== undefined? forceState :!isNavOpen;

        mainNav.classList.toggle('active', isNavOpen);
        toggleButton.setAttribute('aria-expanded', isNavOpen.toString());
        navMenu.toggleAttribute('hidden',!isNavOpen);

        navLinks.forEach(link => {
            link.tabIndex = isNavOpen? 0 : -1;
        });

        if (!isNavOpen) {
            toggleButton.focus(); // Return focus to the button when closing
        }
        // No need to focus on first link on open for a landing page, as users will typically scroll.
        // If it were a menu with nested items, then focusing on the first sub-item might be better.

        mainNav.dispatchEvent(new CustomEvent('navToggled', { detail: { isOpen: isNavOpen } }));
    }

    function trapFocus(event, elements) {
        if (event.key === 'Tab') {
            const firstFocusable = elements[0];
            const lastFocusable = elements[elements.length - 1];

            if (event.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    event.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    event.preventDefault();
                }
            }
        }
    }

    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // --- Event Handlers ---

    toggleButton.addEventListener('click', () => {
        try {
            toggleNav();
        } catch (error) {
            console.error('Error toggling navigation:', error);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isNavOpen) {
            toggleNav(false);
        }
        if (isNavOpen && mainNav.contains(document.activeElement)) {
            trapFocus(event, focusableElementsInNav);
        }
    });

    document.addEventListener('click', (event) => {
        const isClickInsideNav = mainNav.contains(event.target);
        if (!isClickInsideNav && isNavOpen) {
            toggleNav(false);
        }
    });

    // Handle navigation links click (smooth scroll for landing page sections)
    navMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            // Prevent default anchor jump, implement smooth scroll
            event.preventDefault();
            const targetId = event.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Scroll to the top of the section
                });
                toggleNav(false); // Close nav after clicking a link
            }
        }
    });

    const handleResize = debounce(() => {
        document.body.classList.add('no-transition');
        setTimeout(() => {
            document.body.classList.remove('no-transition');
        }, 50);
    }, 100);

    window.addEventListener('resize', handleResize);

    // --- Initial Setup ---

    navLinks.forEach(link => link.tabIndex = -1);
    navMenu.setAttribute('hidden', 'true'); // Ensure it starts hidden
});