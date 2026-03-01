// ZPLUS EDUCATION - PREMIUM ANIMATIONS & EFFECTS

// Smooth Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-item h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const suffix = stat.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString() + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString() + suffix;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// Enhanced Preloader with Auto-hide
function handlePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                // Trigger stats animation after preloader
                setTimeout(() => {
                    animateStats();
                }, 300);
            }, 800);
        });
    }
}

// Parallax Scroll Effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Smooth Reveal Animation for Sections
function initScrollReveal() {
    const sections = document.querySelectorAll('.features-section, .about-section, .contact-section, #colleges');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Typing Effect for Hero Text
function typingEffect() {
    const heroText = document.querySelector('.hero-text h1');
    if (!heroText) return;
    
    const text = heroText.textContent;
    heroText.textContent = '';
    heroText.style.opacity = '1';
    
    let index = 0;
    const speed = 50; // ms per character
    
    function type() {
        if (index < text.length) {
            heroText.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    // Start after small delay
    setTimeout(type, 1000);
}

// Magnetic Button Effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// 3D Tilt Effect on College Cards
function init3DTilt() {
    const cards = document.querySelectorAll('.college-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// Smooth Cursor Glow Effect
function initCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Expand on hover over interactive elements
    const interactive = document.querySelectorAll('a, button, .college-card');
    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
        });
    });
}

// Floating Animation for Hero Stats
function floatingAnimation() {
    const stats = document.querySelectorAll('.hero-stats .stat-item');
    
    stats.forEach((stat, index) => {
        const delay = index * 0.3;
        stat.style.animation = `floatUpDown 3s ease-in-out ${delay}s infinite`;
    });
}

// Add floating keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUpDown {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    @keyframes shimmer {
        0% {
            background-position: -1000px 0;
        }
        100% {
            background-position: 1000px 0;
        }
    }
    
    .shimmer-effect {
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
    }
`;
document.head.appendChild(style);

// Gradient Animation for Hero Background
function animateGradient() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        hero.style.background = `linear-gradient(135deg, 
            hsl(${hue}, 70%, 60%) 0%, 
            hsl(${(hue + 30) % 360}, 70%, 50%) 50%, 
            hsl(${(hue + 60) % 360}, 70%, 60%) 100%)`;
    }, 50);
}

// Image Lazy Loading with Fade-in
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.style.opacity = '0';
                img.onload = () => {
                    img.style.transition = 'opacity 0.5s';
                    img.style.opacity = '1';
                };
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    handlePreloader();
    initScrollReveal();
    initMagneticButtons();
    floatingAnimation();
    lazyLoadImages();
    
    // Add 3D tilt after cards are loaded
    setTimeout(() => {
        init3DTilt();
    }, 1000);
    
    // Optional: Enable cursor glow (disabled by default for performance)
    // initCursorGlow();
    
    // Optional: Enable gradient animation (disabled by default for performance)
    // animateGradient();
});
