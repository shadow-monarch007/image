// Main Application
class PortfolioSite {
    constructor() {
        this.currentIndex = 0;
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.init();
    }

    init() {
        this.buildIntroGrid();
        this.buildPortfolioList();
        this.buildMenu();
        this.setupEventListeners();
        this.setupLazyLoading();
        this.setupParallax();
        this.updateScrollNumber(0);
    }

    // Build intro grid from featured items
    buildIntroGrid() {
        const introGrid = document.querySelector('.intro-grid');
        const featured = PORTFOLIO_DATA.filter(item => item.isFeatured).slice(0, 12);
        
        featured.forEach(item => {
            const link = document.createElement('a');
            link.className = 'intro-item';
            link.href = `#${item.slug}`;
            link.innerHTML = `
                <img data-src="${item.image}" alt="${item.title}" />
            `;
            introGrid.appendChild(link);
        });
    }

    // Build parallax portfolio list
    buildPortfolioList() {
        const portfolioList = document.querySelector('.portfolio-list');
        
        PORTFOLIO_DATA.forEach((item, index) => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.id = item.slug;
            portfolioItem.dataset.index = index + 1;
            portfolioItem.dataset.color = item.color;
            portfolioItem.dataset.isLight = item.isLightColor;
            portfolioItem.dataset.title = item.title;
            
            portfolioItem.innerHTML = `
                <div class="portfolio-item-inner">
                    <div class="portfolio-item-image-wrapper">
                        <div class="portfolio-item-image">
                            <img data-src="${item.image}" alt="${item.title}" />
                        </div>
                    </div>
                </div>
            `;
            
            portfolioList.appendChild(portfolioItem);
        });
    }

    // Build menu overlay
    buildMenu() {
        const menuGrid = document.querySelector('.menu-grid');
        
        PORTFOLIO_DATA.forEach((item, index) => {
            const menuItem = document.createElement('a');
            menuItem.className = 'menu-item';
            menuItem.href = `#${item.slug}`;
            menuItem.innerHTML = `
                <div class="menu-item-image">
                    <img data-src="${item.image}" alt="${item.title}" />
                </div>
                <div class="menu-item-title">${item.title}</div>
                <div class="menu-item-number">${String(index + 1).padStart(2, '0')}</div>
            `;
            menuGrid.appendChild(menuItem);
        });
    }

    // Setup event listeners
    setupEventListeners() {
        // Menu trigger
        const menuTrigger = document.querySelector('.menu-trigger');
        if (menuTrigger) {
            menuTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.openMenu();
            });
        }

        // Menu close
        const menuClose = document.querySelector('.menu-close');
        if (menuClose) {
            menuClose.addEventListener('click', () => {
                this.closeMenu();
            });
        }

        // Menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const href = item.getAttribute('href');
                this.closeMenu();
                setTimeout(() => {
                    window.location.hash = href;
                }, 500);
            });
        });

        // About trigger
        const aboutTrigger = document.querySelector('a[href="#about"]');
        if (aboutTrigger) {
            aboutTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.openAbout();
            });
        }

        // About close
        const aboutClose = document.querySelector('.about-close');
        if (aboutClose) {
            aboutClose.addEventListener('click', () => {
                this.closeAbout();
            });
        }

        // Scroll event with throttle
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Hash change
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });
    }

    // Lazy loading images
    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Parallax effect
    setupParallax() {
        this.handleScroll();
    }

    // Handle scroll events
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const itemTop = rect.top;
            const itemHeight = rect.height;
            const windowHeight = window.innerHeight;
            
            // Check if item is in viewport
            if (itemTop < windowHeight && itemTop > -itemHeight) {
                const progress = (windowHeight - itemTop) / (windowHeight + itemHeight);
                const parallaxAmount = (progress - 0.5) * 100;
                
                // Apply parallax to image
                const img = item.querySelector('.portfolio-item-image img');
                if (img) {
                    img.style.transform = `scale(1.2) translateY(${parallaxAmount * 0.3}px)`;
                }
                
                // Update active states when item is centered
                if (itemTop < windowHeight / 2 && itemTop > -itemHeight / 2) {
                    this.setActiveItem(index);
                }
            }
        });
    }

    // Set active portfolio item
    setActiveItem(index) {
        if (this.currentIndex === index) return;
        
        this.currentIndex = index;
        const item = document.querySelectorAll('.portfolio-item')[index];
        
        if (item) {
            const color = item.dataset.color;
            const isLight = item.dataset.isLight === 'true';
            const title = item.dataset.title;
            const itemIndex = item.dataset.index;
            
            // Update background color
            document.body.style.backgroundColor = color;
            document.body.classList.toggle('is-light', isLight);
            document.body.classList.toggle('is-dark', !isLight);
            
            // Update title
            this.updateTitle(title, isLight);
            
            // Update scroll number
            this.updateScrollNumber(itemIndex);
        }
    }

    // Update parallax title
    updateTitle(title, isLight) {
        const titleFront = document.querySelector('.parallax-title--front');
        const titleBack = document.querySelector('.parallax-title--back');
        
        titleFront.textContent = title;
        titleBack.textContent = title;
        
        // Set contrasting text color
        titleFront.style.color = isLight ? '#1a1a1a' : '#ffffff';
        
        // Trigger animation
        titleFront.classList.remove('active');
        titleBack.classList.remove('active');
        
        setTimeout(() => {
            titleFront.classList.add('active');
            titleBack.classList.add('active');
        }, 50);
    }

    // Update scroll number
    updateScrollNumber(num) {
        const numberFront = document.querySelector('.scroll-number--front .scroll-number-value');
        const numberBack = document.querySelector('.scroll-number--back .scroll-number-value');
        
        if (numberFront && numberBack) {
            const formatted = String(num).padStart(2, '0');
            numberFront.textContent = formatted;
            numberBack.textContent = formatted;
            
            // Trigger animation
            document.querySelector('.scroll-number--front').classList.remove('active');
            document.querySelector('.scroll-number--back').classList.remove('active');
            
            setTimeout(() => {
                document.querySelector('.scroll-number--front').classList.add('active');
                document.querySelector('.scroll-number--back').classList.add('active');
            }, 50);
        }
    }

    // Open menu
    openMenu() {
        const menu = document.querySelector('.menu-overlay');
        menu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Load menu images
        const menuImages = menu.querySelectorAll('img[data-src]');
        menuImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                img.removeAttribute('data-src');
            }
        });
    }

    // Close menu
    closeMenu() {
        const menu = document.querySelector('.menu-overlay');
        menu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Open about
    openAbout() {
        const about = document.querySelector('.about-section');
        about.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close about
    closeAbout() {
        const about = document.querySelector('.about-section');
        about.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Handle hash change
    handleHashChange() {
        const hash = window.location.hash.substring(1);
        
        if (hash === 'menu') {
            this.openMenu();
        } else if (hash === 'about') {
            this.openAbout();
        } else if (hash && hash !== 'home') {
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PortfolioSite();
    });
} else {
    new PortfolioSite();
}

// Smooth scroll polyfill for older browsers
(function() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
        document.head.appendChild(script);
    }
})();
