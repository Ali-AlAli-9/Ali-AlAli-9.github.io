(function() {
// Theme toggle
const toggle = document.getElementById('theme-toggle');
const icon = toggle.querySelector('i');
const saved = localStorage.getItem('theme');
if (saved === 'light') {
    document.body.classList.add('light');
    icon.className = 'fas fa-sun';
}
toggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Mobile menu
const mobileBtn = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

function setMenu(open) {
    navLinks.classList.toggle('open', open);
    mobileBtn.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
    mobileBtn.setAttribute('aria-expanded', String(open));
    mobileBtn.setAttribute('aria-label', window.i18nText ? window.i18nText(open ? 'Close menu' : 'Open menu') : (open ? 'Close menu' : 'Open menu'));
}

mobileBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => setMenu(false));
});
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !e.target.closest('.nav-container')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        setMenu(false);
        mobileBtn.focus();
    }
});

// Lightbox state
let lightboxImages = [];
let lightboxAlts = [];
let lightboxIndex = 0;
let lastFocused = null;

// Lightbox with gallery navigation
window.openLightbox = function(el, galleryName) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');

    if (galleryName) {
        const thumbs = document.querySelector(`.gallery-thumbs[data-gallery="${galleryName}"]`);
        if (thumbs) {
            const imgs = Array.from(thumbs.querySelectorAll('img'));
            lightboxImages = imgs.map(i => i.src);
            lightboxAlts = imgs.map(i => i.alt || 'Project screenshot');
        } else {
            lightboxImages = [el.src || el.getAttribute('src')];
            lightboxAlts = [el.alt || 'Project screenshot'];
        }
    } else {
        lightboxImages = [el.src || el.getAttribute('src')];
        lightboxAlts = [el.alt || 'Project screenshot'];
    }

    lightboxIndex = lightboxImages.indexOf(el.src || el.getAttribute('src'));
    if (lightboxIndex === -1) lightboxIndex = 0;

    showLightboxImage();
    lastFocused = document.activeElement;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lightbox-close').focus();
};

function showLightboxImage() {
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    img.src = lightboxImages[lightboxIndex];
    img.alt = lightboxAlts[lightboxIndex] || 'Project screenshot';
    counter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
}

window.navigateLightbox = function(dir) {
    lightboxIndex += dir;
    if (lightboxIndex < 0) lightboxIndex = lightboxImages.length - 1;
    if (lightboxIndex >= lightboxImages.length) lightboxIndex = 0;
    showLightboxImage();
};

window.closeLightbox = function() {
    const lb = document.getElementById('lightbox');
    if (!lb.classList.contains('active')) return;
    lb.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;
};

document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'Tab') {
        const focusable = Array.from(lb.querySelectorAll('button'));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
});

// Active navigation highlight
const sectionIds = ['projects', 'about', 'skills', 'process', 'contact'];
const navAnchors = Array.from(document.querySelectorAll('.nav-links a'))
    .filter(a => sectionIds.includes(a.getAttribute('href').slice(1)));
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
        });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    });
}

// Lightbox click on overlay (not image) closes
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
});

// Gallery tabs
window.switchGalleryTab = function(galleryId, tabName, btn) {
    const gallery = document.getElementById('gallery-' + galleryId);
    gallery.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
    gallery.querySelectorAll('.gallery-tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const target = gallery.querySelector(`[data-tab="${galleryId}-${tabName}"]`);
    if (target) target.classList.add('active');
};
})();
