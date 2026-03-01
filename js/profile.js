// Profile Page JavaScript

class ProfilePage {
    constructor() {
        this.currentUser = null;
        this.activeTab = 'profile';
        this.init();
    }

    init() {
        // Check if user is logged in
        if (!authSystem.isLoggedIn()) {
            window.location.href = 'login.html';
            return;
        }

        this.currentUser = authSystem.getCurrentUser();
        this.setupNavigation();
        this.populateUserData();
        this.bindEvents();
        this.loadUserApplications();
        this.loadSavedColleges();
        this.setupNotifications();
    }

    setupNavigation() {
        // Update navigation to show profile state
        const navUser = document.querySelector('.nav-user');
        if (navUser) {
            navUser.innerHTML = `
                <div class="user-menu">
                    <div class="user-info">
                        <div class="user-avatar">${this.currentUser.name.charAt(0)}</div>
                        <span class="user-name">${this.currentUser.name}</span>
                    </div>
                    <div class="user-dropdown">
                        <a href="profile.html"><i class="fas fa-user"></i> Profile</a>
                        <a href="#" onclick="authSystem.logout()"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>
                </div>
            `;
        }
    }

    populateUserData() {
        // Profile tab
        document.getElementById('userName').textContent = this.currentUser.name;
        document.getElementById('userEmail').textContent = this.currentUser.email;
        document.getElementById('userJoined').textContent = this.formatDate(this.currentUser.joinDate);

        // Profile form
        document.getElementById('profileName').value = this.currentUser.name || '';
        document.getElementById('profileEmail').value = this.currentUser.email || '';
        document.getElementById('profilePhone').value = this.currentUser.phone || '';
        document.getElementById('profileLocation').value = this.currentUser.location || '';
        document.getElementById('profileBio').value = this.currentUser.bio || '';

        // Personal info
        document.getElementById('personalDateOfBirth').value = this.currentUser.dateOfBirth || '';
        document.getElementById('personalGender').value = this.currentUser.gender || '';
        document.getElementById('personalAddress').value = this.currentUser.address || '';
        document.getElementById('personalCity').value = this.currentUser.city || '';
        document.getElementById('personalState').value = this.currentUser.state || '';
        document.getElementById('personalZip').value = this.currentUser.zip || '';

        // Education info
        document.getElementById('educationLevel').value = this.currentUser.educationLevel || '';
        document.getElementById('educationInstitution').value = this.currentUser.institution || '';
        document.getElementById('educationGrade').value = this.currentUser.grade || '';
        document.getElementById('educationYear').value = this.currentUser.graduationYear || '';
        document.getElementById('educationStream').value = this.currentUser.stream || '';

        // Preferences
        document.getElementById('prefLocation').value = this.currentUser.preferredLocation || '';
        document.getElementById('prefCourse').value = this.currentUser.preferredCourse || '';
        document.getElementById('prefBudget').value = this.currentUser.budgetRange || '';
        document.getElementById('prefAccommodation').value = this.currentUser.accommodationPreference || '';

        // Settings
        document.getElementById('notificationEmail').checked = this.currentUser.emailNotifications !== false;
        document.getElementById('notificationSms').checked = this.currentUser.smsNotifications !== false;
        document.getElementById('notificationPush').checked = this.currentUser.pushNotifications !== false;
        document.getElementById('privacyProfile').checked = this.currentUser.publicProfile !== false;
        document.getElementById('privacyContact').checked = this.currentUser.allowContact !== false;

        // Update user avatar
        const userAvatar = document.querySelector('.user-avatar-large');
        if (userAvatar) {
            userAvatar.textContent = this.currentUser.name.charAt(0).toUpperCase();
        }
    }

