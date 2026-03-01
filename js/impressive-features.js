// ============================================
// ZPLUSE UNIVERSITY - IMPRESSIVE FEATURES
// Collection of wow-factor features
// ============================================

// ============================================
// 1. ANIMATED STATS COUNTER
// ============================================
class AnimatedCounter {
    constructor() {
        this.observers = new Map();
    }

    animate(element, target, duration = 2000, suffix = '') {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = this.formatNumber(target) + suffix;
                clearInterval(timer);
            } else {
                element.textContent = this.formatNumber(Math.floor(start)) + suffix;
            }
        }, 16);
    }

    formatNumber(num) {
        return num.toLocaleString('en-IN');
    }

    initIntersectionObserver(elements) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    const target = parseInt(entry.target.dataset.target);
                    const suffix = entry.target.dataset.suffix || '';
                    this.animate(entry.target, target, 2000, suffix);
                    entry.target.dataset.animated = 'true';
                }
            });
        }, { threshold: 0.5 });

        elements.forEach(el => observer.observe(el));
    }
}

// ============================================
// 2. LIVE SEARCH SUGGESTIONS
// ============================================
class LiveSearch {
    constructor(inputElement, suggestionsContainer) {
        this.input = inputElement;
        this.container = suggestionsContainer;
        this.currentIndex = -1;
        this.init();
    }

