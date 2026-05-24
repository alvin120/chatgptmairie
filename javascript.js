// Fonction pour scroller vers une section
function scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Lightbox functions
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    lightboxImage.src = imageSrc;
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

// Close lightbox when pressing Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Gestionnaire d'événements pour le formulaire de contact
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
        alert('Veuillez remplir tous les champs du formulaire.');
        return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }

    // Simulation d'envoi
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;

    // Simulation d'une requête
    setTimeout(() => {
        alert(`Merci ${name}!\n\nVotre message a bien été reçu.\nNous vous répondrons au plus tard sous 48 heures.\n\nCordialement,\nL'équipe de la Mairie`);
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Gestionnaire d'événements pour la newsletter
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('newsletter-email').value.trim();
    const actualites = document.querySelector('input[name="actualites"]').checked;
    const evenements = document.querySelector('input[name="evenements"]').checked;
    const appels = document.querySelector('input[name="appels"]').checked;

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }

    if (!actualites && !evenements && !appels) {
        alert('Veuillez sélectionner au moins une option.');
        return;
    }

    // Simulation d'envoi
    const submitBtn = this.querySelector('.newsletter-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Inscription en cours...';
    submitBtn.disabled = true;

    // Simulation d'une requête
    setTimeout(() => {
        alert(`✅ Inscription confirmée!\n\nVous recevrez un email de confirmation à l'adresse ${email}.\n\nMerci de votre confiance!`);
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Navigation lisse pour les liens d'ancre
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Ajouter une animation de chargement au page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site de la Mairie chargé avec succès');
    
    // Ajouter une animation fade-in aux cartes de services
    const cards = document.querySelectorAll('.service-card, .news-card, .event-item, .team-card, .document-card, .form-option, .galerie-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeIn 0.6s ease forwards ${index * 0.1}s`;
    });
});

// Animation CSS pour le fade-in
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
