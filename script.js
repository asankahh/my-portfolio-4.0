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
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

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

        navLinks.forEach(link => {
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