    loadUserApplications() {
        // Get user applications from localStorage or create empty array
        const applications = JSON.parse(localStorage.getItem(`applications_${this.currentUser.email}`)) || [];
        
        const applicationsContainer = document.getElementById('applicationsContainer');
        if (applicationsContainer) {
            if (applications.length === 0) {
                applicationsContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-file-alt"></i>
                        <h3>No Applications Yet</h3>
                        <p>You haven't applied to any colleges yet.</p>
                        <a href="index.html" class="btn-primary">Browse Colleges</a>
                    </div>
                `;
            } else {
                applicationsContainer.innerHTML = applications.map(app => `
                    <div class="application-item">
                        <div class="application-header">
                            <div class="application-college">
                                <h4>${app.collegeName}</h4>
                                <p>${app.course}</p>
                            </div>
                            <div class="application-status status-${app.status}">
                                ${this.getStatusIcon(app.status)} ${app.status}
                            </div>
                        </div>
                        <div class="application-details">
                            <div class="detail-item">
                                <span class="label">Applied Date:</span>
                                <span class="value">${this.formatDate(app.appliedDate)}</span>
                            </div>
                            <div class="detail-item">
                                <span class="label">Application ID:</span>
                                <span class="value">${app.applicationId}</span>
                            </div>
                            ${app.interviewDate ? `
                                <div class="detail-item">
                                    <span class="label">Interview Date:</span>
                                    <span class="value">${this.formatDate(app.interviewDate)}</span>
                                </div>
                            ` : ''}
                        </div>
                        <div class="application-actions">
                            <button class="btn-secondary" onclick="profilePage.viewApplication('${app.applicationId}')">
                                <i class="fas fa-eye"></i> View Details
                            </button>
                            ${app.status === 'pending' ? `
                                <button class="btn-outline" onclick="profilePage.withdrawApplication('${app.applicationId}')">
                                    <i class="fas fa-times"></i> Withdraw
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `).join('');
            }
        }

        // Update stats
        const totalApplications = document.getElementById('totalApplications');
        const pendingApplications = document.getElementById('pendingApplications');
        const acceptedApplications = document.getElementById('acceptedApplications');

        if (totalApplications) totalApplications.textContent = applications.length;
        if (pendingApplications) pendingApplications.textContent = applications.filter(app => app.status === 'pending').length;
        if (acceptedApplications) acceptedApplications.textContent = applications.filter(app => app.status === 'accepted').length;
    }

