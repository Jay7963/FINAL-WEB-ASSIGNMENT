// ===================================
// SHARED JAVASCRIPT FOR PORTFOLIO
// ===================================

// Theme Management System
class ThemeManager {
    constructor() {
        this.initializeTheme();
        this.setupEventListeners();
        this.setupThemeChangeListener();
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'true' || (savedTheme === null && prefersDark)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        this.updateThemeIcons();
    }

    toggleTheme() {
        const html = document.documentElement;
        const isDarkMode = html.classList.contains('dark');
        
        if (isDarkMode) {
            html.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        } else {
            html.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        }
        
        this.updateThemeIcons();
        this.dispatchThemeChangeEvent();
    }

    updateThemeIcons() {
        const isDarkMode = document.documentElement.classList.contains('dark');
        const moonIcons = document.querySelectorAll('.fa-moon');
        const sunIcons = document.querySelectorAll('.fa-sun');
        
        if (isDarkMode) {
            moonIcons.forEach(icon => icon.classList.add('hidden'));
            sunIcons.forEach(icon => icon.classList.remove('hidden'));
        } else {
            moonIcons.forEach(icon => icon.classList.remove('hidden'));
            sunIcons.forEach(icon => icon.classList.add('hidden'));
        }
    }

    dispatchThemeChangeEvent() {
        const event = new CustomEvent('themeChanged', {
            detail: { isDarkMode: document.documentElement.classList.contains('dark') }
        });
        window.dispatchEvent(event);
    }

    setupThemeChangeListener() {
        // Listen for theme changes from other tabs/windows
        window.addEventListener('storage', (e) => {
            if (e.key === 'darkMode') {
                this.initializeTheme();
            }
        });
        
        // Listen for theme changes from other pages in the same tab
        window.addEventListener('themeChanged', (e) => {
            this.initializeTheme();
        });
    }

    setupEventListeners() {
        // Set up theme toggle buttons when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const themeButtons = [
                'theme-toggle',
                'mobile-theme-toggle',
                'footer-theme-toggle'
            ];
            
            themeButtons.forEach(buttonId => {
                const button = document.getElementById(buttonId);
                if (button) {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.toggleTheme();
                    });
                }
            });
        });
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
    }

    setupMobileMenu() {
        document.addEventListener('DOMContentLoaded', () => {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });

                // Close mobile menu when clicking on a link
                const mobileLinks = mobileMenu.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.add('hidden');
                    });
                });

                // Close mobile menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                        mobileMenu.classList.add('hidden');
                    }
                });
            }
        });
    }

    setupSmoothScrolling() {
        document.addEventListener('DOMContentLoaded', () => {
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });
    }

    setupActiveNavigation() {
        // Highlight current page in navigation
        document.addEventListener('DOMContentLoaded', () => {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('nav a');
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === currentPage || 
                    (currentPage === 'index.html' && href === 'index.html') ||
                    (currentPage === '' && href === 'index.html')) {
                    link.classList.add('text-blue-600', 'dark:text-blue-400');
                }
            });
        });
    }
}

// Animation and Intersection Observer
class AnimationManager {
    constructor() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    
                    // Trigger skill bar animations if present
                    const skillBars = entry.target.querySelectorAll('.skill-bar');
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width') || '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all sections and cards
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('section, .card-hover').forEach(element => {
                observer.observe(element);
            });
        });
    }

    setupScrollAnimations() {
        let ticking = false;
        
        function updateScrollAnimations() {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelectorAll('.parallax');
            
            parallax.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        });
    }
}

// Form Validation and Handling
class FormManager {
    constructor() {
        this.setupFormValidation();
    }

    setupFormValidation() {
        document.addEventListener('DOMContentLoaded', () => {
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
                
                // Real-time validation
                const inputs = contactForm.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.addEventListener('blur', () => this.validateField(input));
                    input.addEventListener('input', () => this.clearFieldError(input));
                });
            }
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        this.clearFieldError(field);

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    isValid = false;
                    errorMessage = 'Email is required';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            
            case 'text':
                if (!value) {
                    isValid = false;
                    errorMessage = 'This field is required';
                }
                break;
            
            default:
                if (field.tagName.toLowerCase() === 'textarea') {
                    if (!value) {
                        isValid = false;
                        errorMessage = 'Message is required';
                    } else if (value.length < 10) {
                        isValid = false;
                        errorMessage = 'Please enter a more detailed message (at least 10 characters)';
                    }
                }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('border-red-500', 'focus:ring-red-500');
        field.classList.remove('border-gray-300', 'focus:ring-blue-500');
        
        // Create or update error message
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('p');
            errorElement.className = 'field-error text-red-500 text-sm mt-1';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('border-red-500', 'focus:ring-red-500');
        field.classList.add('border-gray-300', 'focus:ring-blue-500');
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        let isFormValid = true;

        // Validate all fields
        const fields = form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm(formData, form);
        } else {
            this.showNotification('Please correct the errors above', 'error');
        }
    }

    async submitForm(formData, form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitButton.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            form.reset();
        } catch (error) {
            this.showNotification('There was an error sending your message. Please try again.', 'error');
        } finally {
            // Restore button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check' : 'fa-exclamation-triangle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Modal Management
class ModalManager {
    constructor() {
        this.setupModals();
    }

    setupModals() {
        document.addEventListener('DOMContentLoaded', () => {
            // Certificate modal functionality
            window.openCertificateModal = (src) => {
                const modal = document.getElementById('certificateModal');
                const img = document.getElementById('certificateImage');
                if (modal && img) {
                    img.src = src;
                    modal.classList.remove('hidden');
                    modal.classList.add('flex');
                    document.body.style.overflow = 'hidden';
                    modal.focus();
                }
            };

            window.closeCertificateModal = () => {
                const modal = document.getElementById('certificateModal');
                if (modal) {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                    document.body.style.overflow = '';
                }
            };

            // Modal event listeners
            const modal = document.getElementById('certificateModal');
            if (modal) {
                // Close modal when clicking outside
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        window.closeCertificateModal();
                    }
                });

                // Close modal with Escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                        window.closeCertificateModal();
                    }
                });
            }
        });
    }
}

// Utility Functions
class Utils {
    static formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }

    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }
}

// Initialize all managers when the script loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    const themeManager = new ThemeManager();
    const navigationManager = new NavigationManager();
    const animationManager = new AnimationManager();
    const formManager = new FormManager();
    const modalManager = new ModalManager();

    // Make managers globally available if needed
    window.portfolioManagers = {
        theme: themeManager,
        navigation: navigationManager,
        animation: animationManager,
        form: formManager,
        modal: modalManager,
        utils: Utils
    };

    console.log('Portfolio JavaScript initialized successfully!');
});

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        NavigationManager,
        AnimationManager,
        FormManager,
        ModalManager,
        Utils
    };
}