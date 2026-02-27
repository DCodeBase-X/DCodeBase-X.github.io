/* ================================================
   DAMARIUS MCNAIR — PORTFOLIO
   script.js
   ================================================ */

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// --- Mobile nav toggle ---
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// --- Smooth scroll for all anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// --- Scroll-triggered fade-in animations ---
const animateEls = document.querySelectorAll('.animate-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger the animation for grid children
            const siblings = Array.from(entry.target.parentElement.children);
            const index    = siblings.indexOf(entry.target);
            const delay    = (index % 3) * 90; // stagger by column position

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);

            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

animateEls.forEach(el => observer.observe(el));

// --- Active nav link highlight on scroll ---
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = link.getAttribute('href') === `#${id}`
                    ? '#fff'
                    : 'rgba(255,255,255,.75)';
            });
        }
    });
}, {
    threshold: 0.45
});

sections.forEach(section => sectionObserver.observe(section));