    loadSavedColleges() {
        // Get saved colleges from localStorage
        const savedColleges = JSON.parse(localStorage.getItem(`saved_colleges_${this.currentUser.email}`)) || [];
        
        const savedContainer = document.getElementById('savedCollegesContainer');
        if (savedContainer) {
            if (savedColleges.length === 0) {
                savedContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-heart"></i>
                        <h3>No Saved Colleges</h3>
                        <p>Save colleges that interest you to access them quickly later.</p>
                        <a href="index.html" class="btn-primary">Browse Colleges</a>
                    </div>
                `;
            } else {
                savedContainer.innerHTML = savedColleges.map(college => `
                    <div class="saved-college-item">
                        <div class="college-image">
                            <i class="fas fa-university"></i>
                        </div>
                        <div class="college-info">
                            <h4>${college.name}</h4>
                            <p><i class="fas fa-map-marker-alt"></i> ${college.location}</p>
                            <div class="college-meta">
                                <span class="rating">
                                    <i class="fas fa-star"></i> ${college.rating}
                                </span>
                                <span class="fees">${college.fees}</span>
                            </div>
                        </div>
                        <div class="college-actions">
                            <button class="btn-primary" onclick="profilePage.viewCollege(${college.id})">
                                <i class="fas fa-eye"></i> View Details
                            </button>
                            <button class="btn-outline" onclick="profilePage.removeSavedCollege(${college.id})">
                                <i class="fas fa-heart-broken"></i> Remove
                            </button>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    setupNotifications() {
        // Load user notifications
        const notifications = this.getUserNotifications();
        
        const notificationsContainer = document.getElementById('notificationsContainer');
        if (notificationsContainer) {
            if (notifications.length === 0) {
                notificationsContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-bell"></i>
                        <h3>No Notifications</h3>
                        <p>You're all caught up! New notifications will appear here.</p>
                    </div>
                `;
            } else {
                notificationsContainer.innerHTML = notifications.map(notification => `
                    <div class="notification-item ${notification.read ? '' : 'unread'}">
                        <div class="notification-icon">
                            <i class="${notification.icon}"></i>
                        </div>
                        <div class="notification-content">
                            <h4>${notification.title}</h4>
                            <p>${notification.message}</p>
                            <small>${this.formatDate(notification.date)}</small>
                        </div>
                        <div class="notification-actions">
                            ${!notification.read ? `
                                <button class="btn-link" onclick="profilePage.markAsRead('${notification.id}')">
                                    Mark as Read
                                </button>
                            ` : ''}
                            <button class="btn-link" onclick="profilePage.deleteNotification('${notification.id}')">
                                Delete
                            </button>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    bindEvents() {
        // Tab navigation
        const tabItems = document.querySelectorAll('.profile-tab');
        tabItems.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab.dataset.tab);
            });
        });

        // Form submissions
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                this.handleProfileUpdate(e);
            });
        }

        const personalInfoForm = document.getElementById('personalInfoForm');
        if (personalInfoForm) {
            personalInfoForm.addEventListener('submit', (e) => {
                this.handlePersonalInfoUpdate(e);
            });
        }

        const educationForm = document.getElementById('educationForm');
        if (educationForm) {
            educationForm.addEventListener('submit', (e) => {
                this.handleEducationUpdate(e);
            });
        }

        const preferencesForm = document.getElementById('preferencesForm');
        if (preferencesForm) {
            preferencesForm.addEventListener('submit', (e) => {
                this.handlePreferencesUpdate(e);
            });
        }

        const settingsForm = document.getElementById('settingsForm');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                this.handleSettingsUpdate(e);
            });
        }

        // Password change form
        const passwordForm = document.getElementById('passwordForm');
        if (passwordForm) {
            passwordForm.addEventListener('submit', (e) => {
                this.handlePasswordChange(e);
            });
        }

        // Profile picture upload
        const profilePictureInput = document.getElementById('profilePicture');
        if (profilePictureInput) {
            profilePictureInput.addEventListener('change', (e) => {
                this.handleProfilePictureUpload(e);
            });
        }

        // Account deletion
        const deleteAccountBtn = document.getElementById('deleteAccountBtn');
        if (deleteAccountBtn) {
            deleteAccountBtn.addEventListener('click', () => {
                this.handleAccountDeletion();
            });
        }
    }

    switchTab(tabName) {
        this.activeTab = tabName;

        // Update tab buttons
        document.querySelectorAll('.profile-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');
    }

    handleProfileUpdate(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const updatedData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            location: formData.get('location'),
            bio: formData.get('bio')
        };

        // Update user data
        Object.assign(this.currentUser, updatedData);
        authSystem.updateUser(this.currentUser);

        // Update display
        this.populateUserData();
        this.setupNavigation();
        
        authSystem.showSuccess('Profile updated successfully!');
    }

    handlePersonalInfoUpdate(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const personalData = {
            dateOfBirth: formData.get('dateOfBirth'),
            gender: formData.get('gender'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip')
        };

        Object.assign(this.currentUser, personalData);
        authSystem.updateUser(this.currentUser);
        
        authSystem.showSuccess('Personal information updated successfully!');
    }

    handleEducationUpdate(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const educationData = {
            educationLevel: formData.get('educationLevel'),
            institution: formData.get('institution'),
            grade: formData.get('grade'),
            graduationYear: formData.get('graduationYear'),
            stream: formData.get('stream')
        };

        Object.assign(this.currentUser, educationData);
        authSystem.updateUser(this.currentUser);
        
        authSystem.showSuccess('Education information updated successfully!');
    }

    handlePreferencesUpdate(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const preferencesData = {
            preferredLocation: formData.get('prefLocation'),
            preferredCourse: formData.get('prefCourse'),
            budgetRange: formData.get('prefBudget'),
            accommodationPreference: formData.get('prefAccommodation')
        };

        Object.assign(this.currentUser, preferencesData);
        authSystem.updateUser(this.currentUser);
        
        authSystem.showSuccess('Preferences updated successfully!');
    }

    handleSettingsUpdate(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const settingsData = {
            emailNotifications: formData.has('emailNotifications'),
            smsNotifications: formData.has('smsNotifications'),
            pushNotifications: formData.has('pushNotifications'),
            publicProfile: formData.has('publicProfile'),
            allowContact: formData.has('allowContact')
        };

        Object.assign(this.currentUser, settingsData);
        authSystem.updateUser(this.currentUser);
        
        authSystem.showSuccess('Settings updated successfully!');
    }

    handlePasswordChange(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const currentPassword = formData.get('currentPassword');
        const newPassword = formData.get('newPassword');
        const confirmPassword = formData.get('confirmPassword');

        if (currentPassword !== this.currentUser.password) {
            authSystem.showError('Current password is incorrect');
            return;
        }

        if (newPassword !== confirmPassword) {
            authSystem.showError('New passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            authSystem.showError('Password must be at least 6 characters long');
            return;
        }

        this.currentUser.password = newPassword;
        authSystem.updateUser(this.currentUser);
        
        authSystem.showSuccess('Password changed successfully!');
        e.target.reset();
    }

    handleProfilePictureUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            authSystem.showError('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            authSystem.showError('Image size should be less than 5MB');
            return;
        }

        // In a real app, you would upload the file to a server
        // For now, we'll just simulate it
        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentUser.profilePicture = e.target.result;
            authSystem.updateUser(this.currentUser);
            
            // Update avatar display
            const userAvatar = document.querySelector('.user-avatar-large');
            if (userAvatar) {
                userAvatar.style.backgroundImage = `url(${e.target.result})`;
                userAvatar.style.backgroundSize = 'cover';
                userAvatar.style.backgroundPosition = 'center';
                userAvatar.textContent = '';
            }
            
            authSystem.showSuccess('Profile picture updated successfully!');
        };
        reader.readAsDataURL(file);
    }

    handleAccountDeletion() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
                // Delete user data
                authSystem.deleteAccount();
                
                // Redirect to home page
                window.location.href = 'index.html';
            }
        }
    }

    getUserNotifications() {
        // Get notifications from localStorage or create sample ones
        const notifications = JSON.parse(localStorage.getItem(`notifications_${this.currentUser.email}`)) || [
            {
                id: '1',
                title: 'Welcome to ZPluse Education!',
                message: 'Thank you for joining us. Explore colleges and find your perfect match.',
                icon: 'fas fa-heart',
                date: new Date().toISOString().split('T')[0],
                read: false
            },
            {
                id: '2',
                title: 'Profile Completion',
                message: 'Complete your profile to get personalized college recommendations.',
                icon: 'fas fa-user',
                date: new Date().toISOString().split('T')[0],
                read: false
            }
        ];

        return notifications.reverse(); // Show newest first
    }

    getStatusIcon(status) {
        switch (status) {
            case 'pending': return '<i class="fas fa-clock"></i>';
            case 'accepted': return '<i class="fas fa-check-circle"></i>';
            case 'rejected': return '<i class="fas fa-times-circle"></i>';
            case 'interview': return '<i class="fas fa-calendar"></i>';
            default: return '<i class="fas fa-file"></i>';
        }
    }

    viewApplication(applicationId) {
        // In a real app, this would open application details modal
        authSystem.showSuccess(`Viewing application ${applicationId}`);
    }

    withdrawApplication(applicationId) {
        if (confirm('Are you sure you want to withdraw this application?')) {
            const applications = JSON.parse(localStorage.getItem(`applications_${this.currentUser.email}`)) || [];
            const updatedApplications = applications.filter(app => app.applicationId !== applicationId);
            localStorage.setItem(`applications_${this.currentUser.email}`, JSON.stringify(updatedApplications));
            
            this.loadUserApplications();
            authSystem.showSuccess('Application withdrawn successfully');
        }
    }

    viewCollege(collegeId) {
        window.location.href = `college-detail.html?id=${collegeId}`;
    }

    removeSavedCollege(collegeId) {
        const savedColleges = JSON.parse(localStorage.getItem(`saved_colleges_${this.currentUser.email}`)) || [];
        const updatedSaved = savedColleges.filter(college => college.id !== collegeId);
        localStorage.setItem(`saved_colleges_${this.currentUser.email}`, JSON.stringify(updatedSaved));
        
        this.loadSavedColleges();
        authSystem.showSuccess('College removed from saved list');
    }

    markAsRead(notificationId) {
        const notifications = this.getUserNotifications();
        const notification = notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            localStorage.setItem(`notifications_${this.currentUser.email}`, JSON.stringify(notifications));
            this.setupNotifications();
        }
    }

    deleteNotification(notificationId) {
        const notifications = this.getUserNotifications();
        const updatedNotifications = notifications.filter(n => n.id !== notificationId);
        localStorage.setItem(`notifications_${this.currentUser.email}`, JSON.stringify(updatedNotifications));
        this.setupNotifications();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
}

// Initialize profile page
let profilePage;

document.addEventListener('DOMContentLoaded', function() {
    profilePage = new ProfilePage();
});

// Make profilePage globally available
window.profilePage = profilePage;