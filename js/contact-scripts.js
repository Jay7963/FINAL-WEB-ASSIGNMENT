// Contact page specific scripts
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    // Add fade-in animation to elements when they come into view
    const fadeElements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
    
    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', () => {
            const isOpen = !answer.classList.contains('hidden');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.add('hidden');
                    otherItem.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            if (isOpen) {
                answer.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
            } else {
                answer.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
    
    // Form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            const errorMessages = contactForm.querySelectorAll('.error-message');
            errorMessages.forEach(msg => {
                msg.classList.add('hidden');
                msg.textContent = '';
            });
            
            // Validate form
            const formData = new FormData(contactForm);
            let isValid = true;
            
            // Required field validation
            const requiredFields = ['firstName', 'lastName', 'email', 'projectType', 'message'];
            requiredFields.forEach(field => {
                const value = formData.get(field);
                if (!value || value.trim() === '') {
                    showError(field, 'This field is required');
                    isValid = false;
                }
            });
            
            // Email validation
            const email = formData.get('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Privacy checkbox validation
            const privacy = formData.get('privacy');
            if (!privacy) {
                showMessage('Please accept the privacy policy to continue.', 'error');
                isValid = false;
            }
            
            if (isValid) {
                submitForm(formData);
            }
        });
    }
    
    function showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }
        field.classList.add('border-red-500');
        
        // Remove error styling on input
        field.addEventListener('input', function() {
            field.classList.remove('border-red-500');
            errorElement.classList.add('hidden');
        }, { once: true });
    }
    
    function showMessage(message, type) {
        if (formMessage) {
            formMessage.className = `p-4 rounded-lg ${type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`;
            formMessage.textContent = message;
            formMessage.classList.remove('hidden');
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        }
    }
    
    function submitForm(formData) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');
        const loadingText = submitButton.querySelector('.loading-text');
        
        // Show loading state
        buttonText.classList.add('hidden');
        loadingText.classList.remove('hidden');
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual form submission logic)
        setTimeout(() => {
            // Reset button state
            buttonText.classList.remove('hidden');
            loadingText.classList.add('hidden');
            submitButton.disabled = false;
            
            // Show success message
            showMessage('Thank you for your message! I\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
        }, 2000);
    }
    
    // Add subtle animation to contact method icons
    const contactIcons = document.querySelectorAll('.contact-method .flex-shrink-0 div');
    contactIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotate(12deg)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotate(0deg)';
        });
    });
});