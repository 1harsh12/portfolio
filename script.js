document.addEventListener('DOMContentLoaded', function() {

    const mainContent = document.querySelector('main');

    /**
     * Handles animations for elements that appear on SCROLL.
     * Page load animations are handled automatically by pure CSS.
     */
    const initScrollAnimations = () => {
        const scrollElements = document.querySelectorAll('.animate-on-scroll');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, observerOptions);

        scrollElements.forEach(el => {
            observer.observe(el);
        });
    };

    /**
     * Initializes the typing animation in the hero section.
     */
    const initTyped = () => {
        if (document.getElementById('typing-text')) {
            new Typed('#typing-text', {
                strings: [
                    'I turn ideas into interactive digital experiences.',
                    'I solve problems with clean, efficient code.',
                    'I am a passionate full-stack developer.'
                ],
                typeSpeed: 50,
                backSpeed: 25,
                backDelay: 2000,
                startDelay: 1000, // Delay to sync with the CSS load animations
                loop: true,
                showCursor: true,
                cursorChar: '█',
            });
        }
    };

    /**
     * Initializes mobile navigation (hamburger menu).
     */
    const initMobileNav = () => {
        const hamburger = document.querySelector('.hamburger');
        const mobileNav = document.querySelector('.mobile-nav');
        const navLinks = document.querySelectorAll('.mobile-nav a');

        if (hamburger && mobileNav) {
            const toggleMenu = () => {
                const isActive = hamburger.classList.toggle('is-active');
                mobileNav.classList.toggle('is-active');
                mainContent.classList.toggle('blur');
                // Prevent scrolling when mobile nav is open
                document.body.style.overflow = isActive ? 'hidden' : '';
            };
            
            hamburger.addEventListener('click', toggleMenu);
            // Close menu when a link is clicked
            navLinks.forEach(link => {
                link.addEventListener('click', toggleMenu);
            });
        }
    };
    
    /**
     * Uses IntersectionObserver for performant nav link highlighting.
     */
    const initActiveNavLinkOnScroll = () => {
        const sections = document.querySelectorAll('section[id], header[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        const observerOptions = {
            rootMargin: '-80px 0px -40% 0px', // Top offset for nav, bottom for earlier trigger
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        // Use .includes() for robustness with hrefs like '/#about'
                        if (link.getAttribute('href').includes(id)) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    };

    // --- Initialize all scripts ---
    initScrollAnimations();
    initTyped();
    initMobileNav();
    initActiveNavLinkOnScroll();
});