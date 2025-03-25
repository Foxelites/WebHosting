let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Handle logo click for smooth scrolling
document.querySelector('.logo a').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll arrow functionality
const scrollArrow = document.getElementById('scrollArrow');
const sections = ['hero', 'packages', 'about', 'contact'];
let currentSectionIndex = 0;

// Show arrow when reaching packages section
window.addEventListener('scroll', function() {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
        const packagesTop = packagesSection.getBoundingClientRect().top;
        if (packagesTop <= window.innerHeight / 2) {
            scrollArrow.classList.add('visible');
        } else {
            scrollArrow.classList.remove('visible');
        }
    }
});

// Handle arrow click
scrollArrow.addEventListener('click', function() {
    currentSectionIndex = (currentSectionIndex + 1) % sections.length;
    const nextSection = document.getElementById(sections[currentSectionIndex]);
    
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
}); 