// Zplus University MVP - University Detail Page

class UniversityDetail {
    constructor() {
        this.universityId = this.getUniversityIdFromURL();
        this.university = null;
        this.activeTab = 'overview';
        this.init();
    }

    getUniversityIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id'));
    }

    init() {
        this.university = getUniversityById(this.universityId);
        
        if (!this.university) {
            this.showError();
            return;
        }

        this.renderUniversityDetails();
        this.bindEvents();
    }

    renderUniversityDetails() {
        // Update page title
        document.title = `${this.university.name} - Zplus University`;
        document.getElementById('collegeTitle').textContent = `${this.university.name} - Zplus University`;

        // Render hero section
        this.renderHeroSection();
        
        // Render tabs
        this.renderTabs();
        
        // Render overview content (default)
        this.renderOverview();
    }

    renderHeroSection() {
        const heroSection = document.querySelector('.college-header') || this.createHeroSection();
        const starRating = this.generateStarRating(this.university.rating);
        
        heroSection.innerHTML = `
            <div class="college-hero" style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${this.university.heroImage}');">
                <div class="container">
                    <div class="hero-content">
                        <div class="breadcrumb">
                            <a href="index.html"><i class="fas fa-home"></i> Home</a>
                            <span>/</span>
                            <span>${this.university.name}</span>
                        </div>
                        <h1>${this.university.fullName}</h1>
                        <div class="hero-meta">
                            <div class="rating-large">
                                ${starRating}
                                <span class="rating-score">${this.university.rating}</span>
                                <span class="rating-reviews">(${this.university.reviews} reviews)</span>
                            </div>
                            <div class="hero-info">
                                <span><i class="fas fa-map-marker-alt"></i> ${this.university.location}</span>
                                <span><i class="fas fa-calendar"></i> Est. ${this.university.established}</span>
                                <span><i class="fas fa-graduation-cap"></i> ${this.university.stream}</span>
                            </div>
                        </div>
                        <div class="hero-actions">
                            <button class="btn-primary btn-lg" onclick="universityDetail.showApplyModal()">
                                <i class="fas fa-paper-plane"></i> Apply Now
                            </button>
                            <button class="btn-secondary btn-lg" onclick="universityDetail.downloadBrochure()">
                                <i class="fas fa-download"></i> Download Brochure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createHeroSection() {
        const main = document.querySelector('main') || document.querySelector('body');
        const heroSection = document.createElement('section');
        heroSection.className = 'college-header';
        main.insertBefore(heroSection, main.firstChild);
        return heroSection;
    }

    renderTabs() {
        const tabsHTML = `
            <div class="university-tabs">
                <div class="container">
                    <div class="tabs-wrapper">
                        <button class="tab-btn active" data-tab="overview">
                            <i class="fas fa-info-circle"></i> Overview
                        </button>
                        <button class="tab-btn" data-tab="notes">
                            <i class="fas fa-file-pdf"></i> Notes <span class="badge-count">${this.university.notes.length}</span>
                        </button>
                        <button class="tab-btn" data-tab="classes">
                            <i class="fas fa-video"></i> Classes <span class="badge-count">${this.university.classes.length}</span>
                        </button>
                        <button class="tab-btn" data-tab="reviews">
                            <i class="fas fa-star"></i> Reviews <span class="badge-count">${this.university.reviews.length}</span>
                        </button>
                        <button class="tab-btn" data-tab="gallery">
                            <i class="fas fa-images"></i> Gallery
                        </button>
                    </div>
                </div>
            </div>
            <div class="tab-content-container">
                <div class="container">
                    <div id="tabContent" class="tab-content"></div>
                </div>
            </div>
        `;

        const existingTabs = document.querySelector('.university-tabs');
        if (existingTabs) {
            existingTabs.parentElement.innerHTML = tabsHTML;
        } else {
            const header = document.querySelector('.college-header');
            header.insertAdjacentHTML('afterend', tabsHTML);
        }
    }

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });
    }

    switchTab(tabName) {
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        this.activeTab = tabName;

        // Render appropriate content
        const tabContent = document.getElementById('tabContent');
        
        switch(tabName) {
            case 'overview':
                this.renderOverview();
                break;
            case 'notes':
                this.renderNotes();
                break;
            case 'classes':
                this.renderClasses();
                break;
            case 'reviews':
                this.renderReviews();
                break;
            case 'gallery':
                this.renderGallery();
                break;
        }

        // Smooth scroll to content
        tabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    renderOverview() {
        const tabContent = document.getElementById('tabContent');
        tabContent.innerHTML = `
            <div class="overview-content">
                <div class="overview-main">
                    <section class="info-section">
                        <h2>About ${this.university.name}</h2>
                        <p class="about-text">${this.university.about}</p>
                    </section>

                    <section class="info-section">
                        <h2>Campus Facilities</h2>
                        <div class="facilities-grid">
                            ${this.university.campusFacilities.map(facility => `
                                <div class="facility-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>${facility}</span>
                                </div>
                            `).join('')}
                        </div>
                    </section>

                    <section class="info-section">
                        <h2>Placement Statistics</h2>
                        <div class="placement-stats">
                            <div class="stat-card">
                                <i class="fas fa-chart-line"></i>
                                <h3>${this.university.placementStats.averagePackage}</h3>
                                <p>Average Package</p>
                            </div>
                            <div class="stat-card">
                                <i class="fas fa-trophy"></i>
                                <h3>${this.university.placementStats.highestPackage}</h3>
                                <p>Highest Package</p>
                            </div>
                            <div class="stat-card">
                                <i class="fas fa-percent"></i>
                                <h3>${this.university.placementStats.placementRate}</h3>
                                <p>Placement Rate</p>
                            </div>
                        </div>
                        <div class="top-recruiters">
                            <h3>Top Recruiters</h3>
                            <div class="recruiters-list">
                                ${this.university.placementStats.topRecruiters.map(recruiter => `
                                    <span class="recruiter-badge">${recruiter}</span>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                </div>

                <div class="overview-sidebar">
                    <div class="quick-info-card">
                        <h3>Quick Information</h3>
                        <div class="quick-info-item">
                            <span class="label">Total Fees:</span>
                            <span class="value">${this.university.totalFees}</span>
                        </div>
                        <div class="quick-info-item">
                            <span class="label">Established:</span>
                            <span class="value">${this.university.established}</span>
                        </div>
                        <div class="quick-info-item">
                            <span class="label">Type:</span>
                            <span class="value">${this.university.type}</span>
                        </div>
                        <div class="quick-info-item">
                            <span class="label">Stream:</span>
                            <span class="value">${this.university.stream}</span>
                        </div>
                        <button class="btn-primary btn-block" onclick="universityDetail.showApplyModal()">
                            <i class="fas fa-paper-plane"></i> Apply Now
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderNotes() {
        const tabContent = document.getElementById('tabContent');
        tabContent.innerHTML = `
            <div class="learning-hub-content">
                <div class="section-header">
                    <h2><i class="fas fa-file-pdf"></i> Study Notes</h2>
                    <p>Download comprehensive study materials and lecture notes</p>
                </div>
                <div class="notes-grid">
                    ${this.university.notes.map(note => this.createNoteCard(note)).join('')}
                </div>
            </div>
        `;
    }

    createNoteCard(note) {
        return `
            <div class="note-card">
                <div class="note-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="note-content">
                    <h3>${note.title}</h3>
                    <p class="note-meta">
                        <span><i class="fas fa-user"></i> ${note.professor}</span>
                        <span><i class="fas fa-book"></i> ${note.subject}</span>
                    </p>
                    <p class="note-pages">
                        <i class="fas fa-file-alt"></i> ${note.pages} pages • ${note.format}
                    </p>
                </div>
                <button class="btn-download" onclick="universityDetail.downloadNote(${note.id})">
                    <i class="fas fa-download"></i> Download
                </button>
            </div>
        `;
    }

    renderClasses() {
        const tabContent = document.getElementById('tabContent');
        tabContent.innerHTML = `
            <div class="learning-hub-content">
                <div class="section-header">
                    <h2><i class="fas fa-video"></i> Class Lectures</h2>
                    <p>Watch actual lectures to judge teaching quality</p>
                </div>
                <div class="classes-grid">
                    ${this.university.classes.map(cls => this.createClassCard(cls)).join('')}
                </div>
            </div>
        `;
    }

    createClassCard(cls) {
        return `
            <div class="class-card" onclick="universityDetail.playVideo(${cls.id})">
                <div class="class-thumbnail">
                    <img src="${cls.thumbnail}" alt="${cls.title}" onerror="this.onerror=null; this.style.display='none'; this.parentElement.classList.add('img-fallback');">
                    <div class="play-overlay">
                        <i class="fas fa-play-circle"></i>
                    </div>
                    <span class="duration">${cls.duration}</span>
                </div>
                <div class="class-content">
                    <h3>${cls.title}</h3>
                    <p class="class-meta">
                        <span><i class="fas fa-user"></i> ${cls.professor}</span>
                        <span><i class="fas fa-book"></i> ${cls.subject}</span>
                    </p>
                </div>
            </div>
        `;
    }

    renderReviews() {
        const tabContent = document.getElementById('tabContent');
        tabContent.innerHTML = `
            <div class="reviews-content">
                <div class="section-header">
                    <h2><i class="fas fa-star"></i> Student Reviews</h2>
                    <p>Authentic reviews from students and alumni</p>
                </div>
                <div class="reviews-summary">
                    <div class="rating-overview">
                        <div class="big-rating">${this.university.rating}</div>
                        <div class="rating-stars">${this.generateStarRating(this.university.rating)}</div>
                        <p>Based on ${this.university.reviews.length} reviews</p>
                    </div>
                </div>
                <div class="reviews-list">
                    ${this.university.reviews.map(review => this.createReviewCard(review)).join('')}
                </div>
            </div>
        `;
    }

    createReviewCard(review) {
        return `
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">
                            <i class="fas fa-user-graduate"></i>
                        </div>
                        <div>
                            <h4>${review.studentName}</h4>
                            <p>${review.batch}</p>
                        </div>
                    </div>
                    <div class="review-rating">
                        ${this.generateStarRating(review.rating)}
                    </div>
                </div>
                <div class="review-content">
                    <p>${review.text}</p>
                </div>
                <div class="review-footer">
                    <span class="review-date"><i class="fas fa-calendar"></i> ${review.date}</span>
                </div>
            </div>
        `;
    }

    renderGallery() {
        const tabContent = document.getElementById('tabContent');
        tabContent.innerHTML = `
            <div class="gallery-content">
                <div class="section-header">
                    <h2><i class="fas fa-images"></i> Campus Gallery</h2>
                    <p>Explore our beautiful campus</p>
                </div>
                <div class="gallery-grid">
                    ${this.university.gallery.map((img, index) => `
                        <div class="gallery-item" onclick="universityDetail.openGalleryModal(${index})">
                            <img src="${img}" alt="Campus ${index + 1}" onerror="this.onerror=null; this.style.display='none'; this.parentElement.classList.add('img-fallback');">
                            <div class="gallery-overlay">
                                <i class="fas fa-search-plus"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    downloadNote(noteId) {
        const note = this.university.notes.find(n => n.id === noteId);
        if (!note) return;

        // Show download progress (MVP simulation)
        this.showDownloadProgress(note.title);

        // Track event
        this.trackEvent('note_download', {
            university: this.university.name,
            note: note.title,
            subject: note.subject
        });
    }

    showDownloadProgress(noteTitle) {
        const progressHTML = `
            <div class="modal-overlay" id="downloadModal">
                <div class="modal-content download-modal">
                    <div class="download-icon">
                        <i class="fas fa-file-download"></i>
                    </div>
                    <h3>Downloading...</h3>
                    <p>${noteTitle}</p>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill"></div>
                    </div>
                    <p class="progress-text"><span id="progressPercent">0</span>%</p>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', progressHTML);

        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    document.getElementById('downloadModal').remove();
                    this.showSuccessMessage('Download completed successfully!');
                }, 500);
            }
            document.getElementById('progressFill').style.width = progress + '%';
            document.getElementById('progressPercent').textContent = Math.floor(progress);
        }, 300);
    }

    playVideo(classId) {
        const cls = this.university.classes.find(c => c.id === classId);
        if (!cls) return;

        const videoModalHTML = `
            <div class="modal-overlay" id="videoModal" onclick="if(event.target === this) universityDetail.closeVideoModal()">
                <div class="modal-content video-modal">
                    <button class="modal-close" onclick="universityDetail.closeVideoModal()">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="video-header">
                        <h3>${cls.title}</h3>
                        <p><i class="fas fa-user"></i> ${cls.professor} • <i class="fas fa-book"></i> ${cls.subject}</p>
                    </div>
                    <div class="video-wrapper">
                        <iframe 
                            width="100%" 
                            height="500" 
                            src="${cls.videoUrl}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', videoModalHTML);
        document.body.style.overflow = 'hidden';

        // Track event
        this.trackEvent('video_played', {
            university: this.university.name,
            class: cls.title,
            subject: cls.subject
        });
    }

    closeVideoModal() {
        const modal = document.getElementById('videoModal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    }

    showApplyModal() {
        const modalHTML = `
            <div class="modal-overlay" id="applyModal">
                <div class="modal-content apply-modal">
                    <button class="modal-close" onclick="universityDetail.closeApplyModal()">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-header">
                        <h2>Apply to ${this.university.name}</h2>
                        <p>Fill in your details and we'll get back to you</p>
                    </div>
                    <form class="apply-form" onsubmit="universityDetail.submitApplication(event)">
                        <div class="form-group">
                            <label><i class="fas fa-user"></i> Full Name *</label>
                            <input type="text" name="name" required placeholder="Enter your full name">
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-phone"></i> Phone Number *</label>
                            <input type="tel" name="phone" required placeholder="10-digit phone number" pattern="[0-9]{10}">
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-envelope"></i> Email Address *</label>
                            <input type="email" name="email" required placeholder="your.email@example.com">
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-graduation-cap"></i> Course Interest *</label>
                            <select name="course" required>
                                <option value="">Select course level</option>
                                <option value="UG">Undergraduate</option>
                                <option value="PG">Postgraduate</option>
                                <option value="PhD">Doctoral</option>
                                <option value="Diploma">Diploma</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-comment"></i> Message (Optional)</label>
                            <textarea name="message" rows="3" placeholder="Any specific questions?"></textarea>
                        </div>
                        <button type="submit" class="btn-primary btn-block">
                            <i class="fas fa-paper-plane"></i> Submit Application
                        </button>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.body.style.overflow = 'hidden';
    }

    closeApplyModal() {
        const modal = document.getElementById('applyModal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    }

    submitApplication(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const application = {
            universityId: this.universityId,
            universityName: this.university.name,
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            course: formData.get('course'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        console.log('Application Submitted:', application);

        this.closeApplyModal();
        this.showSuccessMessage('Application submitted successfully! We will contact you soon.');
        
        this.trackEvent('application_submitted', application);
    }

    downloadBrochure() {
        this.showDownloadProgress(`${this.university.name} Brochure`);
        this.trackEvent('brochure_downloaded', {
            university: this.university.name
        });
    }

    openGalleryModal(index) {
        // Implementation for full-screen gallery viewer
        console.log('Open gallery image:', index);
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

    showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification success';
        toast.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    showError() {
        document.body.innerHTML = `
            <div class="error-page">
                <i class="fas fa-exclamation-triangle"></i>
                <h1>University Not Found</h1>
                <p>The university you're looking for doesn't exist.</p>
                <a href="index.html" class="btn-primary">Back to Home</a>
            </div>
        `;
    }

    trackEvent(eventName, data) {
        console.log('Analytics Event:', {
            event: eventName,
            data: data,
            university: this.university.name,
            timestamp: new Date().toISOString()
        });
    }
}

// Initialize when DOM is loaded
let universityDetail;
document.addEventListener('DOMContentLoaded', () => {
    universityDetail = new UniversityDetail();
    
    // Initialize Share and Bookmark buttons
    const shareBtn = document.getElementById('shareBtn');
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    const downloadBrochureBtn = document.getElementById('downloadBrochureBtn');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const university = universityDetail.university;
            const shareHandler = new SocialShare({
                title: `${university.name} - ${university.location}`,
                text: `Check out ${university.name}! Rating: ${university.rating}⭐ | ${university.stream} | Fees: ${university.fees}`,
                url: window.location.href
            });
            shareHandler.createShareModal();
        });
    }
    
    if (bookmarkBtn) {
        const universityId = universityDetail.universityId;
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        
        if (bookmarks.includes(universityId)) {
            bookmarkBtn.classList.add('active');
            bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
        }
        
        bookmarkBtn.addEventListener('click', () => {
            const bookmarkSystem = window.bookmarkSystem || new BookmarkSystem();
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            const index = bookmarks.indexOf(universityId);
            
            if (index > -1) {
                bookmarks.splice(index, 1);
                bookmarkBtn.classList.remove('active');
                bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i> Save College';
                showToast('Removed from bookmarks', 'info');
            } else {
                bookmarks.push(universityId);
                bookmarkBtn.classList.add('active');
                bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
                showToast('Added to bookmarks', 'success');
            }
            
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        });
    }
    
    if (downloadBrochureBtn) {
        downloadBrochureBtn.addEventListener('click', () => {
            showToast('Brochure download starting...', 'success');
            // Simulate download
            setTimeout(() => {
                showToast('Brochure downloaded successfully!', 'success');
            }, 1500);
        });
    }
    
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i> <span>${message}</span>`;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
});
