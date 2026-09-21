// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const icon = themeToggle.querySelector('i');
// The inline script in <head> already restored the theme before first paint.
updateThemeToggle(htmlElement.getAttribute('data-theme'));

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    // Private browsing or disabled storage should not break the controls.
    try { localStorage.setItem('theme', newTheme); } catch (e) { }
    updateThemeToggle(newTheme);
});

function updateThemeToggle(theme) {
    icon.classList.toggle('fa-moon', theme !== 'dark');
    icon.classList.toggle('fa-sun', theme === 'dark');
    const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

function setNav(open) {
    navLinks.classList.toggle('nav-active', open);
    if (hamburger) hamburger.setAttribute('aria-expanded', String(open));
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        setNav(!navLinks.classList.contains('nav-active'));
    });
}

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) setNav(false);
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('nav-active') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
        setNav(false);
    }
});

// Escape closes the mobile menu and returns focus to the button.
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('nav-active')) {
        setNav(false);
        if (hamburger) hamburger.focus();
    }
});
