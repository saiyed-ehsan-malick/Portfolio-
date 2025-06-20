// DOM Elements
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');
const footer = document.querySelector('footer');

// Toggle mobile menu
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    
    // Toggle aria-expanded for accessibility
    const isExpanded = navbar.classList.contains('active');
    menuIcon.setAttribute('aria-expanded', isExpanded);
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
    });
});

// Scroll event handler with throttling
let lastScrollTime = 0;
const scrollThrottleTime = 100; // ms

window.addEventListener('scroll', () => {
    const now = Date.now();
    
    // Throttle scroll events for better performance
    if (now - lastScrollTime < scrollThrottleTime) return;
    lastScrollTime = now;
    
    handleScroll();
});

function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Header sticky effect
    header.classList.toggle('sticky', scrollY > 100);

    // Section animations and active nav links
    sections.forEach(sec => {
        const offset = sec.offsetTop - 100;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollY >= offset && scrollY < offset + height) {
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector(`header nav a[href*="${id}"]`)?.classList.add('active');

            // Show section animation
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });

    // Close mobile menu on scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    menuIcon.setAttribute('aria-expanded', 'false');

    // Footer animation
    const isAtBottom = windowHeight + scrollY >= documentHeight - 50;
    footer.classList.toggle('show-animate', isAtBottom);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial aria attributes for accessibility
    menuIcon.setAttribute('aria-expanded', 'false');
    menuIcon.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Trigger scroll handler once on load to set initial states
    handleScroll();
});