// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Fermer le menu en cliquant en dehors
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks?.classList.remove('active');
    }
});

// Intersection Observer pour les animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInAnimation 0.6s ease-in-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// FAQ Toggle
function toggleFAQ(header) {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');
    
    // Fermer tous les autres items
    document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
    });
    
    // Ouvrir le nouvel item si ce n'était pas actif
    if (!isActive) {
        item.classList.add('active');
    }
}

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            activity: formData.get('activity'),
            date: formData.get('date'),
            participants: formData.get('participants'),
            message: formData.get('message'),
            newsletter: formData.get('newsletter') ? 'Oui' : 'Non'
        };
        
        // Afficher un message de confirmation
        showNotification('Votre réservation a été envoyée avec succès ! Nous vous recontacterons bientôt.', 'success');
        
        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Dans une vraie application, envoyer les données au serveur
        console.log('Données du formulaire:', data);
    });
}

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px 25px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease-in-out;
    `;
    
    if (type === 'success') {
        notification.style.background = '#43e97b';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.background = '#ff6b6b';
        notification.style.color = 'white';
    } else {
        notification.style.background = '#0066cc';
        notification.style.color = 'white';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Supprimer après 4 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Ajouter l'animation slideInRight
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href && href !== '#') {
            // Pour les pages entières, on utilise le pathname
            if (window.location.pathname.includes(href) || 
                (href === 'index.html' && window.location.pathname.endsWith('/')) ||
                href.replace('.html', '') === window.location.pathname.split('/').pop().replace('.html', '')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
});

// Trigger scroll event on page load
window.dispatchEvent(new Event('scroll'));

console.log('AquaVenture Provence - Site officiel chargé avec succès!');
