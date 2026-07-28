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
const navLinks = document.querySelector('.nav-links');
mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    mobileBtn.querySelector('i').className = navLinks.classList.contains('open')
        ? 'fas fa-times' : 'fas fa-bars';
});
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Lightbox state
let lightboxImages = [];
let lightboxIndex = 0;

// Lightbox with gallery navigation
window.openLightbox = function(el, galleryName) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');

    if (galleryName) {
        const thumbs = document.querySelector(`.gallery-thumbs[data-gallery="${galleryName}"]`);
        if (thumbs) {
            const imgs = thumbs.querySelectorAll('img');
            lightboxImages = Array.from(imgs).map(i => i.src);
        } else {
            lightboxImages = [el.src || el.getAttribute('src')];
        }
    } else {
        lightboxImages = [el.src || el.getAttribute('src')];
    }

    lightboxIndex = lightboxImages.indexOf(el.src || el.getAttribute('src'));
    if (lightboxIndex === -1) lightboxIndex = 0;

    showLightboxImage();
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
};

function showLightboxImage() {
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    img.src = lightboxImages[lightboxIndex];
    counter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
}

window.navigateLightbox = function(dir) {
    lightboxIndex += dir;
    if (lightboxIndex < 0) lightboxIndex = lightboxImages.length - 1;
    if (lightboxIndex >= lightboxImages.length) lightboxIndex = 0;
    showLightboxImage();
};

window.closeLightbox = function() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
};

document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

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