    init() {
        this.input.addEventListener('input', this.debounce(this.handleInput.bind(this), 300));
        this.input.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target) && e.target !== this.input) {
                this.hideSuggestions();
            }
        });
    }

    handleInput(e) {
        const query = e.target.value.trim().toLowerCase();
        
        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }

        const suggestions = this.getSuggestions(query);
        this.displaySuggestions(suggestions, query);
    }

    getSuggestions(query) {
        // Filter universities by name or location
        const filtered = universities.filter(u => 
            u.name.toLowerCase().includes(query) || 
            u.location.toLowerCase().includes(query) ||
            u.stream.toLowerCase().includes(query)
        ).slice(0, 6);

        return filtered.map(u => ({
            id: u.id,
            name: u.name,
            location: u.location,
            stream: u.stream,
            type: 'university'
        }));
    }

    displaySuggestions(suggestions, query) {
        if (suggestions.length === 0) {
            this.container.innerHTML = `
                <div class="suggestion-item no-results">
                    <i class="fas fa-search"></i>
                    <span>No results found for "${query}"</span>
                </div>
            `;
            this.container.classList.add('show');
            return;
        }

        this.container.innerHTML = suggestions.map((item, index) => `
            <div class="suggestion-item" data-index="${index}" data-id="${item.id}">
                <i class="fas fa-university"></i>
                <div class="suggestion-content">
                    <div class="suggestion-name">${this.highlightMatch(item.name, query)}</div>
                    <div class="suggestion-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
                        <span class="suggestion-stream">${item.stream}</span>
                    </div>
                </div>
            </div>
        `).join('');

        this.container.classList.add('show');

        // Add click handlers
        this.container.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = item.dataset.id;
                window.location.href = `college-detail.html?id=${id}`;
            });
        });
    }

    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }

    hideSuggestions() {
        this.container.classList.remove('show');
        this.currentIndex = -1;
    }

    handleKeyDown(e) {
        const items = this.container.querySelectorAll('.suggestion-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.currentIndex = Math.min(this.currentIndex + 1, items.length - 1);
            this.updateSelection(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.currentIndex = Math.max(this.currentIndex - 1, 0);
            this.updateSelection(items);
        } else if (e.key === 'Enter' && this.currentIndex >= 0) {
            e.preventDefault();
            items[this.currentIndex].click();
        }
    }

    updateSelection(items) {
        items.forEach((item, index) => {
            if (index === this.currentIndex) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// ============================================
// 3. UNIVERSITY COMPARISON TOOL
// ============================================
class UniversityComparison {
    constructor() {
        this.compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
        this.maxCompare = 4;
        this.init();
    }

    init() {
        this.updateCompareBar();
        this.bindEvents();
    }

    bindEvents() {
        // Compare buttons on cards
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-compare')) {
                const btn = e.target.closest('.btn-compare');
                const id = parseInt(btn.dataset.id);
                this.toggleCompare(id, btn);
            }
        });

        // View comparison button
        const viewCompareBtn = document.getElementById('viewCompareBtn');
        if (viewCompareBtn) {
            viewCompareBtn.addEventListener('click', () => this.showComparison());
        }

        // Clear all button
        const clearCompareBtn = document.getElementById('clearCompareBtn');
        if (clearCompareBtn) {
            clearCompareBtn.addEventListener('click', () => this.clearAll());
        }
    }

    toggleCompare(id, button) {
        const index = this.compareList.indexOf(id);
        
        if (index > -1) {
            this.compareList.splice(index, 1);
            button.classList.remove('active');
            button.innerHTML = '<i class="fas fa-plus"></i> Compare';
            this.showToast('Removed from comparison', 'info');
        } else {
            if (this.compareList.length >= this.maxCompare) {
                this.showToast(`You can compare maximum ${this.maxCompare} universities`, 'warning');
                return;
            }
            this.compareList.push(id);
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-check"></i> Added';
            this.showToast('Added to comparison', 'success');
        }

        localStorage.setItem('compareList', JSON.stringify(this.compareList));
        this.updateCompareBar();
    }

    updateCompareBar() {
        const compareBar = document.getElementById('compareBar');
        const compareCount = document.getElementById('compareCount');
        
        if (!compareBar) return;

        if (this.compareList.length > 0) {
            compareBar.classList.add('show');
            compareCount.textContent = this.compareList.length;
        } else {
            compareBar.classList.remove('show');
        }

        // Update button states
        document.querySelectorAll('.btn-compare').forEach(btn => {
            const id = parseInt(btn.dataset.id);
            if (this.compareList.includes(id)) {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-check"></i> Added';
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '<i class="fas fa-plus"></i> Compare';
            }
        });
    }

    showComparison() {
        if (this.compareList.length < 2) {
            this.showToast('Please select at least 2 universities to compare', 'warning');
            return;
        }

        const compareData = this.compareList.map(id => 
            universities.find(u => u.id === id)
        ).filter(u => u);

        this.renderComparisonModal(compareData);
    }

    renderComparisonModal(universities) {
        const modal = document.createElement('div');
        modal.className = 'modal comparison-modal show';
        modal.innerHTML = `
            <div class="modal-content large">
                <button class="modal-close">&times;</button>
                <h2><i class="fas fa-balance-scale"></i> University Comparison</h2>
                
                <div class="comparison-table-wrapper">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th class="sticky-col">Features</th>
                                ${universities.map(u => `
                                    <th>
                                        <div class="compare-header">
                                            <img src="${u.heroImage}" alt="${u.name}" onerror="this.onerror=null; this.style.display='none'; this.parentElement.classList.add('img-fallback');">
                                            <h4>${u.name}</h4>
                                            <p>${u.location}</p>
                                        </div>
                                    </th>
                                `).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="sticky-col feature-label"><i class="fas fa-star"></i> Rating</td>
                                ${universities.map(u => `<td><strong>${u.rating}</strong> / 5.0</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="sticky-col feature-label"><i class="fas fa-rupee-sign"></i> Total Fees</td>
                                ${universities.map(u => `<td><strong>${u.fees}</strong></td>`).join('')}
                            </tr>
                            <tr>
                                <td class="sticky-col feature-label"><i class="fas fa-graduation-cap"></i> Stream</td>
                                ${universities.map(u => `<td>${u.stream}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="sticky-col feature-label"><i class="fas fa-briefcase"></i> Avg Package</td>
                                ${universities.map(u => `<td><strong>${u.placement?.avgPackage || 'N/A'}</strong></td>`).join('')}
                            </tr>
                            <tr>
                                <td class="sticky-col feature-label"><i class="fas fa-chart-line"></i> Highest Package</td>
                                ${universities.map(u => `<td><strong>${u.placement?.highestPackage || 'N/A'}</strong></td>`).join('')}
                            </tr>
                            <tr>
                                <td class="sticky-col feature-label"><i class="fas fa-percentage"></i> Placement Rate</td>
                                ${universities.map(u => `<td>${u.placement?.placementRate || 'N/A'}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="sticky-col feature-label"><i class="fas fa-book"></i> Notes Available</td>
                                ${universities.map(u => `<td>${u.notes?.length || 0} documents</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="sticky-col feature-label"><i class="fas fa-video"></i> Classes Available</td>
                                ${universities.map(u => `<td>${u.classes?.length || 0} videos</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="sticky-col feature-label"><i class="fas fa-comment"></i> Reviews</td>
                                ${universities.map(u => `<td>${u.reviews?.length || 0} reviews</td>`).join('')}
                            </tr>
                            <tr class="action-row">
                                <td class="sticky-col feature-label"></td>
                                ${universities.map(u => `
                                    <td>
                                        <a href="college-detail.html?id=${u.id}" class="btn btn-primary btn-small">
                                            View Details <i class="fas fa-arrow-right"></i>
                                        </a>
                                    </td>
                                `).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    clearAll() {
        this.compareList = [];
        localStorage.removeItem('compareList');
        this.updateCompareBar();
        this.showToast('Comparison list cleared', 'info');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// ============================================
// 4. DARK MODE TOGGLE
// ============================================
class DarkMode {
    constructor() {
        this.isDark = localStorage.getItem('theme') === 'dark';
        this.init();
    }

    init() {
        if (this.isDark) {
            document.body.classList.add('dark-mode');
        }

        this.createToggle();
        this.bindEvents();
    }

    createToggle() {
        const toggle = document.createElement('button');
        toggle.id = 'darkModeToggle';
        toggle.className = 'dark-mode-toggle';
        toggle.innerHTML = `<i class="fas fa-${this.isDark ? 'sun' : 'moon'}"></i>`;
        toggle.title = `Switch to ${this.isDark ? 'Light' : 'Dark'} Mode`;
        
        document.body.appendChild(toggle);
    }

    bindEvents() {
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggle());
        }
    }

    toggle() {
        this.isDark = !this.isDark;
        document.body.classList.toggle('dark-mode');
        
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
        
        const icon = document.querySelector('#darkModeToggle i');
        if (icon) {
            icon.className = `fas fa-${this.isDark ? 'sun' : 'moon'}`;
        }
        
        document.getElementById('darkModeToggle').title = 
            `Switch to ${this.isDark ? 'Light' : 'Dark'} Mode`;
    }
}

// ============================================
// 5. SKELETON LOADER
// ============================================
class SkeletonLoader {
    static createCardSkeleton(count = 6) {
        return Array(count).fill(0).map(() => `
            <div class="college-card skeleton">
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                    <div class="skeleton-text skeleton-title"></div>
                    <div class="skeleton-text skeleton-subtitle"></div>
                    <div class="skeleton-text"></div>
                    <div class="skeleton-text"></div>
                    <div class="skeleton-actions">
                        <div class="skeleton-button"></div>
                        <div class="skeleton-button"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    static show(container) {
        if (container) {
            container.innerHTML = this.createCardSkeleton();
            container.classList.add('loading');
        }
    }

    static hide(container) {
        if (container) {
            container.classList.remove('loading');
        }
    }
}

// ============================================
// 6. SOCIAL SHARING
// ============================================
class SocialShare {
    constructor(options = {}) {
        this.title = options.title || document.title;
        this.url = options.url || window.location.href;
        this.text = options.text || '';
    }

    shareWhatsApp() {
        const message = encodeURIComponent(`${this.title}\n${this.text}\n${this.url}`);
        window.open(`https://wa.me/?text=${message}`, '_blank');
    }

    shareTwitter() {
        const text = encodeURIComponent(this.title);
        const url = encodeURIComponent(this.url);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }

    shareFacebook() {
        const url = encodeURIComponent(this.url);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }

    shareLinkedIn() {
        const url = encodeURIComponent(this.url);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }

    shareTelegram() {
        const text = encodeURIComponent(`${this.title} - ${this.url}`);
        window.open(`https://t.me/share/url?url=${this.url}&text=${text}`, '_blank');
    }

    copyLink() {
        navigator.clipboard.writeText(this.url).then(() => {
            this.showToast('Link copied to clipboard!', 'success');
        });
    }

    showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    createShareModal() {
        const modal = document.createElement('div');
        modal.className = 'modal share-modal show';
        modal.innerHTML = `
            <div class="modal-content small">
                <button class="modal-close">&times;</button>
                <h3><i class="fas fa-share-alt"></i> Share This University</h3>
                <div class="share-buttons">
                    <button class="share-btn whatsapp" data-platform="whatsapp">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                    <button class="share-btn facebook" data-platform="facebook">
                        <i class="fab fa-facebook"></i> Facebook
                    </button>
                    <button class="share-btn twitter" data-platform="twitter">
                        <i class="fab fa-twitter"></i> Twitter
                    </button>
                    <button class="share-btn linkedin" data-platform="linkedin">
                        <i class="fab fa-linkedin"></i> LinkedIn
                    </button>
                    <button class="share-btn telegram" data-platform="telegram">
                        <i class="fab fa-telegram"></i> Telegram
                    </button>
                    <button class="share-btn copy" data-platform="copy">
                        <i class="fas fa-link"></i> Copy Link
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event handlers
        modal.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const platform = e.currentTarget.dataset.platform;
                this[`share${platform.charAt(0).toUpperCase() + platform.slice(1)}`]?.() || this.copyLink();
            });
        });

        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        return modal;
    }
}

// ============================================
// 7. BOOKMARK SYSTEM
// ============================================
class BookmarkSystem {
    constructor() {
        this.bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        this.init();
    }

    init() {
        this.updateBookmarkButtons();
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-bookmark')) {
                const btn = e.target.closest('.btn-bookmark');
                const id = parseInt(btn.dataset.id);
                this.toggleBookmark(id, btn);
            }
        });
    }

    toggleBookmark(id, button) {
        const index = this.bookmarks.indexOf(id);
        
        if (index > -1) {
            this.bookmarks.splice(index, 1);
            button.classList.remove('active');
            button.innerHTML = '<i class="far fa-bookmark"></i>';
            this.showToast('Removed from bookmarks', 'info');
        } else {
            this.bookmarks.push(id);
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-bookmark"></i>';
            this.showToast('Added to bookmarks', 'success');
        }

        localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    }

    updateBookmarkButtons() {
        document.querySelectorAll('.btn-bookmark').forEach(btn => {
            const id = parseInt(btn.dataset.id);
            if (this.bookmarks.includes(id)) {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-bookmark"></i>';
            }
        });
    }

    showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<i class="fas fa-info-circle"></i> <span>${message}</span>`;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
}

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Animated Stats Counter
    const counter = new AnimatedCounter();
    const statElements = document.querySelectorAll('[data-target]');
    if (statElements.length > 0) {
        counter.initIntersectionObserver(statElements);
    }

    // Live Search
    const searchInput = document.getElementById('mainSearch');
    const searchSuggestions = document.getElementById('searchSuggestions');
    if (searchInput) {
        if (!searchSuggestions) {
            const container = document.createElement('div');
            container.id = 'searchSuggestions';
            container.className = 'search-suggestions';
            searchInput.parentElement.appendChild(container);
        }
        new LiveSearch(searchInput, document.getElementById('searchSuggestions'));
    }

    // Comparison Tool
    window.comparisonTool = new UniversityComparison();

    // Dark Mode
    new DarkMode();

    // Bookmark System
    window.bookmarkSystem = new BookmarkSystem();

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    console.log('✨ All impressive features initialized!');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnimatedCounter,
        LiveSearch,
        UniversityComparison,
        DarkMode,
        SkeletonLoader,
        SocialShare,
        BookmarkSystem
    };
}
