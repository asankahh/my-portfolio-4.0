document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible-section');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observe Sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden-section');
        observer.observe(section);
    });

    // Observe Cards (for staggered feel)
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.classList.add('hidden-section');
        // Add minimal delay based on index (modulo to reset delay for each row)
        card.style.transitionDelay = `${(index % 3) * 100}ms`;
        observer.observe(card);
    });

    // Active Navigation Link Highlighting & Javascript Scrolled State
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-link'); // Renamed to avoid confusion
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    // Mobile Menu Logic
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');

            // Optional: Animate icon between bars and times (X)
            const icon = menuToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking a link
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        // Toggle 'scrolled' class for logo animation
        // Trigger when scrolling past 50% of the viewport height (Hero section)
        if (scrollY > window.innerHeight * 0.5) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => { // Updated variable name here
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
                link.style.color = 'var(--accent)';
            } else {
                link.style.color = 'var(--white)';
            }
        });
    });
});
