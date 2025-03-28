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

// Handle Learn More button click
document.querySelector('.hero button').addEventListener('click', function(e) {
    e.preventDefault();
    const plansSection = document.querySelector('.plans');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const plansTitle = plansSection.querySelector('h2');
    
    if (plansTitle) {
        const plansPosition = plansTitle.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = plansPosition - navbarHeight - 10; // Reduced padding to 10px

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
});

// Scroll arrow functionality
const scrollArrow = document.querySelector('.scroll-arrow');
const packagesSection = document.querySelector('.plans');
const packagesTitle = document.querySelector('.plans h2');

// Show scroll arrow when reaching packages section
window.addEventListener('scroll', () => {
    const packagesPosition = packagesSection.getBoundingClientRect().top;
    if (packagesPosition <= window.innerHeight / 2) {
        scrollArrow.classList.add('visible');
    } else {
        scrollArrow.classList.remove('visible');
    }
});

// Scroll to packages section when clicking arrow
scrollArrow.addEventListener('click', () => {
    const packagesOffset = packagesSection.offsetTop - 80; // Reduced offset to show title less far down
    window.scrollTo({
        top: packagesOffset,
        behavior: 'smooth'
    });
});

// 3D hover effect for about items
document.querySelectorAll('.about-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 50;
        const rotateY = (centerX - x) / 50;
        
        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Create audio element for music
const music = new Audio('Music/Song.mp3');
music.loop = true;
music.volume = 1.0; // Set volume to maximum

// Get close button element
const closeDisco = document.getElementById('closeDisco');

// Function to create fireworks
function createFirework(x, y) {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(firework);
    
    // Remove firework after animation
    setTimeout(() => {
        firework.remove();
    }, 1000);
}

let fireworkInterval;

// Function to start disco mode
function startDiscoMode() {
    // Play music
    music.play().catch(error => {
        console.log("Error playing music:", error);
    });
    
    // Add disco mode class to body
    document.body.classList.add('disco-mode');
    
    // Show close button
    closeDisco.style.display = 'block';
    
    // Create fireworks randomly
    fireworkInterval = setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createFirework(x, y);
    }, 300);
}

// Function to stop disco mode
function stopDiscoMode() {
    // Stop music
    music.pause();
    music.currentTime = 0;
    
    // Remove disco mode class from body
    document.body.classList.remove('disco-mode');
    
    // Hide close button
    closeDisco.style.display = 'none';
    
    // Clear fireworks interval
    clearInterval(fireworkInterval);
    
    // Remove all existing fireworks
    document.querySelectorAll('.firework').forEach(firework => firework.remove());
}

// Party Mode Toggle
const partyModeCheckbox = document.getElementById('partyModeCheckbox');
let isPartyModeActive = false;

// Initialize party mode checkbox as unchecked
partyModeCheckbox.checked = false;

// Update party mode state when checkbox changes
partyModeCheckbox.addEventListener('change', function() {
    isPartyModeActive = this.checked;
});

// Update purchase button click handlers
document.querySelectorAll('.plan button').forEach(button => {
    button.addEventListener('click', function() {
        if (isPartyModeActive) {
            // Party mode is active, proceed with party mode effects
            document.body.classList.add('disco-mode');
            createFireworks();
            playMusic();
        } else {
            // Party mode is inactive, redirect to aankoop.html
            window.location.href = 'aankoop.html';
        }
    });
});

// Add click event listener to close button
closeDisco.addEventListener('click', stopDiscoMode);

// Update scroll functionality
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    const sectionTitle = section.querySelector('h2');
    
    if (sectionTitle) {
        const sectionPosition = sectionTitle.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = sectionPosition - navbarHeight - 10; // Reduced padding to 10px

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    } else {
        // Fallback if no title is found
        const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = sectionPosition - navbarHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Update scroll arrow click handler
document.getElementById('scrollArrow').addEventListener('click', function() {
    const currentSection = getCurrentSection();
    const nextSection = getNextSection(currentSection);
    if (nextSection) {
        scrollToSection(nextSection.id);
    }
});

// Get current section based on scroll position
function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const sectionTitle = section.querySelector('h2');
        if (sectionTitle) {
            const titleRect = sectionTitle.getBoundingClientRect();
            if (titleRect.top <= navbarHeight && titleRect.bottom >= navbarHeight) {
                return section;
            }
        } else {
            if (rect.top <= navbarHeight && rect.bottom >= navbarHeight) {
                return section;
            }
        }
    }
    return null;
}

// Get next section based on current section
function getNextSection(currentSection) {
    const sections = Array.from(document.querySelectorAll('section'));
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
}

// Update scroll arrow visibility
window.addEventListener('scroll', function() {
    const scrollArrow = document.getElementById('scrollArrow');
    const currentSection = getCurrentSection();
    const nextSection = getNextSection(currentSection);
    
    if (nextSection) {
        scrollArrow.classList.add('visible');
    } else {
        scrollArrow.classList.remove('visible');
    }
}); 