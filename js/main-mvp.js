// Zpluse University MVP - Main JavaScript

class ZplusUniversity {
    constructor() {
        this.currentFilters = {
            search: '',
            stream: '',
            tag: ''
        };
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadUniversities();
        this.initializeAnimations();
    }

    bindEvents() {
        // Navigation menu toggle for mobile
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger) hamburger.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
            });
        });

        // Global Search functionality
        const mainSearch = document.getElementById('mainSearch');
        const searchBtn = document.querySelector('.search-main-btn');

        if (mainSearch) {
            mainSearch.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value;
                this.applyFilters();
            });

            mainSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.currentFilters.search = e.target.value;
                    this.applyFilters();
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                if (mainSearch) {
                    this.currentFilters.search = mainSearch.value;
                    this.applyFilters();
                }
            });
        }

        // Filter by Stream
        const courseFilter = document.getElementById('courseFilter');
        if (courseFilter) {
            courseFilter.addEventListener('change', (e) => {
                this.currentFilters.stream = e.target.value === 'all' ? '' : e.target.value;
                this.applyFilters();
            });
        }

        // Clear Filters
        const clearFilters = document.getElementById('clearFilters');
        if (clearFilters) {
            clearFilters.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }

        // Search Tabs
        document.querySelectorAll('.search-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar background change on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                } else {
                    navbar.style.background = '#ffffff';
                    navbar.style.boxShadow = 'none';
                }
            }
        });

        // Contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                this.handleContactForm(e);
            });
        }
    }

    loadUniversities(universities = null) {
        const collegesGrid = document.getElementById('collegesGrid');
        if (!collegesGrid) return;

        const universitiesToShow = universities || UNIVERSITIES;
        
        if (!universitiesToShow || universitiesToShow.length === 0) {
            collegesGrid.innerHTML = `
                <div class="no-results">
                    <div class="no-results-content">
                        <i class="fas fa-search"></i>
                        <h3>No universities found</h3>
                        <p>Try adjusting your search criteria or filters</p>
                        <button class="btn-primary" onclick="zplusUniversity.clearAllFilters()">
                            Clear All Filters
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        collegesGrid.innerHTML = universitiesToShow.map(uni => this.createUniversityCard(uni)).join('');

        // Add click events to university cards
        collegesGrid.querySelectorAll('.college-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const universityId = card.dataset.universityId;
                    window.location.href = `college-detail.html?id=${universityId}`;
                }
            });
        });

        // Add animation to cards
        this.animateCards();
    }

    createUniversityCard(university) {
        const starRating = this.generateStarRating(university.rating);
        
        return `
            <div class="college-card" data-university-id="${university.id}">
                <div class="college-image">
                    <img src="${university.heroImage}" alt="${university.name}" onerror="this.onerror=null; this.style.display='none'; this.parentElement.classList.add('img-fallback');">
                    ${university.tags && university.tags.length > 0 ? `<span class="badge">${university.tags[0]}</span>` : ''}
                    <div class="quick-actions">
                        <button class="btn-bookmark" data-id="${university.id}" onclick="event.stopPropagation()" title="Bookmark">
                            <i class="far fa-bookmark"></i>
                        </button>
                    </div>
                </div>
                <div class="college-content">
                    <div class="college-header">
                        <h3>${university.name}</h3>
                        <div class="rating">
                            ${starRating}
                            <span class="rating-text">${university.rating}</span>
                        </div>
                    </div>
                    <p class="location">
                        <i class="fas fa-map-marker-alt"></i> ${university.location}
                    </p>
                    <div class="college-info">
                        <div class="info-item">
                            <i class="fas fa-graduation-cap"></i>
                            <span>${university.stream}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-rupee-sign"></i>
                            <span>${university.yearlyFee}</span>
                        </div>
                    </div>
                    <div class="college-stats">
                        <div class="stat-item">
                            <i class="fas fa-star"></i>
                            <span>${university.reviews} Reviews</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-book"></i>
                            <span>${university.notes.length} Notes</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-video"></i>
                            <span>${university.classes.length} Classes</span>
                        </div>
                    </div>
                    <div class="college-actions">
                        <button class="btn-compare" data-id="${university.id}" onclick="event.stopPropagation()">
                            <i class="fas fa-plus"></i> Compare
                        </button>
                        <button class="btn-secondary" onclick="window.location.href='college-detail.html?id=${university.id}'">
                            View Details
                        </button>
                        <button class="btn-primary" onclick="event.stopPropagation(); zplusUniversity.showApplyModal(${university.id})">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    applyFilters() {
        const filtered = filterUniversities(
            this.currentFilters.search,
            this.currentFilters.stream,
            this.currentFilters.tag
        );
        
        this.loadUniversities(filtered);
    }

    clearAllFilters() {
        this.currentFilters = {
            search: '',
            stream: '',
            tag: ''
        };
        
        // Reset form elements
        const mainSearch = document.getElementById('mainSearch');
        const courseFilter = document.getElementById('courseFilter');
        const locationFilter = document.getElementById('locationFilter');
        const feeFilter = document.getElementById('feeFilter');
        
        if (mainSearch) mainSearch.value = '';
        if (courseFilter) courseFilter.value = 'all';
        if (locationFilter) locationFilter.value = 'all';
        if (feeFilter) feeFilter.value = 'all';
        
        this.loadUniversities();
    }

    showApplyModal(universityId) {
        const university = getUniversityById(universityId);
        if (!university) return;

        // Create modal HTML
        const modalHTML = `
            <div class="modal-overlay" id="applyModal">
                <div class="modal-content apply-modal">
                    <button class="modal-close" onclick="zplusUniversity.closeApplyModal()">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-header">
                        <h2>Apply to ${university.name}</h2>
                        <p>Fill in your details and we'll get back to you</p>
                    </div>
                    <form class="apply-form" onsubmit="zplusUniversity.submitApplication(event, ${universityId})">
                        <div class="form-group">
                            <label for="applicantName">
                                <i class="fas fa-user"></i> Full Name *
                            </label>
                            <input 
                                type="text" 
                                id="applicantName" 
                                name="name" 
                                required 
                                placeholder="Enter your full name"
                            >
                        </div>
                        <div class="form-group">
                            <label for="applicantPhone">
                                <i class="fas fa-phone"></i> Phone Number *
                            </label>
                            <input 
                                type="tel" 
                                id="applicantPhone" 
                                name="phone" 
                                required 
                                placeholder="Enter your phone number"
                                pattern="[0-9]{10}"
                            >
                        </div>
                        <div class="form-group">
                            <label for="applicantEmail">
                                <i class="fas fa-envelope"></i> Email Address *
                            </label>
                            <input 
                                type="email" 
                                id="applicantEmail" 
                                name="email" 
                                required 
                                placeholder="Enter your email"
                            >
                        </div>
                        <div class="form-group">
                            <label for="courseInterest">
                                <i class="fas fa-graduation-cap"></i> Course Interest *
                            </label>
                            <select id="courseInterest" name="course" required>
                                <option value="">Select course</option>
                                <option value="UG">Undergraduate</option>
                                <option value="PG">Postgraduate</option>
                                <option value="PhD">Doctoral</option>
                                <option value="Diploma">Diploma</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="applicantMessage">
                                <i class="fas fa-comment"></i> Additional Message (Optional)
                            </label>
                            <textarea 
                                id="applicantMessage" 
                                name="message" 
                                rows="3"
                                placeholder="Any specific questions or requirements?"
                            ></textarea>
                        </div>
                        <button type="submit" class="btn-primary btn-block">
                            <i class="fas fa-paper-plane"></i> Submit Application
                        </button>
                    </form>
                </div>
            </div>
        `;

        // Add to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeApplyModal() {
        const modal = document.getElementById('applyModal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    }

    submitApplication(event, universityId) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const application = {
            universityId: universityId,
            universityName: getUniversityById(universityId).name,
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            course: formData.get('course'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        // MVP: Log to console (in production, this would be sent to backend)
        console.log('Application Submitted:', application);

        // Show success message
        this.closeApplyModal();
        this.showSuccessMessage('Application submitted successfully! We will contact you soon.');
        
        // Track metric for MVP
        this.trackEvent('application_submitted', {
            university: application.universityName,
            course: application.course
        });
    }

    showSuccessMessage(message) {
        const successHTML = `
            <div class="toast-notification success">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', successHTML);
        
        const toast = document.querySelector('.toast-notification');
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    handleContactForm(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const contact = {
            name: formData.get('name') || event.target[0].value,
            email: formData.get('email') || event.target[1].value,
            message: formData.get('message') || event.target[2].value,
            timestamp: new Date().toISOString()
        };

        console.log('Contact Form Submitted:', contact);
        
        this.showSuccessMessage('Thank you for contacting us! We will get back to you soon.');
        event.target.reset();
        
        this.trackEvent('contact_form_submitted', contact);
    }

    animateCards() {
        const cards = document.querySelectorAll('.college-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            observer.observe(card);
        });
    }

    initializeAnimations() {
        // Add scroll animations for sections
        const sections = document.querySelectorAll('.features-section, .about-section, .contact-section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // MVP Analytics - Track user behavior
    trackEvent(eventName, data) {
        const event = {
            event: eventName,
            data: data,
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        };
        
        console.log('Analytics Event:', event);
        
        // In production, send to analytics service
        // Example: gtag('event', eventName, data);
    }
}

// Initialize when DOM is loaded
let zplusUniversity;
document.addEventListener('DOMContentLoaded', () => {
    zplusUniversity = new ZplusUniversity();
});
