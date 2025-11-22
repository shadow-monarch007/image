// Smooth scroll and animations
class HomePage {
    constructor() {
        this.init();
    }

    init() {
        this.handleScroll();
        this.animateStats();
        this.setupFormHandler();
        this.setupMobileMenu();
        this.observeElements();
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for anchor links
    handleScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offset = 80; // Header height
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Animate counter numbers
    animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    this.animateValue(entry.target, 0, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        stats.forEach(stat => observer.observe(stat));
    }

    animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = Math.floor(end);
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Form handler
    setupFormHandler() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Here you would typically send to a backend
                console.log('Form submitted:', data);
                
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                form.reset();
            });
        }
    }

    // Mobile menu toggle
    setupMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (toggle && navMenu) {
            toggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                toggle.classList.toggle('active');
            });
        }
    }

    // Intersection Observer for fade-in animations
    observeElements() {
        const fadeElements = document.querySelectorAll('.service-card, .featured-item, .about-grid, .contact-grid');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new HomePage();
    });
} else {
    new HomePage();
}

// Preload critical images
window.addEventListener('load', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.opacity = '1';
    }
});
