// ===============================================
// ULTRA EXPRESSIVE ENHANCEMENTS
// Smooth animations, scroll reveals, and interactions
// ===============================================

class ExpressiveEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollReveal();
        this.setupSmoothScroll();
        this.setupNavbarScroll();
        this.setupMobileMenu();
        this.setupViewToggle();
        this.setupFilterTags();
        this.setupLoadMore();
    }

    // Scroll Reveal Animation
    setupScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.college-card, .feature-card, .stat-card, .info-section'
        );

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('reveal', 'active');
                        }, index * 100);
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        revealElements.forEach((el) => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    }

    // Smooth Scroll for Navigation
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#' || href === '') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Navbar Scroll Effect
    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // Mobile Menu Toggle
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking nav link
            document.querySelectorAll('.nav-link').forEach((link) => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // View Toggle (Grid/List)
    setupViewToggle() {
        const viewBtns = document.querySelectorAll('.view-btn');
        const collegesGrid = document.querySelector('.colleges-grid');

        viewBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;

                viewBtns.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                if (collegesGrid) {
                    collegesGrid.classList.remove('grid-view', 'list-view');
                    collegesGrid.classList.add(`${view}-view`);
                }
            });
        });
    }

    // Filter Tags
    setupFilterTags() {
        const filterTags = document.querySelectorAll('.filter-tag');
        const collegeCards = document.querySelectorAll('.college-card');

        filterTags.forEach((tag) => {
            tag.addEventListener('click', () => {
                const filter = tag.dataset.filter;

                filterTags.forEach((t) => t.classList.remove('active'));
                tag.classList.add('active');

                collegeCards.forEach((card) => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        const cardType = card.dataset.type || '';
                        if (cardType.toLowerCase().includes(filter.toLowerCase())) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 10);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }

    // Load More Button
    setupLoadMore() {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                // Add loading state
                loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                loadMoreBtn.disabled = true;

                // Simulate loading more colleges
                setTimeout(() => {
                    loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Colleges';
                    loadMoreBtn.disabled = false;
                    
                    // Show toast notification
                    this.showToast('All colleges loaded!', 'success');
                }, 1500);
            });
        }
    }

    // Toast Notification
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ExpressiveEnhancements();
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effect to college cards
document.addEventListener('DOMContentLoaded', () => {
    const collegeCards = document.querySelectorAll('.college-card');
    
    collegeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});
