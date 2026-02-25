// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });
}

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('nav-active') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
        navLinks.classList.remove('nav-active');
    }
});