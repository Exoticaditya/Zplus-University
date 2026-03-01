// Authentication System for ZPluse Education
// Frontend-only version (no backend required)

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.useFrontendAuth = true; // Work without backend
        this.init();
    }

    init() {
        // Initialize demo users
        this.initDemoUsers();
        
        // Check if user is already logged in
        this.loadUserFromStorage();
        this.updateUI();
        this.bindEvents();
    }

    bindEvents() {
        // Login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Signup form submission
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        // Toggle between login and signup
        const showSignup = document.getElementById('showSignup');
        const showLogin = document.getElementById('showLogin');
        
        if (showSignup) {
            showSignup.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSignupForm();
            });
        }

        if (showLogin) {
            showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginForm();
            });
        }

        // Auth button click (Login/Profile)
        const authButton = document.getElementById('authButton');
        if (authButton) {
            authButton.addEventListener('click', () => {
                if (this.currentUser) {
                    // Already logged in, do nothing (dropdown will handle)
                } else {
                    // Show demo login info
                    alert('Demo Mode: Click OK to auto-login\n\nEmail: demo@zplus.com\nPassword: password123');
                    this.demoLogin();
                }
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Profile dropdown toggle
        const profileIcon = document.getElementById('profileIcon');
        if (profileIcon) {
            profileIcon.addEventListener('click', () => {
                const dropdown = document.querySelector('.dropdown-content');
                if (dropdown) {
                    dropdown.classList.toggle('show');
                }
            });
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail')?.value;
        const password = document.getElementById('loginPassword')?.value;
        const rememberMe = document.getElementById('rememberMe')?.checked;

        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            this.showError('Password must be at least 6 characters');
            return;
        }

        // Frontend-only authentication (demo mode)
        // In production, this would connect to a real backend
        try {
            // Get users from localStorage (registered users)
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            
            // Check if user exists and password matches
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Successful login
                this.currentUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role || 'student'
                };

                // Store in localStorage or sessionStorage
                const storage = rememberMe ? localStorage : sessionStorage;
                storage.setItem('currentUser', JSON.stringify(this.currentUser));

                this.showSuccess('Login successful! Redirecting...');
                
                // Redirect to homepage after 1 second
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                this.showError('Invalid email or password. Try: demo@example.com / password123');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showError('An error occurred. Please try again.');
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName')?.value;
        const email = document.getElementById('signupEmail')?.value;
        const phone = document.getElementById('signupPhone')?.value;
        const password = document.getElementById('signupPassword')?.value;
        const confirmPassword = document.getElementById('confirmPassword')?.value;
        const userType = document.getElementById('userType')?.value;
        const agreeTerms = document.getElementById('agreeTerms')?.checked;

        // Validation
        if (!name?.trim()) {
            this.showError('Please enter your full name');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        if (phone && !this.validatePhone(phone)) {
            this.showError('Please enter a valid phone number');
            return;
        }

        if (password.length < 6) {
            this.showError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            this.showError('Passwords do not match');
            return;
        }

        if (!userType) {
            this.showError('Please select user type');
            return;
        }

        if (!agreeTerms) {
            this.showError('Please agree to the Terms & Conditions');
            return;
        }

        try {
            // Frontend-only registration (demo mode)
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            
            // Check if email already exists
            if (users.find(u => u.email === email)) {
                this.showError('Email already registered. Please login.');
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name: name,
                email: email,
                phone: phone,
                password: password, // In production, this should be hashed
                role: userType || 'student'
            };

            users.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(users));

            this.showSuccess('Account created successfully! Please login.');
            
            // Switch to login form after successful signup
            setTimeout(() => {
                this.showLoginForm();
            }, 1500);
        } catch (error) {
            console.error('Signup error:', error);
            this.showError('An error occurred. Please try again.');
        }
    }

    showLoginForm() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        
        if (loginForm && signupForm) {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        }
    }

    showSignupForm() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        
        if (loginForm && signupForm) {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        
        this.showSuccess('Logged out successfully');
        
        // Redirect to homepage
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }

    updateUI() {
        const authButton = document.getElementById('authButton');
        const profileDropdown = document.getElementById('profileDropdown');

        if (this.currentUser) {
            // User is logged in
            if (authButton) {
                authButton.style.display = 'none';
            }
            if (profileDropdown) {
                profileDropdown.style.display = 'block';
            }

            // Update profile info
            const userName = document.getElementById('userName');
            const userEmail = document.getElementById('userEmail');
            const userType = document.getElementById('userType');

            if (userName) userName.textContent = this.currentUser.name;
            if (userEmail) userEmail.textContent = this.currentUser.email;
            if (userType) userType.textContent = this.capitalizeFirst(this.currentUser.userType);

        } else {
            // User is not logged in
            if (authButton) {
                authButton.style.display = 'flex';
            }
            if (profileDropdown) {
                profileDropdown.style.display = 'none';
            }
        }
    }

    loadUserFromStorage() {
        // Check localStorage first (remember me), then sessionStorage
        const storedUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
        
        if (storedUser) {
            try {
                this.currentUser = JSON.parse(storedUser);
            } catch (e) {
                console.error('Error parsing user data:', e);
                this.clearStoredUser();
            }
        }
    }

    clearStoredUser() {
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        this.currentUser = null;
    }

    getStoredUsers() {
        const users = localStorage.getItem('registeredUsers');
        return users ? JSON.parse(users) : [];
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageEl = document.createElement('div');
        messageEl.className = `auth-message ${type}`;
        messageEl.textContent = message;
        
        // Style the message
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            ${type === 'error' ? 'background-color: #e74c3c;' : 'background-color: #27ae60;'}
        `;

        document.body.appendChild(messageEl);

        // Remove message after 4 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => {
                    if (messageEl.parentNode) {
                        messageEl.remove();
                    }
                }, 300);
            }
        }, 4000);
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Update user profile
    updateProfile(userData) {
        if (!this.currentUser) return false;

        // Update current user
        Object.assign(this.currentUser, userData);

        // Update in storage
        const storageKey = localStorage.getItem('currentUser') ? 'localStorage' : 'sessionStorage';
        if (storageKey === 'localStorage') {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }

        // Update in registered users
        const users = this.getStoredUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            Object.assign(users[userIndex], userData);
            localStorage.setItem('registeredUsers', JSON.stringify(users));
        }

        this.updateUI();
        return true;
    }

    // Demo login for testing without registration
    demoLogin() {
        this.currentUser = {
            id: 'demo-user-001',
            name: 'Demo User',
            email: 'demo@zplus.com',
            role: 'student'
        };

        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.showSuccess('Logged in as Demo User!');
        
        setTimeout(() => {
            this.updateUI();
        }, 500);
    }

    // Initialize demo users in localStorage
    initDemoUsers() {
        const users = this.getStoredUsers();
        if (users.length === 0) {
            const demoUsers = [
                {
                    id: 'demo-001',
                    name: 'Demo Student',
                    email: 'demo@zplus.com',
                    password: 'password123',
                    role: 'student'
                },
                {
                    id: 'demo-002',
                    name: 'Test User',
                    email: 'test@zplus.com',
                    password: 'test123',
                    role: 'student'
                }
            ];
            localStorage.setItem('registeredUsers', JSON.stringify(demoUsers));
        }
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .dropdown-content.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize auth system when DOM is loaded
let authSystem;

document.addEventListener('DOMContentLoaded', function() {
    authSystem = new AuthSystem();
});

// Make authSystem globally available
window.authSystem = authSystem;