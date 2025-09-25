// Custom JavaScript for the portfolio

// Apply theme immediately to prevent flash of incorrect theme
(function() {
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'true' || (savedTheme === null && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
})();

// Image error handling utility
function handleImageError(img, fallbackSrc = null) {
    if (fallbackSrc) {
        img.src = fallbackSrc;
    } else {
        img.style.display = 'none';
        const fallback = img.nextElementSibling;
        if (fallback && fallback.classList.contains('image-fallback')) {
            fallback.style.display = 'flex';
        }
    }
}

// Initialize theme toggle buttons
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle buttons
    const themeButtons = [
        'theme-toggle',
        'mobile-theme-toggle',
        'footer-theme-toggle'
    ];
    
    themeButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                toggleTheme();
            });
        }
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
});

// Toggle theme function
function toggleTheme() {
    const html = document.documentElement;
    const isDarkMode = html.classList.contains('dark');
    
    if (isDarkMode) {
        html.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
    } else {
        html.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
    }
    
    updateThemeIcons();
}

// Update theme icons
function updateThemeIcons() {
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

// Animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations if present
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach(bar => {
                    const width = bar.parentElement.dataset.width || '0%';
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
    document.querySelectorAll('section, .card-hover, .animate-fade-in').forEach(element => {
        observer.observe(element);
    });
});

// Certificate modal functionality
function openCertificateModal(src) {
    const modal = document.getElementById('certificateModal');
    const img = document.getElementById('certificateImage');
    if (modal && img) {
        img.src = src;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        modal.focus();
    }
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside or pressing Escape
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCertificateModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeCertificateModal();
        }
    });
});

// Counter animation
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize counters
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');
    const speed = 2000; // Animation duration in milliseconds
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                if (target) {
                    animateCounter(counter, 0, target, speed);
                }
                observer.unobserve(counter); // Stop observing after animation
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
});