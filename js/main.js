// ============================================================
// main.js — Scroll animations, navbar, interactivity
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navbar scroll effect ----
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const bars = navToggle.querySelectorAll('span');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile nav on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // ---- Active nav link ----
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ---- Intersection Observer for fade-up animations ----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // ---- Smooth anchor scrolling ----
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
                const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Skill tag hover stagger ----
    document.querySelectorAll('.skill-group').forEach(group => {
        group.querySelectorAll('.skill-tag').forEach((tag, i) => {
            tag.style.transitionDelay = `${i * 20}ms`;
        });
    });

});
