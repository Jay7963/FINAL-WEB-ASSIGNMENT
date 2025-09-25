// About page specific scripts
document.addEventListener('DOMContentLoaded', function() {
    // Animate counters
    function animateCounter(elementId, targetValue, duration = 2000) {
        const element = document.getElementById(elementId);
        let startValue = 0;
        const increment = targetValue / (duration / 16);
        
        const timer = setInterval(() => {
            startValue += increment;
            if (startValue >= targetValue) {
                clearInterval(timer);
                element.textContent = targetValue + (elementId === 'eduCounter' ? '' : 
                                      elementId === 'certCounter' ? '' : '');
            } else {
                element.textContent = Math.floor(startValue) + (elementId === 'eduCounter' ? '' : 
                                      elementId === 'certCounter' ? '' : '');
            }
        }, 16);
    }
    
    // Fade in elements on scroll
    function animateOnScroll() {
        const fadeElements = document.querySelectorAll('.animate-fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Add tilt effect to cards
    function addTiltEffect() {
        const cards = document.querySelectorAll('.tilt-effect');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                const rotateY = mouseX / 20;
                const rotateX = -mouseY / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px) scale(1.02)';
            });
        });
    }
    
    // Initialize everything when DOM is loaded
    // Animate counters
    animateCounter('eduCounter', 3);
    animateCounter('certCounter', 1);
    
    // Animate elements on scroll
    animateOnScroll();
    
    // Add tilt effect to cards
    addTiltEffect();
});