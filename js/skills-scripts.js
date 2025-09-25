// Skills page specific scripts
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
                element.textContent = targetValue + (elementId === 'skillCounter' ? '+' : 
                                      elementId === 'toolCounter' ? '+' : 
                                      elementId === 'yearCounter' ? '+' : '');
            } else {
                element.textContent = Math.floor(startValue) + (elementId === 'skillCounter' ? '+' : 
                                      elementId === 'toolCounter' ? '+' : 
                                      elementId === 'yearCounter' ? '+' : '');
            }
        }, 16);
    }
    
    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.setProperty('--target-width', targetWidth);
            bar.style.width = targetWidth;
        });
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
    
    // Animate counters
    animateCounter('skillCounter', 15);
    animateCounter('toolCounter', 10);
    animateCounter('yearCounter', 2);
    
    // Animate skill bars after a short delay
    setTimeout(animateSkillBars, 500);
    
    // Animate elements on scroll
    animateOnScroll();
    
    // Add tilt effect to cards
    addTiltEffect();
});