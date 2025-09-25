// Tailwind CSS Configuration

// Apply theme immediately to prevent flash of incorrect theme
(function() {
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'true' || (savedTheme === null && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
})();

// Configure Tailwind CSS for dark mode
const tailwindConfig = {
    darkMode: 'class',
};

// Extended configuration for projects page
const tailwindConfigExtended = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#3b82f6',
                secondary: '#8b5cf6'
            }
        }
    }
};

// Apply Tailwind configuration based on the page
document.addEventListener('DOMContentLoaded', function() {
    // Check if Tailwind is loaded
    if (typeof tailwind !== 'undefined') {
        const currentPage = window.location.pathname.split('/').pop();
        
        if (currentPage === 'projects.html') {
            tailwind.config = tailwindConfigExtended;
        } else if (currentPage === 'skills.html') {
            tailwind.config = { darkMode: 'class' };
        } else if (currentPage === 'about.html') {
            tailwind.config = { darkMode: 'class' };
        } else if (currentPage === 'contact.html') {
            tailwind.config = tailwindConfigExtended;
        } else {
            // Default configuration for index.html and other pages
            tailwind.config = tailwindConfig;
        }
    }
});