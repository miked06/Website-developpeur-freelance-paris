document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Smooth Scrolling with passive listener
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Optimized Scroll Animation with IntersectionObserver (meilleure performance)
    const revealElements = document.querySelectorAll('.service-card, .project-card, .section-title, .about-content');

    // Utiliser IntersectionObserver pour de meilleures performances
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach((element) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            revealObserver.observe(element);
        });
    } else {
        // Fallback pour navigateurs anciens
        revealElements.forEach((element) => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    // Header Background on Scroll avec throttle pour performance
    const header = document.querySelector('.header');
    let ticking = false;
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 50) {
                        header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
                        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
                    } else {
                        header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
                        header.style.boxShadow = 'none';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
});