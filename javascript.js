// ============================================
// NAVBAR DRAWER (mobile)
// ============================================
const hamburger = document.getElementById('hamburger');
const navbar    = document.getElementById('navbar');

/* Injecter l'en-tête du drawer et le backdrop une seule fois */
const mobileHeader = document.createElement('div');
mobileHeader.className = 'nav-mobile-header';
mobileHeader.innerHTML = `
  <div class="nav-mobile-logo">
    <i class="fas fa-landmark"></i>
    <span>Mairie de Ville</span>
  </div>
  <button type="button" class="nav-close-btn" aria-label="Fermer le menu">
    <i class="fas fa-times"></i>
  </button>`;
navbar.insertBefore(mobileHeader, navbar.firstChild);

const backdrop = document.createElement('div');
backdrop.className = 'nav-backdrop';
backdrop.id = 'nav-backdrop';
document.body.appendChild(backdrop);

function openNav() {
    hamburger.classList.add('open');
    navbar.classList.add('open');
    backdrop.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeNav() {
    hamburger.classList.remove('open');
    navbar.classList.remove('open');
    backdrop.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    navbar.classList.contains('open') ? closeNav() : openNav();
});

/* Fermer sur le bouton X du drawer */
mobileHeader.querySelector('.nav-close-btn').addEventListener('click', closeNav);

/* Fermer en cliquant sur le backdrop */
backdrop.addEventListener('click', closeNav);

/* Fermer en appuyant sur Échap */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navbar.classList.contains('open')) closeNav();
});

/* Fermer quand on clique un lien */
navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) closeNav();
    });
});

/* Animation stagger sur les items du drawer à l'ouverture */
(function () {
    const s = document.createElement('style');
    s.textContent = `
        @media (max-width: 768px) {
            .nav-list > li { opacity: 0; transform: translateX(-14px); transition: opacity 0.28s ease, transform 0.28s ease; }
            .navbar.open .nav-list > li { opacity: 1; transform: translateX(0); }
            .navbar.open .nav-list > li:nth-child(1) { transition-delay: 0.08s; }
            .navbar.open .nav-list > li:nth-child(2) { transition-delay: 0.13s; }
            .navbar.open .nav-list > li:nth-child(3) { transition-delay: 0.18s; }
            .navbar.open .nav-list > li:nth-child(4) { transition-delay: 0.23s; }
            .navbar.open .nav-list > li:nth-child(5) { transition-delay: 0.28s; }
            .navbar.open .nav-list > li:nth-child(6) { transition-delay: 0.33s; }
        }
    `;
    document.head.appendChild(s);
}());

// ============================================
// HERO SLIDER
// ============================================
const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.dot');
let current  = 0;
let sliderTimer;

function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
}

function startSlider() {
    sliderTimer = setInterval(() => goToSlide(current + 1), 5000);
}

startSlider();

document.querySelector('.hero-next').addEventListener('click', () => {
    clearInterval(sliderTimer);
    goToSlide(current + 1);
    startSlider();
});

document.querySelector('.hero-prev').addEventListener('click', () => {
    clearInterval(sliderTimer);
    goToSlide(current - 1);
    startSlider();
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        clearInterval(sliderTimer);
        goToSlide(i);
        startSlider();
    });
});

// ============================================
// STICKY HEADER
// ============================================
const mainHeader = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    mainHeader.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ============================================
// BACK TO TOP
// ============================================
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// ACTIVE NAV ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// ============================================
// LIGHTBOX
// ============================================
function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    lb.querySelector('.lightbox-image').src = src;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// NOTIFICATION HELPER
// ============================================
function showNotification(message, type) {
    const existing = document.querySelector('.notif-toast');
    if (existing) existing.remove();

    const el = document.createElement('div');
    el.className = 'notif-toast notif-' + (type || 'success');
    el.innerHTML = '<i class="fas fa-' + (type === 'error' ? 'exclamation-circle' : 'check-circle') + '"></i><span>' + message + '</span>';
    document.body.appendChild(el);

    requestAnimationFrame(() => el.classList.add('notif-show'));

    setTimeout(() => {
        el.classList.remove('notif-show');
        setTimeout(() => el.remove(), 300);
    }, 4500);
}

// Inject toast styles once
(function () {
    const s = document.createElement('style');
    s.textContent = `
        .notif-toast {
            position: fixed; bottom: 32px; left: 50%;
            transform: translateX(-50%) translateY(16px);
            background: #fff; color: #1e293b;
            padding: 14px 22px; border-radius: 10px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.16);
            display: flex; align-items: center; gap: 10px;
            font-size: 0.91em; font-weight: 500;
            z-index: 3000; opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            max-width: 440px; border-left: 4px solid #2563eb;
            font-family: 'Inter', sans-serif;
        }
        .notif-success { border-color: #22c55e; }
        .notif-success i { color: #22c55e; }
        .notif-error { border-color: #ef4444; }
        .notif-error i { color: #ef4444; }
        .notif-show { opacity: 1; transform: translateX(-50%) translateY(0); }
    `;
    document.head.appendChild(s);
}());

// ============================================
// CONTACT FORM
// ============================================
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {
        showNotification('Veuillez remplir tous les champs.', 'error');
        return;
    }
    if (!emailRe.test(email)) {
        showNotification('Adresse email invalide.', 'error');
        return;
    }

    const btn = this.querySelector('.submit-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours…';

    setTimeout(() => {
        showNotification('Merci ' + name + ' ! Votre message a bien été envoyé. Réponse sous 48h.', 'success');
        this.reset();
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
    }, 1500);
});

// ============================================
// NEWSLETTER FORM
// ============================================
document.getElementById('newsletter-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email   = document.getElementById('newsletter-email').value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRe.test(email)) {
        showNotification('Adresse email invalide.', 'error');
        return;
    }

    const btn = this.querySelector('.newsletter-btn');
    btn.disabled = true;
    btn.textContent = 'Inscription…';

    setTimeout(() => {
        showNotification('Inscription confirmée ! Un email de confirmation vous a été envoyé.', 'success');
        this.reset();
        btn.disabled = false;
        btn.textContent = "S'abonner";
    }, 1500);
});

// ============================================
// FADE-IN ON SCROLL
// ============================================
(function () {
    const s = document.createElement('style');
    s.textContent = '@keyframes fadeInUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}';
    document.head.appendChild(s);
}());

const fadeTargets = document.querySelectorAll(
    '.service-card, .news-featured, .news-card-small, .event-card, ' +
    '.team-card, .document-card, .form-option, .galerie-item, ' +
    '.horaires-card, .stat-item, .qa-tile'
);

const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.5s ease forwards';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeTargets.forEach(el => {
    el.style.opacity = '0';
    fadeObserver.observe(el);
});
